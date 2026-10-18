import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';
import sharp from 'sharp';

import { getPostSlug } from '@/utils';

// Share images generated from each post's cover at build time (see src/pages/[kind]/[slug].jpg.ts),
// so publishing a post needs no hand-made copies. URLs depend only on the slug, so they're stable.
export const socialImageSizes = {
  // Link previews (Open Graph / X / LinkedIn): the 1.91:1 size their large cards expect
  og: { width: 1200, height: 630 },
  // RSS and the Mailchimp newsletter: the 600×400 size the hand-made images always had, so the
  // email layout doesn't change
  rss: { width: 600, height: 400 },
} as const;

export type SocialImageKind = keyof typeof socialImageSizes;

export function isSocialImageKind(kind: string | undefined): kind is SocialImageKind {
  return kind !== undefined && Object.hasOwn(socialImageSizes, kind);
}

/**
 * Get the site-relative URL of a post's generated share image, e.g. /og/my-post.jpg.
 */
export function getSocialImageUrl(kind: SocialImageKind, postId: string): string {
  return `/${kind}/${getPostSlug(postId)}.jpg`;
}

/**
 * Render a post's share image: its cover, cropped from the centre to the kind's size.
 */
export async function renderSocialImage(
  post: CollectionEntry<'posts'>,
  kind: SocialImageKind,
): Promise<Uint8Array<ArrayBuffer>> {
  // Astro's image metadata carries the source file path; it isn't in the public type
  const { fsPath } = post.data.img as ImageMetadata & { fsPath?: string };
  if (!fsPath) {
    throw new Error(`Can't find the cover file for "${post.id}" to render its ${kind} image`);
  }

  const { width, height } = socialImageSizes[kind];
  const image = await sharp(fsPath)
    .resize(width, height, { fit: 'cover' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Uint8Array(image);
}
