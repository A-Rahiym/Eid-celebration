'use client';

import styles from './HeroSection.module.scss';
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
    <section className={styles.hero} aria-labelledby="hero-heading">
      <HeroOrnament />

      <div className={styles.eyebrow} aria-hidden="true">
        <span className={styles.eyebrowLine} />
        Eid Al-Fitr · 1446 AH
        <span className={`${styles.eyebrowLine} ${styles.right}`} />
      </div>

      <h1 id="hero-heading" className={styles.title}>
        Celebrate Eid
        <em className={styles.titleGold}>With the World</em>
      </h1>

      <p className={styles.arabic} lang="ar" aria-label="Eid Mubarak in Arabic">
        عيد مبارك
      </p>

      <p className={styles.subtitle}>
        Why celebrate alone when millions across the globe share this blessed moment with you?
        One night, one moon, one celebration — together.
      </p>

      <div className={styles.cta}>
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
