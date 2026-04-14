import type { Root as HastRoot, RootContent } from 'hast';
import type { Root as MdastRoot } from 'mdast';
import type { APIContext } from 'astro';

import { getCollection } from 'astro:content';
import { Feed } from 'feed';
import minifyHtml from '@minify-html/node';
import rehypeStringify from 'rehype-stringify';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { type Plugin, unified } from 'unified';

import { siteConfig } from '@/config';
import { getPostUrl } from '@/utils';

type UrlLike = URL | string;

// Custom remark plugin: remove JS import/export statements (mdxjsEsm nodes)
const remarkRemoveImports: Plugin<[], MdastRoot> = () => {
  return (tree) => {
    tree.children = tree.children.filter((node) => node.type !== 'mdxjsEsm');
    return tree;
  };
};

// Custom remark plugin: remove MDX JSX elements (custom components like <Video>, <YouTubePlayer>)
const remarkRemoveMdxJsx: Plugin<[], MdastRoot> = () => {
  return (tree) => {
    tree.children = tree.children.filter(
      (node) =>
        node.type !== 'mdxJsxFlowElement' &&
        node.type !== 'mdxJsxTextElement'
    );
    return tree;
  };
};

// Custom rehype plugin: convert relative href/src attributes to absolute URLs
const rehypeAbsoluteUrls: Plugin<[UrlLike], HastRoot> = (baseUrl) => {
  return (tree) => {
    const visit = (node: RootContent | HastRoot): void => {
      if (node.type === 'element') {
        if (node.tagName === 'a' && node.properties?.href) {
          node.properties.href = toAbsoluteUrl(
            node.properties.href as string,
            baseUrl
          );
        }
        if (node.tagName === 'img' && node.properties?.src) {
          node.properties.src = toAbsoluteUrl(
            node.properties.src as string,
            baseUrl
          );
        }
      }
      if ('children' in node) {
        (node.children as Array<RootContent>).forEach(visit);
      }
    };
    visit(tree);
    return tree;
  };
};

function toAbsoluteUrl(path: string, baseUrl: UrlLike): string {
  try {
    return new URL(path, baseUrl).href;
  } catch {
    return path;
  }
}

export async function mdxToHtml(
  mdxContent: string,
  site: UrlLike
): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRemoveImports)
    .use(remarkRemoveMdxJsx)
    .use(remarkRehype)
    .use(rehypeAbsoluteUrls, site)
    .use(rehypeStringify)
    .process(mdxContent);

  return minifyHtml
    .minify(Buffer.from(result.toString()), { keep_closing_tags: true })
    .toString();
}

export async function generateFeed(context: APIContext): Promise<Feed> {
  const site = (context.site ?? new URL(siteConfig.url)).toString();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: site,
    link: site,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
    author: {
      name: siteConfig.author,
      email: siteConfig.email,
      link: site,
    },
    feedLinks: {
      atom: new URL('feed.xml', site).href,
    },
  });

  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  for (const post of sortedPosts) {
    const link = new URL(getPostUrl(post.id), site).href;
    const content = post.body ? await mdxToHtml(post.body, site) : '';

    feed.addItem({
      title: post.data.title,
      id: link,
      link,
      date: post.data.date,
      published: post.data.date,
      description: post.data.description || post.data.excerpt || '',
      content,
      author: [
        {
          name: siteConfig.author,
          email: siteConfig.email,
          link: site,
        },
      ],
      ...(post.data.image
        ? { image: new URL(post.data.image, site).href }
        : {}),
    });
  }

  return feed;
}

export async function generateRssXml(context: APIContext): Promise<string> {
  const feed = await generateFeed(context);

  // Switch to RSS 2.0 and add xmlns:media namespace for Mailchimp <media:content> support
  let xml = feed.rss2();

  xml = xml.replace(
    '<rss version="2.0">',
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">'
  );

  // The feed package renders item images as <enclosure url="..." length="0" type="image/jpg"/>
  // Append <media:content> alongside each enclosure so Mailchimp picks it up via *|RSSITEM:IMAGE|*
  xml = xml.replace(
    /<enclosure url="([^"]+)" length="0" type="image\/jpg"\/>/g,
    (match, url) =>
      `${match}\n        <media:content url="${url}" medium="image"/>`
  );

  return xml;
}
