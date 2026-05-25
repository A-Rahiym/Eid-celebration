import { useTranslations, useFormatter } from 'next-intl';
import styles from './HeroSection.module.scss';

interface HeroStatsProps {
  liveCount: number;
  wishCount: number;
  countriesCount: number;
}

export default function HeroStats({ liveCount, wishCount, countriesCount }: HeroStatsProps) {
  const t = useTranslations('heroStats');
  const formatter = useFormatter();

  const stats = [
    { num: liveCount, label: t('celebratingNow') },
    { num: countriesCount, label: t('countries') },
    { num: wishCount, label: t('wishesShared') },
  ];

  return (
    <div className={styles.stats} aria-label={t('aria')}>
      {stats.map((s, i) => (
        <div key={s.label} className={styles.stat}>
          <span className={styles.statNum}>{formatter.number(s.num)}</span>
          <span className={styles.statLabel}>{s.label}</span>
          {i < stats.length - 1 && <span className={styles.statDivider} />}
        </div>
      ))}
    </div>
  );
}