import { formatCount } from '@/lib/utils';
import styles from './HeroSection.module.scss';

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
    <div className={styles.stats} aria-label="Celebration statistics">
      {stats.map((s, i) => (
        <div key={s.label} className={styles.stat}>
          <span className={styles.statNum}>{formatCount(s.num)}</span>
          <span className={styles.statLabel}>{s.label}</span>
          {i < stats.length - 1 && <span className={styles.statDivider} />}
        </div>
      ))}
    </div>
  );
}
