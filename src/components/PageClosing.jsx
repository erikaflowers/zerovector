import { Link } from 'react-router-dom';
import NotifyForm from './NotifyForm';
import Animate from './Animate';
import { ArrowIcon, ExternalLinkIcon } from './icons';

/**
 * PageClosing — Shared orange CTA band used at the bottom of every content page.
 *
 * @param {string} headline - Section headline
 * @param {string} body - Optional body text below headline
 * @param {{ label: string, to: string }} primaryCta - Internal link button
 * @param {{ label: string, to?: string, href?: string }} secondaryCta - Second button (internal or external)
 * @param {boolean} showNewsletter - Show email signup (default true)
 * @param {string} newsletterTag - Buttondown tag (default "zerovector")
 */
function PageClosing({
  headline,
  body,
  primaryCta,
  secondaryCta,
  showNewsletter = true,
  newsletterTag = 'zerovector',
}) {
  return (
    <section className="zv-page-closing">
      <div className="zv-container">
        <Animate>
          <div className="zv-page-closing-content">
            <div className="zv-page-closing-primary">
              <h2 className="zv-page-closing-headline">{headline}</h2>
              {body && <p className="zv-page-closing-body">{body}</p>}
              <div className="zv-page-closing-actions">
                {primaryCta && (
                  primaryCta.href ? (
                    <a href={primaryCta.href} target="_blank" rel="noopener noreferrer" className="zv-page-closing-cta zv-page-closing-cta--primary">
                      {primaryCta.label} <ExternalLinkIcon size={14} />
                    </a>
                  ) : (
                    <Link to={primaryCta.to} className="zv-page-closing-cta zv-page-closing-cta--primary">
                      {primaryCta.label} <ArrowIcon size={14} />
                    </Link>
                  )
                )}
                {secondaryCta && (
                  secondaryCta.href ? (
                    <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer" className="zv-page-closing-cta zv-page-closing-cta--secondary">
                      {secondaryCta.label} <ExternalLinkIcon size={14} />
                    </a>
                  ) : (
                    <Link to={secondaryCta.to} className="zv-page-closing-cta zv-page-closing-cta--secondary">
                      {secondaryCta.label} <ArrowIcon size={14} />
                    </Link>
                  )
                )}
              </div>
            </div>
            {showNewsletter && (
              <div className="zv-page-closing-secondary">
                <p className="zv-page-closing-notify-label">Get notified when new content drops.</p>
                <NotifyForm variant="orange" tag={newsletterTag} />
              </div>
            )}
          </div>
        </Animate>
        <nav className="zv-page-closing-nav" aria-label="Site navigation">
          <a href="https://open.zerovector.design">Open Vector</a>
          <Link to="/investiture">Investiture</Link>
          <Link to="/start">Get Started</Link>
          <a href="https://herelabrador.ai" target="_blank" rel="noopener noreferrer">Labrador</a>
          <a href="https://eflowers.substack.com" target="_blank" rel="noopener noreferrer">Substack</a>
          <a href="https://www.linkedin.com/in/helloeflowers/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://helloerikaflowers.com" target="_blank" rel="noopener noreferrer">helloerikaflowers.com</a>
        </nav>
      </div>
    </section>
  );
}

export default PageClosing;
