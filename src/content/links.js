/* Single source of truth for site-wide link lists.
 *
 * Items use `to` for internal routes (rendered with <Link>) and
 * `href` for external URLs (rendered with <a target="_blank">),
 * matching the pattern Nav already uses. `newTab: false` opts an
 * external link out of target="_blank" (e.g. subdomain siblings).
 */

export const navGroups = [
  {
    label: 'Mindset',
    items: [
      { to: '/philosophy', label: 'Philosophy' },
      { to: '/approach', label: 'Approach' },
      { to: '/origin', label: 'The Origin' },
    ],
  },
  {
    label: 'Application',
    items: [
      { to: '/for-builders', label: 'For Builders' },
      { to: '/for-leaders', label: 'For Leaders' },
      { to: '/for-enterprise', label: 'For Enterprise' },
      { to: '/for-hire', label: 'For Hire' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { to: '/media', label: 'Media' },
      { to: '/investiture', label: 'Investiture' },
      { href: 'https://herelabrador.ai', label: 'Labrador' },
      { href: 'https://terminus.zerovector.design', label: 'Terminus' },
      { href: 'https://arroyo.zerovector.design', label: 'Arroyo Labs' },
    ],
  },
];

/* The closing-nav / footer link set. */
export const siteLinks = [
  { href: 'https://open.zerovector.design', label: 'Open Vector', newTab: false },
  { to: '/investiture', label: 'Investiture' },
  { to: '/start', label: 'Get Started' },
  { href: 'https://arroyo.zerovector.design', label: 'Arroyo Labs' },
  { href: 'https://herelabrador.ai', label: 'Labrador' },
  { href: 'https://eflowers.substack.com', label: 'Substack' },
  { href: 'https://www.linkedin.com/in/helloeflowers/', label: 'LinkedIn' },
  { href: 'https://helloerikaflowers.com', label: 'helloerikaflowers.com' },
];

export const legalLinks = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
];
