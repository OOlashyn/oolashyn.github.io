import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCodeBar from './src/plugins/rehypeCodeBar.mjs';

export default defineConfig({
  site: 'https://www.dancingwithcrm.com',
  output: 'static',
  trailingSlash: 'always',
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
