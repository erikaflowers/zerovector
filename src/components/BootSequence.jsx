import { useState, useEffect, useRef } from 'react';

const BOOT_LINES = [
  { text: 'ZERO-VECTOR DESIGN SYSTEM v2.026', delay: 100 },
  { text: 'INITIALIZING TACTICAL DISPLAY...', delay: 400 },
  { text: 'LOADING MANIFESTO CORE... OK', delay: 800 },
  { text: 'CREW STATUS: 10 AGENTS ONLINE', delay: 1100 },
  { text: 'COORDINATES: 44.8024 N / 68.7853 W', delay: 1400 },
  { text: 'ALL SYSTEMS NOMINAL', delay: 1700 },
  { text: '', delay: 2000 },
  { text: 'WELCOME, AUTEUR.', delay: 2200 },
];

function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(() => {
    try { return !!sessionStorage.getItem('zv-booted'); } catch { return false; }
  });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (done) {
      onCompleteRef.current?.();
      return;
    }

    // Track every per-line timer so unmount during the boot sequence cleans them up.
    const lineTimers = BOOT_LINES.map(({ text, delay }) =>
      setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay)
    );

    // Start fade
    const fadeTimer = setTimeout(() => setFading(true), 3000);

    // Complete
    const doneTimer = setTimeout(() => {
      setDone(true);
      try { sessionStorage.setItem('zv-booted', '1'); } catch {}
      onCompleteRef.current?.();
    }, 3700);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [done]);

  if (done) return null;

  return (
    <div className={`zv-boot-inline ${fading ? 'zv-boot-inline--fading' : ''}`}>
      {lines.map((line, i) => (
        <div key={i} className="zv-boot-line">
          {line ? `> ${line}` : '\u00A0'}
        </div>
      ))}
      <span className="zv-boot-cursor">_</span>
    </div>
  );
}

export default BootSequence;
