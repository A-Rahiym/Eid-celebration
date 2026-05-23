import type { Country } from '@/lib/types';

interface FlagPillProps {
  country: Country;
}

export default function FlagPill({ country }: FlagPillProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: 30,
        padding: '0.28rem 0.75rem',
        fontSize: '0.72rem',
        color: 'var(--ivory-50)',
        whiteSpace: 'nowrap',
        transition: 'all 0.25s',
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      <span>{country.flag}</span>
      <span>{country.name}</span>
    </div>
  );
}
