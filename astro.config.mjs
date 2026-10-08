import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCodeBar from './src/plugins/rehypeCodeBar.mjs';

export default defineConfig({
  site: 'https://www.dancingwithcrm.com',
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx' whitespace stripping; keep v6's HTML-aware behaviour
  compressHTML: true,
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-montserrat',
      weights: [300, 400, 700],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Lato',
      cssVariable: '--font-lato',
      weights: [300, 400, 700],
      styles: ['normal'],
    },
  ],
  integrations: [
    mdx(),
    sitemap(),
    icon(),
  ],
  markdown: {
    // Keep the unified (remark/rehype) pipeline instead of Astro 7's default Sätteri
    // processor, so the rehype plugins below keep working unchanged.
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
        rehypeCodeBar,
      ],
    }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
