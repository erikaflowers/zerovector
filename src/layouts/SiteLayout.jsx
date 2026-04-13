import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import '../styles/zv/index.css';

function SiteLayout() {
  const { pathname } = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTransitioning(true);
    const timer = setTimeout(() => setTransitioning(false), 20);

    // Google Analytics — track SPA page views
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
    }

    return () => clearTimeout(timer);
  }, [pathname]);

  // Body styles moved to zv/base.css on the html/body rule.
  // Investiture and Zero Hack standalone pages still use the
  // useBodyTheme hook for their own dark themes.

  return (
    <div className={`zv-site ${transitioning ? 'zv-page-enter' : 'zv-page-active'}`}>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default SiteLayout;
