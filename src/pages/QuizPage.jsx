import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Animate from '../components/Animate';
import { ArrowIcon } from '../components/icons';
import useSEO from '../hooks/useSEO';
import en from '../content/en';

const { quiz } = en;
const QUESTIONS = quiz.questions;
const ARCHETYPES = quiz.archetypes;

function getArchetype(score) {
  return ARCHETYPES.find(a => score >= a.min && score <= a.max) || ARCHETYPES[0];
}

function ShareCard({ result, archetype }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://zerovector.design/quiz?score=${result.score}&title=${encodeURIComponent(result.title)}`;
  const shareText = `I scored ${result.score}/100 on the "Am I Vibe Coding?" assessment — I'm "${archetype.name}." ${archetype.tagline} Take the quiz:`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = `${shareText} ${shareUrl}`;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="zv-quiz-share">
      <div className="zv-quiz-share-label">Share Your Score</div>
      <div className="zv-quiz-share-actions">
        <button className="zv-quiz-share-btn" onClick={copyLink}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <button className="zv-quiz-share-btn" onClick={shareLinkedIn}>
          LinkedIn
        </button>
        <button className="zv-quiz-share-btn" onClick={shareX}>
          X / Twitter
        </button>
      </div>
    </div>
  );
}

function SharedResult({ score, title }) {
  return (
    <div className="zv-quiz-shared">
      <Animate>
        <div className="zv-quiz-shared-card">
          <div className="zv-quiz-shared-eyebrow">Am I Vibe Coding?</div>
          <div className="zv-quiz-score-row">
            <div className="zv-quiz-score">{score}</div>
            <div className="zv-quiz-score-label">/100</div>
          </div>
          <div className="zv-quiz-title">{title}</div>
          <p className="zv-quiz-shared-cta">Someone shared their score with you. Take the assessment yourself.</p>
        </div>
      </Animate>
    </div>
  );
}

function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sharedScore, setSharedScore] = useState(null);

  useSEO({
    title: 'Am I Vibe Coding?',
    description: 'Take the quiz. Describe your workflow and find out if you are vibe coding or building with intent. AI-scored assessment from Zero-Vector Design.',
    path: '/quiz',
    ogImage: 'https://zerovector.design/og/quiz.png',
  });

  // Check for shared score in URL params
  useEffect(() => {
    const score = searchParams.get('score');
    const title = searchParams.get('title');
    if (score && title) {
      setSharedScore({ score: parseInt(score, 10), title });
      // Clear params so they don't persist after taking the quiz
      setSearchParams({}, { replace: true });
    }
  }, []);

  const updateAnswer = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const filledCount = QUESTIONS.filter(q => answers[q.id]?.trim()).length;

  const submit = async () => {
    if (filledCount < 3 || loading) return;
    setLoading(true);
    setSharedScore(null); // Clear shared result when taking the quiz

    try {
      const res = await fetch('/.netlify/functions/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setResult({ score: 0, title: 'Rate Limited', summary: 'Transmission frequency exceeded. Wait a few minutes before trying again.', strengths: [], friction: [], nextStep: '' });
      } else if (data.score !== undefined) {
        setResult(data);
      } else {
        setResult({ score: 0, title: 'Error', summary: 'Assessment failed. Try again.', strengths: [], friction: [], nextStep: '' });
      }
    } catch {
      setResult({ score: 0, title: 'Error', summary: 'Transmission failed. Try again.', strengths: [], friction: [], nextStep: '' });
    }

    setLoading(false);
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="zv-page">
      <VectorField />
      <Nav />

      <PageHero
        eyebrow={quiz.eyebrow}
        title={quiz.title}
        subtitle={quiz.subtitle}
      />

      <section className="zv-section zv-quiz-section">
        <div className="zv-container">
          {/* Shared score card from URL params */}
          {sharedScore && !result && (
            <SharedResult score={sharedScore.score} title={sharedScore.title} />
          )}

          {!result ? (
            <div className="zv-quiz">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="zv-quiz-question">
                  <div className="zv-quiz-label">{q.label}</div>
                  <label className="zv-quiz-text" htmlFor={q.id}>{q.question}</label>
                  <textarea
                    id={q.id}
                    className="zv-quiz-input"
                    value={answers[q.id] || ''}
                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={3}
                    disabled={loading}
                  />
                </div>
              ))}
              <div className="zv-quiz-submit-row">
                <button
                  className="zv-cta"
                  onClick={submit}
                  disabled={filledCount < 3 || loading}
                  style={{ opacity: filledCount < 3 ? 0.4 : 1 }}
                >
                  {loading ? 'Analyzing...' : 'Assess My Process'}
                </button>
                <span className="zv-quiz-counter">{filledCount}/5 answered {filledCount < 3 && '(min 3)'}</span>
              </div>
            </div>
          ) : (
            <div className="zv-quiz-result">
              {(() => {
                const archetype = getArchetype(result.score);
                return (
                  <>
                    {/* Archetype Card */}
                    <div className="zv-quiz-archetype" style={{ borderColor: archetype.color }}>
                      <div className="zv-quiz-archetype-score">
                        <span className="zv-quiz-score">{result.score}</span>
                        <span className="zv-quiz-score-label">/100</span>
                      </div>
                      <div className="zv-quiz-archetype-name" style={{ color: archetype.color }}>{archetype.name}</div>
                      <div className="zv-quiz-archetype-tagline">{archetype.tagline}</div>
                      <p className="zv-quiz-archetype-desc">{archetype.description}</p>
                    </div>

                    {/* AI Assessment Details */}
                    <div className="zv-quiz-title">{result.title}</div>
                    <p className="zv-quiz-summary">{result.summary}</p>

                    {result.strengths?.length > 0 && (
                      <div className="zv-quiz-section">
                        <div className="zv-quiz-section-label">Strengths</div>
                        {result.strengths.map((s, i) => (
                          <p key={i} className="zv-quiz-item zv-quiz-item--strength">{s}</p>
                        ))}
                      </div>
                    )}

                    {result.friction?.length > 0 && (
                      <div className="zv-quiz-section">
                        <div className="zv-quiz-section-label">Friction Points</div>
                        {result.friction.map((f, i) => (
                          <p key={i} className="zv-quiz-item zv-quiz-item--friction">{f}</p>
                        ))}
                      </div>
                    )}

                    {result.nextStep && (
                      <div className="zv-quiz-section">
                        <div className="zv-quiz-section-label">Next Step</div>
                        <p className="zv-quiz-next">{result.nextStep}</p>
                      </div>
                    )}

                    <ShareCard result={result} archetype={archetype} />

                    {/* Post-Result CTAs */}
                    <div className="zv-quiz-ctas">
                      {archetype.cta.link.startsWith('http') ? (
                        <a href={archetype.cta.link} className="zv-cta">
                          {archetype.cta.label} <ArrowIcon size={14} />
                        </a>
                      ) : (
                        <Link to={archetype.cta.link} className="zv-cta">
                          {archetype.cta.label} <ArrowIcon size={14} />
                        </Link>
                      )}
                      <a href="https://open.zerovector.design/learn" className="zv-cta zv-cta-outline">
                        Explore the Open Vector Curriculum <ArrowIcon size={14} />
                      </a>
                    </div>

                    <button className="zv-cta zv-cta-outline zv-quiz-reset" onClick={reset}>
                      Take It Again
                    </button>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default QuizPage;
