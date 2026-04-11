import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useSEO from '../hooks/useSEO';

function NotFoundPage() {
  useSEO({
    title: '404 — Signal Lost',
    description: 'No vector found at this coordinate.',
    path: '/404',
  });

  return (
    <div className="zv-page">
      <Nav />

      <section className="zv-section zv-404">
        <div className="zv-container">
          <div className="zv-404-terminal">
            <div className="zv-404-line zv-404-code">404</div>
            <div className="zv-404-line zv-404-title">SIGNAL LOST</div>
            <div className="zv-404-line zv-404-desc">No vector found at this coordinate.</div>
            <div className="zv-404-line zv-404-prompt">
              <span className="zv-404-cursor">&gt;</span> Recalibrating...
            </div>
            <Link to="/" className="zv-cta" style={{ marginTop: 40 }}>
              Return to Origin
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
