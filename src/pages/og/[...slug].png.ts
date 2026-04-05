import type { APIContext, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title, tags: post.data.tags || [], date: post.data.date },
  }));
};

export async function GET({ props }: APIContext) {
  const { title, tags, date } = props as { title: string; tags: string[]; date: Date };

  const fontPath = path.resolve('node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff');
  const fontBoldPath = path.resolve('node_modules/@fontsource/geist-mono/files/geist-mono-latin-700-normal.woff');

  let fontData: ArrayBuffer;
  let fontBoldData: ArrayBuffer;

  try {
    fontData = fs.readFileSync(fontPath).buffer as ArrayBuffer;
    fontBoldData = fs.readFileSync(fontBoldPath).buffer as ArrayBuffer;
  } catch {
    // Fallback: use a system-available approach with Inter from Google Fonts
    const fontResp = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.woff');
    fontData = await fontResp.arrayBuffer();
    const fontBoldResp = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-700-normal.woff');
    fontBoldData = await fontBoldResp.arrayBuffer();
  }

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayTags = tags.slice(0, 3);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'Geist Mono',
          background: '#131416',
          color: '#eaebec',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '24px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#85b1b7',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase' as const,
                    },
                    children: 'networkshard',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 60 ? '36px' : '44px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: '#eaebec',
                      maxWidth: '90%',
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', gap: '10px' },
                    children: displayTags.map((tag: string) => ({
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '14px',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          background: '#1f2123',
                          color: '#94999e',
                          border: '1px solid #292b2e',
                        },
                        children: tag,
                      },
                    })),
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '4px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: '14px', color: '#94999e' },
                          children: formattedDate,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { fontSize: '14px', color: '#6f787b' },
                          children: 'Het Patel',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist Mono', data: fontData, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: fontBoldData, weight: 700, style: 'normal' },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
