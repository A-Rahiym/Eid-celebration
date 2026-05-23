'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Wish, WishFilter } from '@/lib/types';
import { MESSAGES, INCOMING_MESSAGES } from '@/lib/constants';

interface UseWishesReturn {
  wishes: Wish[];
  isLoading: boolean;
  error: string | null;
  showNewBadge: boolean;
  addWish: (text: string, location: string) => void;
  setFilter: (filter: WishFilter) => void;
}

export function useWishes(): UseWishesReturn {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<WishFilter>('all');
  const [showNewBadge, setShowNewBadge] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/wishes?filter=${filter}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setWishes(data.wishes || MESSAGES);
      } catch {
        setWishes(MESSAGES);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [filter]);

  // Simulate incoming messages
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setWishes(prev => {
          const msg = INCOMING_MESSAGES[prev.length % INCOMING_MESSAGES.length];
          const newMsg = { ...msg, id: Date.now() };
          setShowNewBadge(true);
          return [newMsg, ...prev];
        });
      }, 14000);

      return () => clearInterval(interval);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const addWish = useCallback(async (text: string, location: string) => {
    const optimisticWish: Wish = {
      id: Date.now(),
      name: 'You',
      loc: location,
      text,
      time: 'just now',
      reactions: { '🌙': 0, '✨': 0, '❤️': 0 },
      color: '#0e2040',
      accent: '#c9a96e',
    };

    setWishes(prev => [optimisticWish, ...prev]);

    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, location }),
      });
    } catch {
      setWishes(prev => prev.filter(w => w.id !== optimisticWish.id));
    }
  }, []);

  return { wishes, isLoading, error, showNewBadge, addWish, setFilter };
}
