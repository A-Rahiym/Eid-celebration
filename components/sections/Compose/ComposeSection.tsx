'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/layout/Container';
import ComposeCard from './ComposeCard';

interface ComposeSectionProps {
  onSend: (text: string, location: string) => void;
}

export default function ComposeSection({ onSend }: ComposeSectionProps) {
  return (
    <section style={{ padding: '0 0 4rem' }} aria-labelledby="compose-heading">
      <Container maxWidth="700px">
        <SectionHeader
          title="Share Your Eid Blessing"
          subtitle="Your wish joins millions around the world tonight"
        />
        <ComposeCard onSend={onSend} />
      </Container>
    </section>
  );
}
