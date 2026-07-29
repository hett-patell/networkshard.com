import { renderOgPng } from '../../../lib/og-template';
import { getPublishedPosts } from '../../../lib/posts';
import { slugify } from '../../../lib/slugify';

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  const slugs = new Set<string>();
  const labels = new Map<string, string>();
  for (const post of posts) {
    for (const tag of post.data.tags || []) {
      const s = slugify(tag);
      slugs.add(s);
      if (!labels.has(s)) labels.set(s, tag);
    }
  }
  return [...slugs].map((tag) => ({
    params: { tag },
    props: { label: labels.get(tag) || tag },
  }));
}

export async function GET({ props }: { props: { label: string } }) {
  const png = await renderOgPng({
    title: props.label,
    meta: 'Tagged articles',
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
