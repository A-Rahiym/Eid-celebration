'use client';

import { useTranslations } from 'next-intl';
import styles from './HeroSection.module.scss';
import Moon from '@/domains/atmospheric/components/Moon';
import Clouds from '@/domains/atmospheric/components/Clouds';
import HeroOrnament from './HeroOrnament';
import HeroStats from './HeroStats';
import Button from '@/domains/ui/components/Button/Button';

interface HeroSectionProps {
  liveCount: number;
  wishCount: number;
  countriesCount: number;
  onShareClick: () => void;
  onExploreClick?: () => void;
}

export default function HeroSection({
  liveCount,
  wishCount,
  countriesCount,
  onShareClick,
  onExploreClick,
}: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroAtmos}>
        <Moon />
        <Clouds />
      </div>
      <HeroOrnament />

      <div className={styles.eyebrow} aria-hidden="true">
        <span className={styles.eyebrowLine} />
        {t('eyebrow')}
        <span className={`${styles.eyebrowLine} ${styles.right}`} />
      </div>

      <h1 id="hero-heading" className={styles.title}>
        {t('title')}
        <em className={styles.titleGold}>{t('titleAccent')}</em>
      </h1>

      <p className={styles.arabic} lang="ar" aria-label={t('arabicAria')}>
        {t('arabicGreeting')}
      </p>

      <p className={styles.subtitle}>
        {t('subtitle')}
      </p>

      <div className={styles.cta}>
        <Button variant="primary" onClick={onShareClick} aria-label={t('shareAria')}>
          {t('shareCta')}
        </Button>
        <Button
          variant="ghost"
          onClick={onExploreClick}
          aria-label={t('exploreAria')}
        >
          {t('exploreCta')}
        </Button>
      </div>

      <HeroStats
        liveCount={liveCount}
        wishCount={wishCount}
        countriesCount={countriesCount}
      />
    </section>
  );
}
