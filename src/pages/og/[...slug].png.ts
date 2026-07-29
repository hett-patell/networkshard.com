import type { APIContext, GetStaticPaths } from 'astro';
import { renderOgPng } from '../../lib/og-template';
import { getPostSlug, getPublishedPosts } from '../../lib/posts';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: getPostSlug(post) },
    props: { title: post.data.title, tags: post.data.tags || [], date: post.data.date },
  }));
};

export async function GET({ props }: APIContext) {
  const { title, tags, date } = props as { title: string; tags: string[]; date: Date };

  const meta = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const png = await renderOgPng({ title, tags, meta });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
