'use client';

import { useCallback } from 'react';
import { useRouter } from '@/i18n/navigation';
import type { GlobalStats } from '@/lib/types';
import styles from '../Home.module.scss';
import HeroSection from '@/domains/hero/components/HeroSection/HeroSection';
import CountriesTicker from '@/domains/ui/components/CountriesTicker/CountriesTicker';
import FloatingFeed from '@/domains/messages/components/FloatingFeed/FloatingFeed';

interface HomeContentProps {
  stats: GlobalStats;
}

export default function HomeContent({ stats }: HomeContentProps) {
  const router = useRouter();

  const handleShare = useCallback(() => {
    router.push('/message');
  }, [router]);

  const handleExplore = useCallback(() => {
    router.push('/board');
  }, [router]);

  return (
    <div className={styles.app}>
      <HeroSection
        liveCount={stats.totalReactions}
        wishCount={stats.totalMessages}
        countriesCount={stats.countriesCelebrating}
        onShareClick={handleShare}
        onExploreClick={handleExplore}
      />
      <CountriesTicker />
      <FloatingFeed />
    </div>
  );
}
