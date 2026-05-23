'use client';

import { formatCount } from '@/lib/utils';

interface LiveBadgeProps {
  liveCount: number;
}

export default function LiveBadge({ liveCount }: LiveBadgeProps) {
  return (
    <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
      <div className="live-badge" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--teal)', textTransform: 'uppercase' }}>
        <div
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--teal)',
            animation: 'pulseRing 2s ease-in-out infinite',
            boxShadow: '0 0 0 0 rgba(61,184,156,0.5)',
          }}
        />
        <span>Live</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-cormorant), serif', fontSize: '1.05rem', fontWeight: 400, color: 'var(--gold)', lineHeight: 1 }}>
          {formatCount(liveCount)}
        </span>
        <span style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-25)', marginTop: 1 }}>
          celebrating now
        </span>
      </div>
    </div>
  );
}
