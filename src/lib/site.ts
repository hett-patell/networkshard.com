/**
 * Single source of truth for site-wide identity, contact, and social links.
 * Centralizes values that were previously hard-coded across multiple pages
 * (the footer email, in particular, diverged from the rest of the site).
 */
export const SITE = {
  name: 'networkshard',
  title: 'networkshard',
  author: 'Het Patel',
  url: 'https://networkshard.com',
  email: 'hello@networkshard.com',
  github: 'https://github.com/hett-patell',
  description:
    'Het Patel — Cybersecurity Engineer specializing in penetration testing, VAPT, vulnerability assessment, and security research.',
} as const;

export const SOCIAL = {
  github: 'https://github.com/hett-patell',
  linkedin: 'https://www.linkedin.com/in/hetpatel9/',
  medium: 'https://hettt.medium.com/',
  thm: 'https://tryhackme.com/p/hettt',
  rss: '/rss.xml',
  email: `mailto:${SITE.email}`,
} as const;
