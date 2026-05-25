'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useToast } from '@/hooks/useToast';
import { useCelebrationStore } from '@/domains/ui/store/celebration-store';
import ComposeSection from '@/domains/messages/components/ComposeSection/ComposeSection';
import styles from '../Home.module.scss';

export default function MessagePage() {
  const t = useTranslations('toast');
  const { show } = useToast();
  const dismissedBadge = useCelebrationStore((s) => s.dismissedBadge);
  const router = useRouter();

  const handleSend = (_text: string, _location: string) => {
    show('🌙', t('sendSuccess'));

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
