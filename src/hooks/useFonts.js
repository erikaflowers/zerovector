import { useEffect } from 'react';

/**
 * Loads one or more Google Font stylesheets via injected <link> tags on mount,
 * removes them on unmount. Used to keep heavyweight font families (Fraunces,
 * Source Serif 4, Outfit) off the manifesto routes' first paint — only the
 * standalone Investiture and Zero Hack pages pay their cost.
 *
 * Pass an array of full Google Fonts CSS URLs (the kind from <link href="...">).
 */
export default function useFonts(urls) {
  useEffect(() => {
    const links = urls.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((link) => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
