import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config';
import { getPostUrl } from '@/utils';

import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: getPostUrl(post.id),
    })),
  });
}
