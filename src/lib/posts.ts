import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Derive the public blog slug from the content-layer entry ID. */
export function getPostSlug(post: Pick<Post, 'id'>): string {
  return post.id.replace(/\.(?:md|mdx)$/, '').replace(/\/index$/, '');
}

/**
 * Canonical post fetch: published (non-draft) posts, newest first.
 * Routing every page through this guarantees consistent draft filtering —
 * previously some routes (blog index, search, OG images, the post route
 * itself) shipped drafts while tags/categories/RSS excluded them.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
