import { renderOgPng } from '../../lib/og-template';

export async function GET() {
  const png = await renderOgPng({
    title: 'About Het Patel',
    meta: 'Cybersecurity Engineer',
    tags: ['VAPT', 'Red Teaming', 'CRTA'],
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
