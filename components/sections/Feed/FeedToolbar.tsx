import type { WishFilter } from '@/lib/types';

interface FeedToolbarProps {
  currentFilter: WishFilter;
  onFilterChange: (filter: WishFilter) => void;
  showNewBadge: boolean;
}

const FILTERS: { key: WishFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'recent', label: 'Recent' },
  { key: 'popular', label: 'Popular' },
];

export default function FeedToolbar({
  currentFilter,
  onFilterChange,
  showNewBadge,
}: FeedToolbarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.8rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <h2
          id="feed-heading"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.4rem',
            fontWeight: 300,
            color: 'var(--ivory-75)',
          }}
        >
          Wishes from the World
        </h2>
        {showNewBadge && (
          <span
            aria-live="polite"
            style={{
              background: 'var(--teal-dim)',
              border: '1px solid rgba(61,184,156,0.2)',
              borderRadius: 20,
              padding: '0.1rem 0.6rem',
              fontSize: '0.62rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
            }}
          >
            New
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.4rem' }} role="group" aria-label="Filter wishes">
        {FILTERS.map(f => (
          <button
            key={f.key}
            type="button"
            onClick={() => onFilterChange(f.key)}
            aria-pressed={currentFilter === f.key}
            style={{
              background: currentFilter === f.key ? 'var(--gold-glow-sm)' : 'var(--glass)',
              border: `1px solid ${currentFilter === f.key ? 'rgba(201,169,110,0.2)' : 'var(--glass-border)'}`,
              borderRadius: 20,
              padding: '0.28rem 0.9rem',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '0.7rem',
              color: currentFilter === f.key ? 'var(--gold-pale)' : 'var(--ivory-50)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.04em',
              minHeight: 36,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
