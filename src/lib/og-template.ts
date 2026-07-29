import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

let cachedFonts: { data: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;

  const fontPath = path.resolve('node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff');
  const fontBoldPath = path.resolve('node_modules/@fontsource/geist-mono/files/geist-mono-latin-700-normal.woff');

	const regularFile = fs.readFileSync(fontPath);
	const boldFile = fs.readFileSync(fontBoldPath);
	const data = regularFile.buffer.slice(regularFile.byteOffset, regularFile.byteOffset + regularFile.byteLength) as ArrayBuffer;
	const bold = boldFile.buffer.slice(boldFile.byteOffset, boldFile.byteOffset + boldFile.byteLength) as ArrayBuffer;

  cachedFonts = { data, bold };
  return cachedFonts;
}

export interface OgOptions {
  title: string;
  meta?: string;
  tags?: string[];
}

async function renderSvg({ title, meta, tags, fonts }: OgOptions & { fonts: { data: ArrayBuffer; bold: ArrayBuffer } }): Promise<string> {
  const indexLine = (tags ?? []).slice(0, 4).join('  /  ');

  return satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '58px 64px',
          fontFamily: 'Geist Mono',
          background: '#fffcf0',
          color: '#100f0f',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '20px',
                      borderBottom: '2px solid #100f0f',
                      fontSize: '16px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase' as const,
                    },
                    children: [
                      { type: 'div', props: { children: 'networkshard' } },
                      { type: 'div', props: { style: { color: '#6f6e69' }, children: `NS / ${new Date().getFullYear()}` } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      paddingTop: '54px',
                      maxWidth: '1040px',
                      fontSize: title.length > 64 ? '42px' : '52px',
                      fontWeight: 700,
                      lineHeight: 1.14,
                      letterSpacing: '-0.045em',
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
                flexDirection: 'column',
                borderTop: '1px solid #dad8ce',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '18px',
                      fontSize: '15px',
                      color: '#6f6e69',
                    },
                    children: [
                      { type: 'div', props: { children: indexLine || 'SECURITY  /  RESEARCH  /  SYSTEMS' } },
                      { type: 'div', props: { children: meta || 'Het Patel' } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', marginTop: '14px', width: '88px', height: '4px', background: '#315f58' },
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
}

function fallbackPng(label: string): Promise<Buffer> {
  return sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 252, b: 240, alpha: 1 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <text x="64" y="340" font-family="monospace" font-size="32" fill="#6f6e69">networkshard</text>
            <text x="64" y="400" font-family="monospace" font-size="24" fill="#100f0f">${label}</text>
          </svg>`
        ),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();
}

export async function renderOgPng({ title, meta, tags = [] }: OgOptions): Promise<Buffer> {
  try {
    const fonts = await loadFonts();
    const svg = await renderSvg({ title, meta, tags, fonts });
    return sharp(Buffer.from(svg)).png().toBuffer();
  } catch (err) {
    console.error('OG image rendering failed, using fallback:', err instanceof Error ? err.message : err);
    return fallbackPng(title || 'networkshard');
  }
}
