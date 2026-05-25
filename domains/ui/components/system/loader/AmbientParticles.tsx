'use client';

import styles from './InitialLoader.module.scss';

interface AmbientParticlesProps {
  reducedMotion?: boolean;
}

const PARTICLES = [
  { id: 'p1', x: '12%', y: '18%', size: 2, delay: 0.2, duration: 6.5 },
  { id: 'p2', x: '84%', y: '22%', size: 1.5, delay: 1.2, duration: 7.5 },
  { id: 'p3', x: '18%', y: '78%', size: 1.8, delay: 0.8, duration: 6.8 },
  { id: 'p4', x: '82%', y: '76%', size: 2.2, delay: 1.6, duration: 8.2 },
  { id: 'p5', x: '6%', y: '52%', size: 1.6, delay: 0.4, duration: 7.2 },
  { id: 'p6', x: '92%', y: '52%', size: 1.4, delay: 0.9, duration: 6.9 },
  { id: 'p7', x: '52%', y: '6%', size: 1.6, delay: 1.4, duration: 7.9 },
  { id: 'p8', x: '48%', y: '94%', size: 2, delay: 0.6, duration: 7.1 },
];

export default function AmbientParticles({ reducedMotion }: AmbientParticlesProps) {
  return (
    <div
      className={styles.particles}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      aria-hidden="true"
    >
      {PARTICLES.map((particle) => (
        <span
          key={particle.id}
          className={styles.particle}
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
