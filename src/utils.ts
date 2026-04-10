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
