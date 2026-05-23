'use client';

import { useEffect, useRef } from 'react';
import { useCanvas } from '@/hooks/useCanvas';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  op: number;
  maxOp: number;
  life: number;
  maxLife: number;
  gold: boolean;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
    y: (typeof window !== 'undefined' ? window.innerHeight : 800) * (0.3 + Math.random() * 0.7),
    vx: (Math.random() - 0.5) * 0.25,
    vy: -(Math.random() * 0.4 + 0.1),
    r: Math.random() * 1.5 + 0.3,
    op: 0,
    maxOp: Math.random() * 0.22 + 0.04,
    life: 0,
    maxLife: Math.random() * 400 + 200,
    gold: Math.random() > 0.4,
  }));
}

function resetParticle(p: Particle) {
  p.x = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000);
  p.y = (typeof window !== 'undefined' ? window.innerHeight : 800) * (0.4 + Math.random() * 0.6);
  p.vx = (Math.random() - 0.5) * 0.25;
  p.vy = -(Math.random() * 0.4 + 0.1);
  p.life = Math.random() * p.maxLife;
  p.maxOp = Math.random() * 0.22 + 0.04;
}

interface ParticleCanvasProps {
  particleCount?: number;
}

export default function ParticleCanvas({ particleCount = 60 }: ParticleCanvasProps) {
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    particlesRef.current = createParticles(particleCount);
  }, [particleCount]);

  useCanvas((ctx) => {
    const particles = particlesRef.current;

    for (const p of particles) {
      // eslint-disable-next-line react-hooks/immutability
      p.life++;
      const progress = p.life / p.maxLife;
      if (progress < 0.2) p.op = p.maxOp * (progress / 0.2);
      else if (progress > 0.8) p.op = p.maxOp * ((1 - progress) / 0.2);
      else p.op = p.maxOp;

      p.x += p.vx;
      p.y += p.vy;

      if (p.life >= p.maxLife) resetParticle(p);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(201,169,110,${p.op})`
        : `rgba(61,184,156,${p.op * 0.5})`;
      ctx.fill();
    }
  }, [particleCount]);

  return (
    <canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
