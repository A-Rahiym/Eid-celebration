'use client';

import { useRouter } from 'next/navigation';
import styles from './Home.module.scss';
import HeroSection from '@/domains/hero/components/HeroSection/HeroSection';
import CountriesTicker from '@/domains/ui/components/CountriesTicker/CountriesTicker';
import { useStatsQuery } from '@/domains/stats/query/queries';

function HomeContent() {
  const { data: stats } = useStatsQuery();
  const router = useRouter();

  const handleShare = () => {
    router.push('/message');
  };

  const handleExplore = () => {
    router.push('/board');
  };

  return (
    <div className={styles.app}>
      <HeroSection
        liveCount={stats?.totalReactions ?? 0}
        wishCount={stats?.totalMessages ?? 0}
        countriesCount={stats?.countriesCelebrating ?? 0}
        onShareClick={handleShare}
        onExploreClick={handleExplore}
      />
      <CountriesTicker />
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
