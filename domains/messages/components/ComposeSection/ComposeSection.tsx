'use client';

import { motion } from 'framer-motion';
import styles from './ComposeSection.module.scss';
import SectionHeader from '@/domains/ui/components/SectionHeader/SectionHeader';
import Container from '@/domains/ui/components/Container/Container';
import ComposeCard from './ComposeCard';

interface ComposeSectionProps {
  onSend: (text: string, location: string) => void;
}

export default function ComposeSection({ onSend }: ComposeSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="compose-heading">
      <Container maxWidth="700px">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionHeader
            title="Share Your Eid Blessing"
            subtitle="Your wish joins millions around the world tonight"
          />
          <ComposeCard onSend={onSend} />
        </motion.div>
      </Container>
    </section>
  );
}
