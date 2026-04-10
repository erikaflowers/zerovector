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

  useEffect(() => {
    document.body.style.background = '#181818';
    document.body.style.color = '#ffffff';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';

    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
      document.body.style.minHeight = '';
    };
  }, []);

  return (
    <div className={`zv-site ${transitioning ? 'zv-page-enter' : 'zv-page-active'}`}>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default SiteLayout;
