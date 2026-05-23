'use client';

import { useCallback } from 'react';
import styles from './Home.module.scss';
import AtmosphericBackground from '@/components/atmospheric/AtmosphericBackground';
import GrainOverlay from '@/components/atmospheric/GrainOverlay';
import Navbar from '@/components/layout/Navbar/Navbar';
import HeroSection from '@/components/sections/Hero/HeroSection';
import CountriesTicker from '@/components/sections/CountriesTicker/CountriesTicker';
import ComposeSection from '@/components/sections/Compose/ComposeSection';
import FeedSection from '@/components/sections/Feed/FeedSection';
import Footer from '@/components/layout/Footer/Footer';
import { ToastProvider } from '@/components/ui/Toast/ToastProvider';
import { useLiveCount } from '@/hooks/useLiveCount';
import { useWishes } from '@/hooks/useWishes';
import { useToast } from '@/hooks/useToast';

function HomeContent() {
  const { liveCount, wishCount, countriesCount } = useLiveCount();
  const { wishes, showNewBadge, addWish, setFilter } = useWishes();
  const { show } = useToast();

  const handleShare = useCallback(() => {
    const el = document.querySelector('.compose-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleSend = useCallback(
    (text: string, location: string) => {
      addWish(text, location);
      show('🌙', 'Your wish has joined the world tonight!');

      setTimeout(() => {
        const feed = document.getElementById('feed');
        if (feed) {
          feed.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    },
    [addWish, show],
  );

  return (
    <div className={styles.app}>
      <Navbar liveCount={liveCount} />

      <HeroSection
        liveCount={liveCount}
        wishCount={wishCount}
        countriesCount={countriesCount}
        onShareClick={handleShare}
      />

      <CountriesTicker />

      <ComposeSection onSend={handleSend} />

      <FeedSection
        wishes={wishes}
        showNewBadge={showNewBadge}
        onFilterChange={setFilter}
      />

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
