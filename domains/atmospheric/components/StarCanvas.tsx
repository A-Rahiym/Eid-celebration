'use client';

import { useRef } from 'react';
import { useCanvas } from '@/hooks/useCanvas';
import styles from './AtmosphericBackground.module.scss';

interface Star {
  x: number;
  y: number;
  r: number;
  op: number;
  spd: number;
  ph: number;
  vx: number;
  vy: number;
}

function createStars(count: number): Star[] {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.7,
    r: Math.random() * 1.4 + 0.3,
    op: Math.random() * 0.55 + 0.1,
    spd: Math.random() * 0.004 + 0.002,
    ph: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.08,
  }));
}

interface StarCanvasProps {
  starCount?: number;
}

export default function StarCanvas({ starCount = 180 }: StarCanvasProps) {
  const starsRef = useRef<Star[]>(createStars(starCount));

  const canvasRef = useCanvas((ctx, timestamp) => {
    const canvas = ctx.canvas;
    const stars = starsRef.current;

    for (const s of stars) {
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < -10) s.x = canvas.width + 10;
      if (s.x > canvas.width + 10) s.x = -10;
      if (s.y < -10) s.y = canvas.height * 0.7 + 10;
      if (s.y > canvas.height * 0.7 + 10) s.y = -10;

      const twinkle = s.op * (0.5 + 0.5 * Math.sin(timestamp * s.spd * 0.06 + s.ph));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
      ctx.fill();
    }
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
