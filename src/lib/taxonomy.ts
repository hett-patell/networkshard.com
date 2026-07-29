export const CATEGORY_IDS = ['research', 'guides', 'threat-intel'] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface CategoryDefinition {
  id: CategoryId;
  label: string;
  description: string;
  href: `/categories/${CategoryId}/`;
}

export const CATEGORIES: readonly CategoryDefinition[] = [
  {
    id: 'research',
    label: 'Research & Findings',
    description: 'Firsthand findings, case studies, validation, and engineering retrospectives.',
    href: '/categories/research/',
  },
  {
    id: 'guides',
    label: 'Guides & Fundamentals',
    description: 'First-party operational guides and durable technical explanations.',
    href: '/categories/guides/',
  },
  {
    id: 'threat-intel',
    label: 'Threat Intelligence & Operations',
    description: 'Honeypots, attacker telemetry, campaigns, malware observation, and defensive operations.',
    href: '/categories/threat-intel/',
  },
];

export function isCategoryId(value: string | undefined): value is CategoryId {
  return CATEGORY_IDS.some((id) => id === value);
}

export function getCategory(value: string | undefined): CategoryDefinition | undefined {
  return isCategoryId(value) ? CATEGORIES.find((category) => category.id === value) : undefined;
}

export function getCategoryLabel(value: string | undefined): string {
  return getCategory(value)?.label ?? 'Uncategorized';
}

export function categoryUrl(category: CategoryId): `/categories/${CategoryId}/` {
  return `/categories/${category}/`;
}
