import type { SupabaseClient } from '@supabase/supabase-js';
import { StatsRepository } from '@/domains/stats/repository/repository';
import type { GlobalStats } from '@/lib/types';

export class StatsService {
  private statsRepo: StatsRepository;

  constructor(db: SupabaseClient) {
    this.statsRepo = new StatsRepository(db);
  }

  async getGlobalStats(): Promise<GlobalStats> {
    return this.statsRepo.getGlobalStats();
  }
}
