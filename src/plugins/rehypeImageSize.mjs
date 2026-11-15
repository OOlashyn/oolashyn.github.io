import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { visit } from 'unist-util-visit';
import sharp from 'sharp';

const publicDir = join(process.cwd(), 'public');

// Images are reused across posts and rebuilt pages, so read each file's size once
const sizeCache = new Map();

async function readSize(src) {
  if (sizeCache.has(src)) return sizeCache.get(src);
  const file = join(publicDir, decodeURIComponent(src.split(/[?#]/)[0]));
  let size;
  if (existsSync(file)) {
    const { width, height, orientation } = await sharp(file).metadata();
    // EXIF orientations 5–8 rotate the image a quarter turn, so the displayed size is swapped
    const rotated = (orientation ?? 1) >= 5;
    if (width && height) size = rotated ? { width: height, height: width } : { width, height };
  }
  if (!size) console.warn(`rehypeImageSize: could not read the size of ${src}; it may shift the layout when it loads.`);
  sizeCache.set(src, size);
  return size;
}

/**
 * Rehype plugin for Markdown images served from public/ (e.g. /assets/img/...). Adds their
 * intrinsic width/height, so the page doesn't jump as they load, and lazy loading, since they
 * sit below the post's cover (the LCP image, loaded eagerly by CoverImage). File URLs stay the
 * same, so the RSS feed and sent newsletters are unaffected. Raw <img> JSX in MDX isn't touched.
 */
export default function rehypeImageSize() {
  return async (tree) => {
    const images = [];
    visit(tree, 'element', (node) => {
      const src = node.properties?.src;
      if (node.tagName !== 'img' || typeof src !== 'string') return;
      // Root-relative only: protocol-relative (//host) and external URLs aren't in public/
      if (!src.startsWith('/') || src.startsWith('//')) return;
      images.push(node);
    });

    await Promise.all(images.map(async (node) => {
      const props = node.properties;
      props.loading ??= 'lazy';
      props.decoding ??= 'async';
      if (props.width || props.height) return;
      const size = await readSize(props.src);
      if (!size) return;
      props.width = size.width;
      props.height = size.height;
    }));
  };
}
