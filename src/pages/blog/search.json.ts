import { getPostSlug, getPublishedPosts } from '../../lib/posts';
import { computeReadTime } from '../../lib/readTime';
import { getCategoryLabel, type CategoryId } from '../../lib/taxonomy';

export async function GET() {
  const posts = await getPublishedPosts();

  const payload = posts.map((post) => ({
    slug: getPostSlug(post),
    title: post.data.title,
    description: post.data.description,
    category: {
      id: post.data.category as CategoryId,
      label: getCategoryLabel(post.data.category as CategoryId),
    },
    date: post.data.date.toISOString(),
    readTime: computeReadTime(post.body ?? '', post.data.readTime),
  }));

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
}

