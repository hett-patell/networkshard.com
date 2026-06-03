/**
 * Compute a human-readable read time from a post body.
 *
 * Read time is shown in many list contexts (search index, latest-post card,
 * tag/category lists) that only have collection data — not the rendered
 * `Content` — so this works from the raw markdown `post.body`.
 *
 * A manual `readTime` frontmatter value, if present, always wins (override).
 */
const WORDS_PER_MINUTE = 200;

export function computeReadTime(body: string, override?: string): string {
  if (override && override.trim()) return override.trim();
  const words = (body || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
