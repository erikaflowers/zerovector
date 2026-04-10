import { useEffect } from 'react';

/**
 * Mutates document.body styles for standalone-layout pages (Investiture, Zero Hack)
 * that bypass SiteLayout and need their own dark theme. Reverts to whatever the body
 * had on mount when the component unmounts, so navigating between themed pages
 * doesn't leak background colors across routes.
 */
export default function useBodyTheme({ background, color, margin = '0' }) {
  useEffect(() => {
    const prev = {
      background: document.body.style.background,
      color: document.body.style.color,
      margin: document.body.style.margin,
      minHeight: document.body.style.minHeight,
    };
    document.body.style.background = background;
    document.body.style.color = color;
    document.body.style.margin = margin;
    document.body.style.minHeight = '100vh';
    return () => {
      document.body.style.background = prev.background;
      document.body.style.color = prev.color;
      document.body.style.margin = prev.margin;
      document.body.style.minHeight = prev.minHeight;
    };
  }, [background, color, margin]);
}
