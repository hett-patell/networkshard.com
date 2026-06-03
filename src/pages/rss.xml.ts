import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import { getPublishedPosts } from '../lib/posts';
import { SITE } from '../lib/site';

const md = new MarkdownIt({ html: true, linkify: true });

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const site = context.site ?? new URL(SITE.url);

  return rss({
    title: 'networkshard — Het Patel',
    description:
      'Articles on cybersecurity, penetration testing, vulnerability assessment, and security research.',
    site,
    items: posts.map((post) => {
      // Render the raw markdown body to HTML, sanitize it, and resolve any
      // root-relative image/link URLs to absolute so feed readers can load them.
      const html = sanitizeHtml(md.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'loading', 'decoding'],
          a: ['href', 'name', 'target', 'rel'],
        },
        transformTags: {
          img: (tagName, attribs) => {
            if (attribs.src?.startsWith('/')) {
              attribs.src = new URL(attribs.src, site).href;
            }
            return { tagName, attribs };
          },
        },
      });

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/blog/${post.slug}/`,
        categories: post.data.tags,
        content: html,
      };
    }),
  });
}
