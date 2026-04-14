import type { APIContext } from 'astro';
import { generateRssXml } from '@/data/feeds';

export async function GET(context: APIContext) {
  const xml = await generateRssXml(context);
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
