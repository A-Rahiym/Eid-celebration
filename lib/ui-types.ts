export type FeedSortMode = 'newest' | 'popular' | 'trending';

export type ThemeMode = 'dark' | 'light';

export interface FeedFilterState {
  sortMode: FeedSortMode;
  countryCode: string | null;
  page: number;
}
