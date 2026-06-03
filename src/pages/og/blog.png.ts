import { renderOgPng } from '../../lib/og-template';

export async function GET() {
  const png = await renderOgPng({
    title: 'Blog — Cybersecurity & Penetration Testing',
    meta: 'Het Patel',
    tags: ['Pentesting', 'VAPT', 'Research'],
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
