import { SITE, SOCIAL } from './site';

/** schema.org Person — used on the home and about pages. */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author,
    url: SITE.url,
    email: SITE.email,
    jobTitle: 'Cybersecurity Engineer',
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.medium, SOCIAL.thm],
  };
}

/** schema.org WebSite — used on the home page. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    author: { '@type': 'Person', name: SITE.author, url: SITE.url },
  };
}

/**
 * schema.org BreadcrumbList from the layout's breadcrumb trail.
 * Returns null for the single-item (home) trail so we don't emit a
 * degenerate one-element breadcrumb.
 */
export function breadcrumbSchema(
  crumbs: { label: string; href: string }[]
) {
  if (!crumbs || crumbs.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: new URL(c.href, SITE.url).href,
    })),
  };
}

/** schema.org Article — used on individual blog post pages. */
export function articleSchema(args: {
  headline: string;
  description: string;
  image: string;
  datePublished: Date;
  articleSection: string;
  url: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    image: args.image,
    datePublished: args.datePublished.toISOString(),
    articleSection: args.articleSection,
    author: {
      '@type': 'Person',
      name: SITE.author,
      url: `${SITE.url}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: SITE.author,
      url: SITE.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': args.url,
    },
    ...(args.tags && args.tags.length > 0 && { keywords: args.tags.join(', ') }),
  };
}
