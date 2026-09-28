import { useEffect } from 'react';

/**
 * useSEO — Sets document title, meta description, and OG/Twitter tags per page.
 * On unmount, reverts to defaults so navigating back to homepage restores root meta.
 *
 * @param {Object} options
 * @param {string} options.title - Page title (appended with " — Zero-Vector Design" if not homepage)
 * @param {string} options.description - Meta description for this page
 * @param {string} [options.path] - URL path (e.g. '/builders') for canonical + og:url
 * @param {string} [options.ogImage] - OG image URL (defaults to site-wide card)
 * @param {boolean} [options.noindex] - Private pages (e.g. /my): robots noindex,nofollow
 */

const SITE = 'Zero-Vector Design';
const BASE_URL = 'https://zerovector.design';
const DEFAULT_DESC = 'A design philosophy for the age of AI. No intermediary. No translation layer. No friction. From intent to artifact, directly.';
const DEFAULT_IMAGE = `${BASE_URL}/og-card.png`;

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

export default function useSEO({ title, description, path = '/', ogImage, noindex = false } = {}) {
  useEffect(() => {
    const fullTitle = path === '/' ? SITE : `${title} — ${SITE}`;
    const desc = description || DEFAULT_DESC;
    const url = `${BASE_URL}${path}`;
    const image = ogImage || DEFAULT_IMAGE;

    document.title = fullTitle;

    // Standard meta
    setMeta('description', desc);

    // Open Graph
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', desc, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:image', image, 'property');

    // Twitter
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', image);

    // Canonical
    setCanonical(url);

    if (noindex) setMeta('robots', 'noindex, nofollow');

    return () => {
      if (noindex) document.querySelector('meta[name="robots"]')?.remove();
      // Revert to defaults on unmount
      document.title = SITE;
      setMeta('description', DEFAULT_DESC);
      setMeta('og:title', SITE, 'property');
      setMeta('og:description', DEFAULT_DESC, 'property');
      setMeta('og:url', BASE_URL, 'property');
      setMeta('og:image', DEFAULT_IMAGE, 'property');
      setMeta('twitter:title', SITE);
      setMeta('twitter:description', DEFAULT_DESC);
      setMeta('twitter:image', DEFAULT_IMAGE);
      setCanonical(BASE_URL);
    };
  }, [title, description, path, ogImage, noindex]);
}
