import { create } from 'zustand';
import type { FeedSortMode } from '@/lib/types';

interface FeedFilterState {
  sortMode: FeedSortMode;
  countryCode: string | null;
  page: number;
  setSortMode: (mode: FeedSortMode) => void;
  setCountryCode: (code: string | null) => void;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useFeedFilterStore = create<FeedFilterState>((set) => ({
  sortMode: 'newest',
  countryCode: null,
  page: 1,
  setSortMode: (sortMode) => set({ sortMode, page: 1 }),
  setCountryCode: (countryCode) => set({ countryCode, page: 1 }),
  setPage: (page) => set({ page }),
  nextPage: () => set((s) => ({ page: s.page + 1 })),
  prevPage: () => set((s) => ({ page: Math.max(1, s.page - 1) })),
}));
