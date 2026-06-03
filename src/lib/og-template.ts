import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Shared Open Graph image renderer (1200x630 PNG) using the site's
 * Geist Mono brand card. Used by the per-post OG route and the static
 * page OG routes (home/about/projects/blog).
 */

let cachedFonts: { data: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const fontPath = path.resolve(
    'node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff'
  );
  const fontBoldPath = path.resolve(
    'node_modules/@fontsource/geist-mono/files/geist-mono-latin-700-normal.woff'
  );

  let data: ArrayBuffer;
  let bold: ArrayBuffer;
  try {
    data = fs.readFileSync(fontPath).buffer as ArrayBuffer;
    bold = fs.readFileSync(fontBoldPath).buffer as ArrayBuffer;
  } catch {
    const r = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.woff'
    );
    data = await r.arrayBuffer();
    const rb = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-700-normal.woff'
    );
    bold = await rb.arrayBuffer();
  }

  cachedFonts = { data, bold };
  return cachedFonts;
}

export interface OgOptions {
  title: string;
  /** small footer-right line (e.g. a formatted date) */
  meta?: string;
  /** up to 3 tag chips along the bottom-left */
  tags?: string[];
}

export async function renderOgPng({ title, meta, tags = [] }: OgOptions): Promise<Buffer> {
  const fonts = await loadFonts();
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
                          children: meta || '',
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
        { name: 'Geist Mono', data: fonts.data, weight: 400, style: 'normal' },
        { name: 'Geist Mono', data: fonts.bold, weight: 700, style: 'normal' },
      ],
    }
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
