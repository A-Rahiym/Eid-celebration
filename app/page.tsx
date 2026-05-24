'use client';

import { useCallback } from 'react';
import styles from './Home.module.scss';
import AtmosphericBackground from '@/domains/atmospheric/components/AtmosphericBackground';
import GrainOverlay from '@/domains/atmospheric/components/GrainOverlay';
import Navbar from '@/domains/ui/components/Navbar/Navbar';
import HeroSection from '@/domains/hero/components/HeroSection/HeroSection';
import CountriesTicker from '@/domains/ui/components/CountriesTicker/CountriesTicker';
import ComposeSection from '@/domains/messages/components/ComposeSection/ComposeSection';
import FeedSection from '@/domains/messages/components/FeedSection/FeedSection';
import Footer from '@/domains/ui/components/Footer/Footer';
import { ToastProvider } from '@/domains/ui/components/Toast/ToastProvider';
import { useToast } from '@/hooks/useToast';
import { useStatsQuery } from '@/domains/stats/query/queries';
import { useCelebrationStore } from '@/domains/ui/store/celebration-store';

function HomeContent() {
  const { data: stats } = useStatsQuery();
  const showNewBadge = useCelebrationStore((s) => s.showNewBadge);
  const { show } = useToast();
  const dismissedBadge = useCelebrationStore((s) => s.dismissedBadge);

  const handleShare = useCallback(() => {
    const el = document.querySelector('.compose-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleSend = useCallback(
    (_text: string, _location: string) => {
      show('🌙', 'Your wish has joined the world tonight!');

      setTimeout(() => {
        const feed = document.getElementById('feed');
        if (feed) {
          feed.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);

      dismissedBadge();
    },
    [show, dismissedBadge],
  );

  return (
    <div className={styles.app}>
      <Navbar liveCount={stats?.totalMessages ?? 0} />
      <HeroSection
        liveCount={stats?.totalReactions ?? 0}
        wishCount={stats?.totalMessages ?? 0}
        countriesCount={stats?.countriesCelebrating ?? 0}
        onShareClick={handleShare}
      />
      <CountriesTicker />
      <ComposeSection onSend={handleSend} />
      <FeedSection showNewBadge={showNewBadge} />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <AtmosphericBackground />
      <GrainOverlay />
      <HomeContent />
    </ToastProvider>
  );
}
