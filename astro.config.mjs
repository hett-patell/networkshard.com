// @ts-check
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeImgAttrs from './src/lib/rehype-img-attrs.ts';

export default defineConfig({
  site: 'https://networkshard.com',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeImgAttrs],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
