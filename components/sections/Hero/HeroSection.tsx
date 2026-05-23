'use client';

import HeroOrnament from './HeroOrnament';
import HeroStats from './HeroStats';
import ScrollHint from './ScrollHint';
import Button from '@/components/ui/Button/Button';

interface HeroSectionProps {
  liveCount: number;
  wishCount: number;
  countriesCount: number;
  onShareClick: () => void;
}

export default function HeroSection({
  liveCount,
  wishCount,
  countriesCount,
  onShareClick,
}: HeroSectionProps) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(var(--nav-h) + 2rem) 2rem 5rem',
        position: 'relative',
      }}
      aria-labelledby="hero-heading"
    >
      <HeroOrnament />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center',
          fontSize: '0.68rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--teal)',
          marginBottom: '1.8rem',
          animation: 'fadeUp 1.4s ease both',
        }}
        aria-hidden="true"
      >
        <span
          style={{ width: 38, height: 1, background: 'linear-gradient(90deg, transparent, var(--teal))', opacity: 0.6 }}
        />
        Eid Al-Fitr · 1446 AH
        <span
          style={{ width: 38, height: 1, background: 'linear-gradient(90deg, transparent, var(--teal))', opacity: 0.6, transform: 'scaleX(-1)' }}
        />
      </div>

      <h1
        id="hero-heading"
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 300,
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          color: 'var(--ivory)',
          marginBottom: '0.5rem',
          animation: 'fadeUp 1.4s 0.15s ease both',
        }}
      >
        Celebrate Eid
        <em
          style={{
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--gold-pale)',
            display: 'block',
          }}
        >
          With the World
        </em>
      </h1>

      <p
        lang="ar"
        style={{
          fontFamily: 'var(--font-noto-arabic), serif',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          color: 'var(--gold)',
          opacity: 0.7,
          letterSpacing: '0.05em',
          marginBottom: '1.8rem',
          animation: 'fadeUp 1.4s 0.25s ease both',
        }}
        aria-label="Eid Mubarak in Arabic"
      >
        عيد مبارك
      </p>

      <p
        style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
          color: 'var(--ivory-50)',
          fontWeight: 300,
          maxWidth: 520,
          lineHeight: 1.75,
          margin: '0 auto 2.8rem',
          animation: 'fadeUp 1.4s 0.35s ease both',
        }}
      >
        Why celebrate alone when millions across the globe share this blessed moment with you?
        One night, one moon, one celebration — together.
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeUp 1.4s 0.48s ease both',
          marginBottom: '4rem',
        }}
      >
        <Button variant="primary" onClick={onShareClick} aria-label="Share your Eid wish">
          Share Your Wish ✨
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Explore the celebration wall"
        >
          Explore the Wall
        </Button>
      </div>

      <HeroStats
        liveCount={liveCount}
        wishCount={wishCount}
        countriesCount={countriesCount}
      />

      <ScrollHint />
    </section>
  );
}
