'use client';

import { COUNTRIES } from '@/lib/constants';
import FlagPill from './FlagPill';

export default function CountriesTicker() {
  const doubled = [...COUNTRIES, ...COUNTRIES];

  return (
    <section
      style={{
        padding: '2rem 0 4rem',
        position: 'relative',
      }}
      aria-label="Countries celebrating Eid"
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--glass-border), transparent)',
        }}
      />
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(201,169,110,0.45)',
          marginBottom: '1.4rem',
        }}
      >
        Celebrating across the world · {COUNTRIES.length} countries
      </p>
      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            animation: 'tickerScroll 35s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((country, i) => (
            <FlagPill key={`${country.flag}-${i}`} country={country} />
          ))}
        </div>
      </div>
    </section>
  );
}
