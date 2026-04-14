import { visit, SKIP } from 'unist-util-visit';
import { h } from 'hastscript';

/**
 * Rehype plugin that wraps every <pre> code block with a .code-bar header
 * containing the language label and a copy button, rendered at build time.
 */
export default function rehypeCodeBar() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre' || !parent || index == null) return;

      const codeEl = node.children?.find(
        (c) => c.type === 'element' && c.tagName === 'code'
      );
      const lang = node.properties?.dataLanguage ?? 
        codeEl?.properties?.className
          ?.find((c) => typeof c === 'string' && c.startsWith('language-'))
          ?.replace('language-', '') ?? '';

      const bar = h('div', { class: 'code-bar' }, [
        h('div', { class: 'code-title' }, lang),
        h('button', {
          class: 'copy-code-button',
          type: 'button',
          'aria-label': 'Copy code',
        }),
      ]);

      // Insert bar before pre; skip forward past both nodes to avoid re-visiting
      parent.children.splice(index, 0, bar);
      return [SKIP, index + 2];
    });
  };
}
