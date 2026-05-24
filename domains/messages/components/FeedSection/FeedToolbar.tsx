import type { FeedSortMode } from '@/lib/types';
import styles from './FeedSection.module.scss';

interface FeedToolbarProps {
  currentFilter: FeedSortMode;
  onFilterChange: (filter: FeedSortMode) => void;
  showNewBadge: boolean;
}

const FILTERS: { key: FeedSortMode; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'popular', label: 'Popular' },
  { key: 'trending', label: 'Trending' },
];

export default function FeedToolbar({
  currentFilter,
  onFilterChange,
  showNewBadge,
}: FeedToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.titleRow}>
        <h2 id="feed-heading" className={styles.heading}>
          Wishes from the World
        </h2>
        {showNewBadge && (
          <span className={styles.newBadge} aria-live="polite">
            New
          </span>
        )}
      </div>

      <div className={styles.filters} role="group" aria-label="Filter wishes">
        {FILTERS.map(f => (
          <button
            key={f.key}
            type="button"
            onClick={() => onFilterChange(f.key)}
            aria-pressed={currentFilter === f.key}
            className={`${styles.filterBtn} ${currentFilter === f.key ? styles.active : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
