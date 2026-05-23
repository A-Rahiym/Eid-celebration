'use client';

import { useState } from 'react';
import type { Wish, WishFilter } from '@/lib/types';
import Container from '@/components/layout/Container';
import FeedToolbar from './FeedToolbar';
import FeedGrid from './FeedGrid';
import MessageCard from './MessageCard';

interface FeedSectionProps {
  wishes: Wish[];
  showNewBadge: boolean;
  onFilterChange: (filter: WishFilter) => void;
}

export default function FeedSection({ wishes, showNewBadge, onFilterChange }: FeedSectionProps) {
  const [filter, setFilter] = useState<WishFilter>('all');

  function handleFilterChange(f: WishFilter) {
    setFilter(f);
    onFilterChange(f);
  }

  const filtered = filter === 'popular'
    ? [...wishes].sort((a, b) => {
        const sumA = Object.values(a.reactions).reduce((s, v) => s + v, 0);
        const sumB = Object.values(b.reactions).reduce((s, v) => s + v, 0);
        return sumB - sumA;
      })
    : filter === 'recent'
    ? [...wishes].reverse()
    : wishes;

  return (
    <section style={{ padding: '0 0 6rem' }} id="feed" aria-labelledby="feed-heading">
      <Container>
        <FeedToolbar
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          showNewBadge={showNewBadge}
        />
        <FeedGrid>
          {filtered.map((wish, i) => (
            <MessageCard
              key={wish.id}
              wish={wish}
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}
        </FeedGrid>
      </Container>
    </section>
  );
}
