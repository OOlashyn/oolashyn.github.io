/**
 * Get the URL slug from a content collection post ID.
 * Strips the file extension (.mdx, .md) from the ID.
 */
export function getPostSlug(postId: string): string {
  return postId.replace(/\.mdx?$/, '');
}

/**
 * Get the full URL path for a blog post.
 */
export function getPostUrl(postId: string): string {
  return `/${getPostSlug(postId)}/`;
}
