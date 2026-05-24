import type { SupabaseClient } from '@supabase/supabase-js';
import type { CountryStat, ReactionStat } from '@/lib/types';

export class StatsRepository {
  constructor(private readonly db: SupabaseClient) {}

  async getGlobalStats() {
    const [messageCount, reactionCount, countryCount, byCountry, byReaction] =
      await Promise.all([
        this.countMessages(),
        this.countReactions(),
        this.countDistinctCountries(),
        this.countriesByMessages(),
        this.reactionsByType(),
      ]);

    return {
      totalMessages: messageCount,
      totalReactions: reactionCount,
      countriesCelebrating: countryCount,
      topCountries: byCountry,
      topReactions: byReaction,
      lastUpdated: new Date().toISOString(),
    };
  }

  private async countMessages() {
    const { count, error } = await this.db
      .from('messages')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count ?? 0;
  }

  private async countReactions() {
    const { count, error } = await this.db
      .from('reactions')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count ?? 0;
  }

  private async countDistinctCountries() {
    const { data, error } = await this.db
      .from('messages')
      .select('country_code');

    if (error) throw error;
    return new Set(data.map(m => m.country_code)).size;
  }

  private async countriesByMessages(): Promise<CountryStat[]> {
    const { data, error } = await this.db
      .from('messages')
      .select('country_code');

    if (error) throw error;

    const counts = new Map<string, number>();
    for (const m of data) {
      counts.set(m.country_code, (counts.get(m.country_code) || 0) + 1);
    }

    const flagCache: Record<string, string> = {};

    return Array.from(counts.entries())
      .map(([country_code, count]) => ({
        country_code,
        count,
        flag: flagCache[country_code] ?? '',
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private async reactionsByType(): Promise<ReactionStat[]> {
    const { data, error } = await this.db
      .from('reactions')
      .select('reaction_type');

    if (error) throw error;

    const counts = new Map<string, number>();
    for (const r of data) {
      counts.set(r.reaction_type, (counts.get(r.reaction_type) || 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([reaction_type, count]) => ({ reaction_type, count }))
      .sort((a, b) => b.count - a.count);
  }
}
