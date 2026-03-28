import { useEffect, useState, useRef } from 'react';
import VectorField from '../components/VectorField';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import useSEO from '../hooks/useSEO';

function AskPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bootPhase, setBootPhase] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useSEO({
    title: 'Ask the Manifesto',
    description: 'Talk directly to the Zero-Vector manifesto. Ask questions about design philosophy, AI-native building, and the principles behind Zero-Vector Design.',
    path: '/ask',
  });

  // Boot sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase(1), 300),
      setTimeout(() => setBootPhase(2), 800),
      setTimeout(() => setBootPhase(3), 1400),
      setTimeout(() => setBootPhase(4), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (bootPhase >= 4) {
      inputRef.current?.focus();
    }
  }, [bootPhase]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'ERR: Transmission frequency exceeded. Retry in 120s.' }]);
      } else if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'ERR: Signal lost. Retry transmission.' }]);
      }
    } catch (err) {
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const msg = isDev
        ? 'ERR: Function server unreachable. Run "netlify dev" instead of "npm run dev" for local function support.'
        : 'ERR: Connection failed. Retry transmission.';
      setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions = [
    'What is the difference between Zero-Vector and vibe coding?',
    'Our team uses Figma, then hands off to engineering. What would you change?',
    'How do I start practicing Zero-Vector Design?',
  ];

  return (
    <div className="zv-page">
      <VectorField />
      <Nav />

      <section className="zv-section zv-terminal-section">
        <div className="zv-container">
          <div className="zv-terminal">
            {/* Terminal chrome */}
            <div className="zv-terminal-header">
              <div className="zv-terminal-dots">
                <span /><span /><span />
              </div>
              <div className="zv-terminal-title">MANIFESTO INTERFACE v2.0</div>
              <div className="zv-terminal-status">
                {bootPhase >= 4 ? 'CONNECTED' : 'BOOTING...'}
              </div>
            </div>

            {/* Terminal body */}
            <div className="zv-terminal-body">
              {/* Boot sequence */}
              <div className="zv-terminal-boot">
                {bootPhase >= 1 && (
                  <div className="zv-terminal-line zv-terminal-system">
                    [SYSTEM] Initializing manifesto interface...
                  </div>
                )}
                {bootPhase >= 2 && (
                  <div className="zv-terminal-line zv-terminal-system">
                    [SYSTEM] Loading doctrine: 7 principles, 8 phases, 1 philosophy
                  </div>
                )}
                {bootPhase >= 3 && (
                  <div className="zv-terminal-line zv-terminal-system">
                    [SYSTEM] RAG corpus mounted. Knowledge base active.
                  </div>
                )}
                {bootPhase >= 4 && (
                  <div className="zv-terminal-line zv-terminal-ready">
                    [READY] Ask a question. Challenge a principle. Describe your process.
                  </div>
                )}
              </div>

              {/* Messages */}
              {messages.length === 0 && bootPhase >= 4 && (
                <div className="zv-terminal-suggestions">
                  <div className="zv-terminal-line zv-terminal-system zv-terminal-suggestions-header">
                    [SUGGESTED QUERIES]
                  </div>
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      className="zv-terminal-suggestion"
                      onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}
                    >
                      <span className="zv-terminal-suggestion-num">[{String(i + 1).padStart(2, '0')}]</span>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`zv-terminal-line ${msg.role === 'user' ? 'zv-terminal-user' : 'zv-terminal-response'}`}>
                  <span className="zv-terminal-prompt">
                    {msg.role === 'user' ? '>' : '[MANIFESTO]'}
                  </span>
                  {' '}{msg.content}
                </div>
              ))}

              {loading && (
                <div className="zv-terminal-line zv-terminal-response zv-terminal-loading">
                  <span className="zv-terminal-prompt">[MANIFESTO]</span>
                  {' '}<span className="zv-terminal-cursor-block" />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Terminal input */}
            <div className={`zv-terminal-input-row ${bootPhase < 4 ? 'zv-terminal-input-disabled' : ''}`}>
              <span className="zv-terminal-input-prompt">&gt;</span>
              <textarea
                ref={inputRef}
                className="zv-terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={bootPhase >= 4 ? 'Enter query...' : ''}
                rows={1}
                disabled={loading || bootPhase < 4}
              />
              <button
                className="zv-terminal-send"
                onClick={send}
                disabled={loading || !input.trim() || bootPhase < 4}
              >
                TRANSMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AskPage;
