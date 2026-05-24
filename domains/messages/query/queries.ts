'use client';

import { useQuery } from '@tanstack/react-query';
import type { FeedSortMode } from '@/lib/types';
import type { PaginatedResponse, FeedMessage } from '@/lib/types';

function buildUrl(sortBy: string, countryCode?: string | null, page?: number) {
  const params = new URLSearchParams({ sortBy, page: String(page || 1) });
  if (countryCode) params.set('countryCode', countryCode);
  return `/api/messages/list?${params}`;
}

interface UseMessagesQueryOptions {
  sortBy?: FeedSortMode;
  countryCode?: string | null;
  page?: number;
}

export function useMessagesQuery(options: UseMessagesQueryOptions = {}) {
  const {
    sortBy = 'newest',
    countryCode = null,
    page = 1,
  } = options;

  return useQuery<PaginatedResponse<FeedMessage>>({
    queryKey: ['messages', sortBy, countryCode, page],
    queryFn: async () => {
      const res = await fetch(
        buildUrl(sortBy === 'popular' ? 'popular' : 'created_at', countryCode, page),
      );

      if (!res.ok) {
        throw new Error('Failed to fetch messages');
      }

      const json = await res.json();
      return json.data;
    },
    placeholderData: (prev) => prev,
    staleTime: 15_000,
  });
}
