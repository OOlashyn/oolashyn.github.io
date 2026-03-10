import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCodeBar from './src/plugins/rehypeCodeBar.mjs';

export default defineConfig({
  site: 'https://www.dancingwithcrm.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
      rehypeCodeBar,
    ],
  },
});
