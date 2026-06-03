import { renderOgPng } from '../../lib/og-template';

export async function GET() {
  const png = await renderOgPng({
    title: 'Trust nothing. Test everything.',
    meta: 'Cybersecurity Engineer',
    tags: ['VAPT', 'Pentesting', 'Security Research'],
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
