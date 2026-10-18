import { visit, SKIP } from 'unist-util-visit';
import { h } from 'hastscript';

const headingTags = new Set(['h2', 'h3', 'h4']);

const hasLink = (node) =>
  node.children?.some(
    (c) => c.type === 'element' && (c.tagName === 'a' || hasLink(c))
  ) ?? false;

/**
 * Rehype plugin that makes each h2–h4 heading text a link to its own section, so readers can
 * copy a deep link. Needs heading ids, so it runs after Astro's rehypeHeadingIds.
 * Headings that already contain a link are left alone (links can't nest).
 */
export default function rehypeHeadingAnchors() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (!headingTags.has(node.tagName)) return;
      const id = node.properties?.id;
      if (!id || hasLink(node)) return SKIP;

      node.children = [h('a', { class: 'heading-anchor', href: `#${id}` }, node.children)];
      return SKIP;
    });
  };
}
