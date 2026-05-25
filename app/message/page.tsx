'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useCelebrationStore } from '@/domains/ui/store/celebration-store';
import ComposeSection from '@/domains/messages/components/ComposeSection/ComposeSection';
import styles from '../Home.module.scss';

export default function MessagePage() {
  const { show } = useToast();
  const dismissedBadge = useCelebrationStore((s) => s.dismissedBadge);
  const router = useRouter();

  const handleSend = (_text: string, _location: string) => {
    show('🌙', 'Your wish has joined the world tonight!');

    setTimeout(() => {
      router.push('/board');
    }, 1500);

    dismissedBadge();
  };

  return (
    <div className={styles.app} style={{ paddingTop: '80px' }}>
      <ComposeSection onSend={handleSend} />
    </div>
  );
}
