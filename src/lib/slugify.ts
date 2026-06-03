/**
 * Normalize a label (tag, category) into a URL-safe slug.
 * Lowercase, `&` → `and`, any run of non-alphanumerics → `-`, trimmed.
 * e.g. "CERT-IN" → "cert-in", "SQL & NoSQL" → "sql-and-nosql".
 *
 * Previously copy-pasted in six places across the tag/category pages.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
