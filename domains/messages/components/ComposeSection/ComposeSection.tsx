'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './ComposeSection.module.scss';
import SectionHeader from '@/domains/ui/components/SectionHeader/SectionHeader';
import Container from '@/domains/ui/components/Container/Container';
import ComposeCard from './ComposeCard';
import { useMessageComposer } from '@/domains/messages/hooks/useMessageComposer';
import MandalaRosette from '@/domains/ui/components/icons/MandalaRosette';
import StarMedallion from '@/domains/ui/components/icons/StarMedallion';

interface ComposeSectionProps {
  onSend: (text: string, location: string) => void;
}

export default function ComposeSection({ onSend }: ComposeSectionProps) {
  const t = useTranslations('compose');
  const {
    text, setText,
    location, setLocation,
    gender, setGender,
    insertEmoji, handleSend, isPending, textareaRef, avatarSeed, cycleAvatar,
  } = useMessageComposer(onSend);

  return (
    <section className={styles.section} aria-labelledby="compose-heading">
      <Container maxWidth="760px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionHeader
            title={t('sectionTitle')}
            subtitle={t('sectionSubtitle')}
          />
          <div className={styles.mandala} aria-hidden="true">
            <MandalaRosette className={`${styles.mfCorner} ${styles.tl}`} />
            <MandalaRosette className={`${styles.mfCorner} ${styles.tr}`} />
            <MandalaRosette className={`${styles.mfCorner} ${styles.bl}`} />
            <MandalaRosette className={`${styles.mfCorner} ${styles.br}`} />

            <div className={`${styles.mfEdge} ${styles.top}`}>
              <div className={styles.mfEdgeInner}>
                <div className={styles.mfEdgeLine} />
                <StarMedallion className={styles.mfStar} />
                <div className={`${styles.mfEdgeLine} ${styles.mfMirror}`} />
              </div>
            </div>

            <div className={`${styles.mfEdge} ${styles.bottom}`}>
              <div className={styles.mfEdgeInner}>
                <div className={styles.mfEdgeLine} />
                <StarMedallion className={styles.mfStar} dark />
                <div className={`${styles.mfEdgeLine} ${styles.mfMirror}`} />
              </div>
            </div>

            <div className={`${styles.mfSide} ${styles.left}`}>
              <div className={styles.mfSideLine} />
            </div>
            <div className={`${styles.mfSide} ${styles.right}`}>
              <div className={styles.mfSideLine} />
            </div>

            <ComposeCard
              text={text}
              onTextChange={setText}
              location={location}
              onLocationChange={setLocation}
              gender={gender}
              onGenderChange={setGender}
              insertEmoji={insertEmoji}
              handleSend={handleSend}
              isPending={isPending}
              textareaRef={textareaRef}
              avatarSeed={avatarSeed}
              cycleAvatar={cycleAvatar}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
