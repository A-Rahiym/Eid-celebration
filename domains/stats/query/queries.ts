'use client';

import { useQuery } from '@tanstack/react-query';
import type { GlobalStats } from '@/lib/types';

interface StatsResponse {
  totalMessages: number;
  totalReactions: number;
  countriesCelebrating: number;
}

export function useStatsQuery() {
  return useQuery<StatsResponse>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');

      if (!res.ok) {
        throw new Error('Failed to fetch stats');
      }

      const json = await res.json();
      const stats = json.data as GlobalStats;

      return {
        totalMessages: stats.totalMessages,
        totalReactions: stats.totalReactions,
        countriesCelebrating: stats.countriesCelebrating,
      };
    },
    refetchInterval: 10_000,
    staleTime: 5_000,
  });
}
