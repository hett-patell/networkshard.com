// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rehypeImgAttrs from './src/lib/rehype-img-attrs.ts';

export default defineConfig({
  site: 'https://networkshard.com',
  output: 'static',
  integrations: [tailwind(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeImgAttrs],
  },
});
