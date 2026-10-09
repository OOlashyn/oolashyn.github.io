import type { Root as HastRoot, RootContent } from 'hast';
import type { Root as MdastRoot, RootContent as MdastNode } from 'mdast';
import type { APIContext } from 'astro';

import { Feed } from 'feed';
import minifyHtml from '@minify-html/node';
import rehypeStringify from 'rehype-stringify';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { type Plugin, unified } from 'unified';
import { SKIP, visit } from 'unist-util-visit';

import { siteConfig } from '@/config';
import { getPostUrl, getSortedPosts } from '@/utils';

type UrlLike = URL | string;

// Custom remark plugin: remove JS import/export statements (mdxjsEsm nodes)
const remarkRemoveImports: Plugin<[], MdastRoot> = () => {
  return (tree) => {
    tree.children = tree.children.filter((node) => node.type !== 'mdxjsEsm');
    return tree;
  };
};

// Minimal shape of the MDX JSX nodes produced by remark-mdx
interface MdxJsxElement {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement';
  name: string | null;
  attributes: Array<{ type: string; name?: string; value?: unknown }>;
  children: MdastNode[];
  data?: { hName?: string; hProperties?: Record<string, string> };
}

function isMdxJsxElement(node: { type: string }): node is MdxJsxElement {
  return node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
}

// Callout components rendered as a labelled blockquote in the feed
const feedCallouts: Record<string, string> = {
  ImportantBlock: 'Important',
  UpdateBlock: 'Update',
};

// Custom remark plugin: turn MDX JSX into plain HTML for feed readers and Mailchimp.
// - Plain HTML tags written in MDX (<a href>, <strong>, <i>, ...) become real elements
// - Callouts (<ImportantBlock>, <UpdateBlock>) become a blockquote with a label
// - Other components (<Video>, <YouTubePlayer>, ...) can't render in email and are dropped
const remarkMdxJsxToHtml: Plugin<[], MdastRoot> = () => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!isMdxJsxElement(node) || !parent || index === undefined) return;

      const name = node.name ?? '';
      const label = feedCallouts[name];

      if (label) {
        node.data = { hName: 'blockquote' };
        node.children.unshift({
          type: 'paragraph',
          children: [{ type: 'strong', children: [{ type: 'text', value: label }] }],
        } as MdastNode);
        return;
      }

      if (/^[a-z]/.test(name)) {
        const hProperties: Record<string, string> = {};
        for (const attr of node.attributes) {
          // Skip spread and {expression} attributes: they can't be evaluated here
          if (attr.type !== 'mdxJsxAttribute' || !attr.name) continue;
          if (typeof attr.value !== 'string' && attr.value !== null) continue;
          hProperties[attr.name === 'class' ? 'className' : attr.name] = attr.value ?? '';
        }
        node.data = { hName: name, hProperties };
        return;
      }

      parent.children.splice(index, 1);
      return [SKIP, index];
    });
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
    .use(remarkMdxJsxToHtml)
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
    // The feed is RSS 2.0; this adds its <atom:link rel="self"> self-reference
    feedLinks: {
      rss: new URL('feed.xml', site).href,
    },
  });

  const latestPosts = (await getSortedPosts()).slice(0, siteConfig.feedItemLimit);

  for (const post of latestPosts) {
    const link = new URL(getPostUrl(post.id), site).href;
    const content = post.body ? await mdxToHtml(post.body, site) : '';

    feed.addItem({
      title: post.data.title,
      id: link,
      link,
      date: post.data.date,
      published: post.data.date,
      description: post.data.description,
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
    /(<rss\b)([^>]*>)/,
    (_, tag, rest) =>
      rest.includes('xmlns:media')
        ? `${tag}${rest}`
        : `${tag} xmlns:media="http://search.yahoo.com/mrss/"${rest}`
  );

  // The feed package renders item images as <enclosure url="..." length="0" type="image/..."/>
  // Append <media:content> alongside each enclosure so Mailchimp picks it up via *|RSSITEM:IMAGE|*
  xml = xml.replace(
    /<enclosure url="([^"]+)" length="0" type="image\/[^"]+"\s*\/>/g,
    (match, url) =>
      `${match}\n        <media:content url="${url}" medium="image"/>`
  );

  return xml;
}
