import { getPublishedPosts } from '../../lib/posts';
import { computeReadTime } from '../../lib/readTime';

export async function GET() {
  const posts = await getPublishedPosts();

  const payload = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    date: post.data.date.toISOString(),
    readTime: computeReadTime(post.body, post.data.readTime),
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

