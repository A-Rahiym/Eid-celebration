export interface Country {
  flag: string;
  name: string;
}

export interface Wish {
  id: number;
  name: string;
  loc: string;
  text: string;
  arabic?: string;
  time: string;
  reactions: Record<string, number>;
  color: string;
  accent: string;
}

export type WishFilter = 'all' | 'recent' | 'popular';

export interface CreateWishPayload {
  text: string;
  location: string;
}

export interface WishesResponse {
  wishes: Wish[];
  total: number;
}

export interface StatsResponse {
  liveCount: number;
  wishCount: number;
  countriesCount: number;
}
