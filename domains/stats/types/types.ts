export interface CountryStat {
  country_code: string;
  count: number;
  flag: string;
}

export interface ReactionStat {
  reaction_type: string;
  count: number;
}

export interface GlobalStats {
  totalMessages: number;
  totalReactions: number;
  countriesCelebrating: number;
  topCountries: CountryStat[];
  topReactions: ReactionStat[];
  lastUpdated: string;
}
