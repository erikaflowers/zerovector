import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import PageClosing from '../components/PageClosing';
import { ExternalLinkIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { media } = en;

function ReadingPage() {
  useSEO({
    title: 'Media',
    description: 'Articles, books, podcast episodes, and talks on Zero-Vector Design, AI-native product development, and the future of building.',
    path: '/media',
    ogImage: 'https://zerovector.design/og/media.png',
  });

  return (
    <div className="zv-page zv-info-page">
      <Nav />

      {/* Hero */}
      <PageHero eyebrow={media.eyebrow} title={media.title} subtitle={media.subtitle} />

      {/* Featured — Substack + Podcast */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">{media.featured.title}</h2>
          </Animate>
          <div className="zv-media-featured">
            {media.featured.items.map((item, i) => (
              <Animate key={i}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="zv-media-featured-card">
                  <div className="zv-media-featured-type">{item.type}</div>
                  <h3 className="zv-media-featured-title">{item.title}</h3>
                  <p className="zv-media-featured-desc">{item.description}</p>
                  <span className="zv-media-featured-cta">{item.cta} <ExternalLinkIcon size={14} /></span>
                </a>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">Articles</h2>
          </Animate>
          <div className="zv-resource-list">
            {media.articles.map((item, i) => (
              <Animate key={i}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="zv-resource-card">
                  <div className="zv-resource-card-type">Substack</div>
                  <div className="zv-resource-card-title">{item.title} <ExternalLinkIcon size={14} /></div>
                  <div className="zv-resource-card-desc">{item.description}</div>
                </a>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">Recommended Reading</h2>
          </Animate>
          <div className="zv-resource-list">
            {media.books.map((book, i) => (
              <Animate key={i}>
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="zv-resource-card">
                  <div className="zv-resource-card-type">Book</div>
                  <div className="zv-resource-card-title">{book.title} <ExternalLinkIcon size={14} /></div>
                  <div className="zv-resource-card-desc">{book.author} — {book.description}</div>
                </a>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Talks */}
      <section className="zv-section">
        <div className="zv-container">
          <Animate>
            <h2 className="zv-section-title">Videos &amp; Talks</h2>
          </Animate>
          <div className="zv-resource-list">
            {media.talks.map((talk, i) => (
              <Animate key={i}>
                <a href={talk.url} target="_blank" rel="noopener noreferrer" className="zv-resource-card">
                  <div className="zv-resource-card-type">{talk.type}</div>
                  <div className="zv-resource-card-title">{talk.title} <ExternalLinkIcon size={14} /></div>
                  <div className="zv-resource-card-desc">{talk.description}</div>
                </a>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* People to Follow */}
      {media.voices.items.length > 0 && (
        <section className="zv-section">
          <div className="zv-container">
            <Animate>
              <h2 className="zv-section-title">{media.voices.title}</h2>
              <p className="zv-section-subtitle">{media.voices.subtitle}</p>
            </Animate>
            <div className="zv-resource-list zv-resource-list--spaced">
              {media.voices.items.map((person, i) => (
                <Animate key={i}>
                  <a href={person.url} target="_blank" rel="noopener noreferrer" className="zv-resource-card">
                    <div className="zv-resource-card-title">{person.name} <ExternalLinkIcon size={14} /></div>
                    <div className="zv-resource-card-desc">{person.description}</div>
                  </a>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      )}

      <PageClosing
        headline="Done Reading? Start Building."
        primaryCta={{ label: "Where To Start", to: "/start" }}
        secondaryCta={{ label: "Read the Philosophy", to: "/philosophy" }}
      />

    </div>
  );
}

export default ReadingPage;
