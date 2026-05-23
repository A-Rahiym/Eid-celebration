'use client';

import { useMemo } from 'react';
import { useCanvas } from '@/hooks/useCanvas';

interface Star {
  x: number;
  y: number;
  r: number;
  op: number;
  spd: number;
  ph: number;
}

function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random() * 0.7,
    r: Math.random() * 1.4 + 0.3,
    op: Math.random() * 0.55 + 0.1,
    spd: Math.random() * 0.002 + 0.001,
    ph: Math.random() * Math.PI * 2,
  }));
}

interface StarCanvasProps {
  starCount?: number;
}

export default function StarCanvas({ starCount = 180 }: StarCanvasProps) {
  const stars = useMemo(() => createStars(starCount), [starCount]);

  const canvasRef = useCanvas((ctx, timestamp) => {
    const canvas = ctx.canvas;
    for (const s of stars) {
      const twinkle = s.op * (0.5 + 0.5 * Math.sin(timestamp * s.spd * 0.06 + s.ph));
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
      ctx.fill();
    }
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
