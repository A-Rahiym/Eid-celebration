import { formatCount } from '@/lib/utils';

interface HeroStatsProps {
  liveCount: number;
  wishCount: number;
  countriesCount: number;
}

export default function HeroStats({ liveCount, wishCount, countriesCount }: HeroStatsProps) {
  const stats = [
    { num: liveCount, label: 'Celebrating now' },
    { num: countriesCount, label: 'Countries' },
    { num: wishCount, label: 'Wishes shared' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3rem',
        justifyContent: 'center',
        animation: 'fadeUp 1.4s 0.58s ease both',
      }}
      aria-label="Celebration statistics"
    >
      {stats.map((s, i) => (
        <div key={s.label} style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '2rem',
              fontWeight: 400,
              color: 'var(--gold)',
              lineHeight: 1,
              display: 'block',
            }}
          >
            {formatCount(s.num)}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ivory-25)',
              marginTop: '0.3rem',
              display: 'block',
            }}
          >
            {s.label}
          </span>
          {i < stats.length - 1 && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 1,
                height: 36,
                background: 'var(--glass-border)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
