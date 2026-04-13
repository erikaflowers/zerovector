import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/* Per-page featured essay mapping. PageHero reads the current
 * pathname and picks the matching essay. If no match, falls back
 * to Zero Stage to Orbit. Data lives here (colocated with the
 * component that renders it) rather than in src/content/ because
 * it's presentation config, not page copy. */

const ESSAYS = {
  '/philosophy': {
    title: 'Trade Your Double Diamonds for Steel',
    subtitle: 'AI does not compress the design process. It alloys discovery and delivery into a material neither could become alone.',
    date: 'March 12, 2026',
    url: 'https://eflowers.substack.com/p/trade-your-double-diamonds-for-steel',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/5371083a-9a91-4431-96a9-7d5d0fd12528_1600x678.png',
  },
  '/approach': {
    title: 'Zero Stage to Orbit',
    subtitle: 'The design-to-development pipeline is not broken; it is a multi-stage rocket, and we never questioned the gravity.',
    date: 'February 21, 2026',
    url: 'https://eflowers.substack.com/p/zero-stage-to-orbit',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/04e8e131-9dcf-44ec-953a-b96e5ad85e1c_1600x678.jpeg',
  },
  '/for-builders': {
    title: 'Agentic Development is just MMOs for Coding',
    subtitle: 'World of RealCraft is here, the geeks were right.',
    date: 'February 27, 2026',
    url: 'https://eflowers.substack.com/p/agentic-development-is-just-mmos',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/40136e2b-62dc-4303-81e8-6a4653c253e4_1600x678.jpeg',
  },
  '/for-leaders': {
    title: 'Mutually Assured Construction',
    subtitle: 'We all build, or the vultures build for us.',
    date: 'March 6, 2026',
    url: 'https://eflowers.substack.com/p/mutually-assured-construction',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/3d134f97-097f-47fb-8207-ab05835ff34d_1600x678.jpeg',
  },
  '/for-enterprise': {
    title: 'The Last Typesetter',
    subtitle: 'When the container dissolves, the craft that was inside it is set free.',
    date: 'March 8, 2026',
    url: 'https://eflowers.substack.com/p/the-last-typesetter',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/9eccacd7-8b4d-477a-8200-eae4791332b0_1600x678.png',
  },
  '/for-hire': {
    title: 'Second Rodeos',
    subtitle: 'Every tool you master will be replaced. The navigation that chose the tool will not.',
    date: 'April 5, 2026',
    url: 'https://eflowers.substack.com/p/second-rodeos',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/2b18654d-4268-44cb-9f80-54ff45c8a7df_1600x678.png',
  },
  '/media': {
    title: 'The Napoleon Express',
    subtitle: 'People in every era confuse the delivery mechanism with the purpose; the real purpose is getting meaning to the person who needs it.',
    date: 'March 23, 2026',
    url: 'https://eflowers.substack.com/p/the-napoleon-express',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/09542eda-d429-4ed5-9927-307e8f58d822_1600x678.png',
  },
  '/origin': {
    title: 'Retirement Announcement',
    subtitle: 'The better I got at design, the further I drifted from what I actually am.',
    date: 'February 24, 2026',
    url: 'https://eflowers.substack.com/p/retirement-announcement',
    image: 'https://substack-post-media.s3.amazonaws.com/public/images/9c74416e-05d0-470c-9a95-29c7a881158d_1600x678.jpeg',
  },
  '/start': {
    title: 'Tiny Voices',
    subtitle: 'A letter to every designer who is scared right now.',
    date: 'March 26, 2026',
    url: 'https://eflowers.substack.com/p/tiny-voices',
    image: 'https://substackcdn.com/image/youtube/w_728,c_limit/k9d0YovsHUc',
  },
};

const DEFAULT_ESSAY = ESSAYS['/approach'];

const SUB_HERO_VIDEOS = [
  '/video/bg-1.mov',
  '/video/bg-2.mov',
  '/video/bg-3.mov',
  '/video/bg-4.mov',
  '/video/bg-5.mov',
];

function SubstackIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 3.2H2V4.8h12V3.2zM2 6.4v1.2l6 3.6 6-3.6V6.4H2zM2 1.6h12v1.2H2V1.6z" />
    </svg>
  );
}

function PageHero({ eyebrow, title, subtitle }) {
  const { pathname } = useLocation();
  const essay = ESSAYS[pathname] || DEFAULT_ESSAY;

  const [videoSrc] = useState(() =>
    SUB_HERO_VIDEOS[Math.floor(Math.random() * SUB_HERO_VIDEOS.length)]
  );

  return (
    <section className="zv-section zv-page-hero">
      <div className="zv-page-hero-video-wrap" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="zv-page-hero-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="zv-page-hero-video-overlay" />
      </div>
      <div className="zv-container">
        <div className="zv-page-hero-left">
          <h1 className="zv-page-title">{title}</h1>
          <p className="zv-hero-subtitle">{subtitle}</p>
        </div>
        <div className="zv-page-hero-essay-wrapper">
          <span className="zv-page-hero-essay-label">
            <SubstackIcon /> Related Essay
          </span>
          <a
            href={essay.url}
            target="_blank"
            rel="noopener noreferrer"
            className="zv-page-hero-essay"
          >
            <img
              src={essay.image}
              alt={essay.title}
              className="zv-page-hero-essay-img"
              loading="lazy"
            />
            <div className="zv-page-hero-essay-meta">
              <div className="zv-page-hero-essay-date">{essay.date}</div>
              <div className="zv-page-hero-essay-title">{essay.title}</div>
              <div className="zv-page-hero-essay-subtitle">{essay.subtitle}</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
