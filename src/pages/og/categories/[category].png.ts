import { renderOgPng } from '../../../lib/og-template';
import { CATEGORIES } from '../../../lib/taxonomy';

export async function getStaticPaths() {
  return CATEGORIES.map((category) => ({
    params: { category: category.id },
    props: { category },
  }));
}

export async function GET({ props }: { props: { category: (typeof CATEGORIES)[number] } }) {
  const png = await renderOgPng({
    title: props.category.label,
    meta: props.category.description,
    tags: ['Category'],
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
