import { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const GRID_SPACING = 44;
const LINE_LENGTH = 18;
const LERP_SPEED = 0.06;
const STROKE_ALPHA = 0.07;
const SCANLINE_INTERVAL = 8000; // ms per sweep

function VectorField() {
  const canvasRef = useRef(null);
  const mousePosition = useMousePosition();
  const anglesRef = useRef(null);
  const driftRef = useRef({ time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let cols, rows;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / GRID_SPACING) + 1;
      rows = Math.ceil(h / GRID_SPACING) + 1;

      // Initialize angles grid
      const totalCells = cols * rows;
      if (!anglesRef.current || anglesRef.current.length !== totalCells) {
        anglesRef.current = new Float32Array(totalCells);
        for (let i = 0; i < totalCells; i++) {
          anglesRef.current[i] = Math.random() * Math.PI * 2;
        }
      }
    }

    function render(timestamp) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mouse = mousePosition.current;
      const drift = driftRef.current;
      drift.time = timestamp || 0;

      ctx.clearRect(0, 0, width, height);

      // Compute attractor position
      let attractX, attractY;
      if (mouse.hasMouseMoved) {
        attractX = mouse.x;
        attractY = mouse.y;
      } else {
        // Autonomous drift for mobile / no-mouse
        const t = drift.time * 0.0003;
        attractX = width * 0.5 + Math.sin(t) * width * 0.3;
        attractY = height * 0.5 + Math.cos(t * 0.7) * height * 0.25;
      }

      // Draw vector grid
      ctx.strokeStyle = `rgba(0, 255, 255, ${STROKE_ALPHA})`;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      const angles = anglesRef.current;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const x = col * GRID_SPACING;
          const y = row * GRID_SPACING;

          // Target angle toward attractor
          const targetAngle = Math.atan2(attractY - y, attractX - x);

          // Lerp current angle toward target
          let current = angles[idx];
          let diff = targetAngle - current;

          // Normalize angle difference to [-PI, PI]
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;

          current += diff * LERP_SPEED;
          angles[idx] = current;

          // Draw line segment
          const halfLen = LINE_LENGTH / 2;
          const cos = Math.cos(current);
          const sin = Math.sin(current);

          ctx.beginPath();
          ctx.moveTo(x - cos * halfLen, y - sin * halfLen);
          ctx.lineTo(x + cos * halfLen, y + sin * halfLen);
          ctx.stroke();
        }
      }

      // Scanline sweep
      const scanProgress = (drift.time % SCANLINE_INTERVAL) / SCANLINE_INTERVAL;
      const scanY = scanProgress * (height + 40) - 20;

      ctx.strokeStyle = `rgba(0, 255, 255, 0.03)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Subtle glow around the scanline
      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.015)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 20, width, 40);

      animationId = requestAnimationFrame(render);
    }

    resize();

    // Reduced motion: render a single static frame and skip the animation loop
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      render(0);
      window.addEventListener('resize', resize);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    animationId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

export default VectorField;
