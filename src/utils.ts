import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Get the URL slug from a content collection post ID.
 * Strips the file extension (.mdx, .md) from the ID.
 */
export function getPostSlug(postId: string): string {
  return postId.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/**
 * Get the full URL path for a blog post.
 */
export function getPostUrl(postId: string): string {
  return `/${getPostSlug(postId)}/`;
}

/**
 * Get the anchor id for a tag's section on the tags page.
 * Whitespace isn't allowed in ids, so it becomes a hyphen; other characters are kept so
 * existing links like /tags/#PowerPages keep working.
 */
export function getTagAnchor(tag: string): string {
  return tag.trim().replace(/\s+/g, '-');
}

/**
 * Get the URL of a tag's section on the tags page.
 */
export function getTagUrl(tag: string): string {
  return `/tags/#${encodeURIComponent(getTagAnchor(tag))}`;
}

/**
 * Get all posts, newest first.
 */
export async function getSortedPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Format a post date for display, e.g. "06 Oct 2026".
 */
export function formatPostDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
