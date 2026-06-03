import { renderOgPng } from '../../lib/og-template';

export async function GET() {
  const png = await renderOgPng({
    title: 'Projects — Security Tools & Web Apps',
    meta: 'Het Patel',
    tags: ['Go', 'TypeScript', 'Security'],
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
