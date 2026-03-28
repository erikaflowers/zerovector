import { useState, useEffect, useRef } from 'react';

/**
 * ZeroVectorAnimation — CSS + SVG animated explainer for the Zero Vector name.
 * Five stages: joke → physics → aerospace → quantum → meaning.
 * Uses intersection observer to trigger, CSS keyframes for motion.
 *
 * @param {boolean} compact — Teaser mode (shows only the physics stage)
 * @param {Array} stages — Content for each animation stage
 */
function ZeroVectorAnimation({ compact = false, stages = [] }) {
  const [activeStage, setActiveStage] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Intersection observer to trigger animation on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  // Progress through stages automatically once visible
  useEffect(() => {
    if (!isVisible) return;
    const stageCount = compact ? 1 : stages.length;
    let current = 0;

    // Start first stage after a short delay
    const initialTimer = setTimeout(() => {
      setActiveStage(0);
    }, 400);

    const interval = setInterval(() => {
      current += 1;
      if (current >= stageCount) {
        clearInterval(interval);
        return;
      }
      setActiveStage(current);
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isVisible, compact, stages.length]);

  const displayStages = compact ? stages.slice(1, 2) : stages; // compact shows only physics

  return (
    <div
      ref={containerRef}
      className={`zv-name-anim ${compact ? 'zv-name-anim--compact' : ''} ${isVisible ? 'zv-name-anim--visible' : ''}`}
    >
      {/* SVG coordinate system */}
      <div className="zv-name-anim-svg-wrap">
        <svg
          className="zv-name-anim-svg"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Coordinate axes */}
          <line
            className={`zv-name-axis ${isVisible ? 'zv-name-axis--drawn' : ''}`}
            x1="200" y1="280" x2="200" y2="20"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
          />
          <line
            className={`zv-name-axis ${isVisible ? 'zv-name-axis--drawn' : ''}`}
            x1="20" y1="150" x2="380" y2="150"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"
          />

          {/* Origin dot */}
          <circle
            className={`zv-name-origin ${isVisible ? 'zv-name-origin--pulse' : ''}`}
            cx="200" cy="150" r="4"
            fill="#00ff88"
          />

          {/* Vector arrows radiating from origin — drawn then collapsed */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const len = 80;
            const x2 = 200 + Math.cos(rad) * len;
            const y2 = 150 - Math.sin(rad) * len;
            const stageIndex = compact ? 0 : 1; // physics stage
            const isPhysicsActive = activeStage >= stageIndex;
            const isMeaningActive = !compact && activeStage >= 4;
            return (
              <line
                key={angle}
                className={`zv-name-vector ${isPhysicsActive ? 'zv-name-vector--drawn' : ''} ${isMeaningActive ? 'zv-name-vector--collapsed' : ''}`}
                x1="200" y1="150" x2={x2} y2={y2}
                stroke="#00ff88"
                strokeWidth="1.5"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            );
          })}

          {/* Arrowheads */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const len = 80;
            const tipX = 200 + Math.cos(rad) * len;
            const tipY = 150 - Math.sin(rad) * len;
            const stageIndex = compact ? 0 : 1;
            const isPhysicsActive = activeStage >= stageIndex;
            const isMeaningActive = !compact && activeStage >= 4;
            return (
              <circle
                key={`tip-${angle}`}
                className={`zv-name-arrowhead ${isPhysicsActive ? 'zv-name-arrowhead--visible' : ''} ${isMeaningActive ? 'zv-name-arrowhead--collapsed' : ''}`}
                cx={tipX} cy={tipY} r="3"
                fill="#00ff88"
                style={{ animationDelay: `${i * 0.12 + 0.6}s` }}
              />
            );
          })}

          {/* Aerospace: spacecraft + target alignment */}
          {!compact && (
            <>
              <rect
                className={`zv-name-craft ${activeStage >= 2 ? 'zv-name-craft--align' : ''}`}
                x="100" y="140" width="16" height="20" rx="2"
                fill="none" stroke="#00ff88" strokeWidth="1.5"
              />
              <rect
                className={`zv-name-target ${activeStage >= 2 ? 'zv-name-target--align' : ''}`}
                x="280" y="140" width="16" height="20" rx="2"
                fill="none" stroke="#c9a84c" strokeWidth="1.5"
              />
              {/* Dashed alignment line */}
              <line
                className={`zv-name-align-line ${activeStage >= 2 ? 'zv-name-align-line--drawn' : ''}`}
                x1="120" y1="150" x2="280" y2="150"
                stroke="rgba(201,168,76,0.3)" strokeWidth="1"
                strokeDasharray="4 4"
              />
            </>
          )}

          {/* Notation: |v| = 0 */}
          <text
            className={`zv-name-notation ${activeStage >= (compact ? 0 : 1) ? 'zv-name-notation--visible' : ''}`}
            x="200" y="290"
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            |v| = 0
          </text>
        </svg>
      </div>

      {/* Stage labels */}
      <div className="zv-name-anim-stages">
        {displayStages.map((stage, i) => {
          const realIndex = compact ? 0 : i;
          return (
            <div
              key={stage.id}
              className={`zv-name-stage ${activeStage === realIndex ? 'zv-name-stage--active' : ''}`}
            >
              <div className="zv-name-stage-label">{stage.label}</div>
              <p className="zv-name-stage-text">{stage.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ZeroVectorAnimation;
