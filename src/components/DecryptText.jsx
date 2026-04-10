import { useState, useEffect, useRef } from 'react';

const SCRAMBLE_CHARS = '4815162342ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function DecryptText({ text, delay = 0, speed = 100, blinks = 3, blinkSpeed = 120, ready = true, onComplete }) {
  const [phase, setPhase] = useState('waiting'); // waiting | blinking | decrypting | done
  const [blinkOn, setBlinkOn] = useState(true);
  const [display, setDisplay] = useState(() => text.replace(/\S/g, '\u00A0'));
  const [cursorIndex, setCursorIndex] = useState(-1);
  const [fading, setFading] = useState(false);
  const posRef = useRef(0);
  const intervalsRef = useRef([]);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref current without re-triggering the effect
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!ready) return;

    // Reduced motion: skip the scramble entirely, show final text immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplay(text);
      setPhase('done');
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    posRef.current = 0;
    setCursorIndex(-1);
    setFading(false);

    const timer = setTimeout(() => {
      // Phase: Blink
      setPhase('blinking');
      let count = 0;
      const blinkId = setInterval(() => {
        count++;
        setBlinkOn(prev => !prev);

        if (count >= blinks * 2) {
          clearInterval(blinkId);
          setBlinkOn(true);

          // Phase: Decrypt
          setPhase('decrypting');
          posRef.current = 0;
          setCursorIndex(0);

          setDisplay(
            text.split('').map(c =>
              c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            ).join('')
          );

          const scrambleId = setInterval(() => {
            const pos = posRef.current;
            setDisplay(
              text.split('').map((c, i) => {
                if (i < pos) return c;
                if (c === ' ') return ' ';
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              }).join('')
            );
          }, 30);

          const resolveId = setInterval(() => {
            posRef.current++;
            const pos = posRef.current;
            setCursorIndex(pos < text.length ? pos : text.length - 1);

            if (pos >= text.length) {
              clearInterval(resolveId);
              clearInterval(scrambleId);
              setDisplay(text);
              setFading(true);
              setPhase('done');
              if (onCompleteRef.current) onCompleteRef.current();
            }
          }, speed);

          intervalsRef.current = [scrambleId, resolveId];
        }
      }, blinkSpeed);

      intervalsRef.current = [blinkId];
    }, delay);

    return () => {
      clearTimeout(timer);
      intervalsRef.current.forEach(id => clearInterval(id));
    };
  }, [ready, text, delay, speed, blinks, blinkSpeed]);

  // Build the animated content for the current phase
  let animated;

  if (phase === 'waiting') {
    animated = <span>{display}</span>;
  } else if (phase === 'blinking') {
    const rest = text.length > 1 ? text.slice(1).replace(/\S/g, '\u00A0').replace(/ /g, ' ') : '';
    animated = (
      <>
        <span className={`zv-decrypt-cursor ${blinkOn ? '' : 'zv-decrypt-cursor-off'}`}>{'\u00A0'}</span>
        {rest}
      </>
    );
  } else {
    const before = display.slice(0, cursorIndex);
    const cursorChar = display[cursorIndex] || '';
    const after = display.slice(cursorIndex + 1);
    animated = (
      <>
        {before}
        <span className={`zv-decrypt-cursor ${fading ? 'zv-decrypt-cursor-fade' : ''}`}>{cursorChar}</span>
        {after}
      </>
    );
  }

  // Hidden text sets the box dimensions; animated text overlays it
  return (
    <span className="zv-decrypt-anchor">
      <span className="zv-decrypt-measure" aria-hidden="true">{text}</span>
      <span className="zv-decrypt-overlay">{animated}</span>
    </span>
  );
}

export default DecryptText;
