import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

/**
 * Rehype plugin: add `loading="lazy"` and `decoding="async"` to every <img>
 * in rendered markdown that doesn't already set them.
 *
 * Blog posts embed remote (Medium CDN) images with no dimensions; lazy +
 * async decoding keeps long posts from eagerly fetching every image up front.
 * Only real HAST <img> elements are touched — <img> text inside fenced code
 * blocks is a text node, not an element, so code samples are left intact.
 */
export default function rehypeImgAttrs() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return;
      node.properties ??= {};
      if (node.properties.loading == null) node.properties.loading = 'lazy';
      if (node.properties.decoding == null) node.properties.decoding = 'async';
    });
  };
}
