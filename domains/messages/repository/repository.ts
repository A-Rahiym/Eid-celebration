import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbMessage, DbMessageInsert } from '@/lib/types';

export class MessageRepository {
  constructor(private readonly db: SupabaseClient) {}

  async insert(data: DbMessageInsert) {
    const { data: result, error } = await this.db
      .from('messages')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as DbMessage;
  }

  async findById(id: string) {
    const { data, error } = await this.db
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as DbMessage;
  }

  async listPaginated(params: {
    limit: number;
    offset: number;
    sortBy: 'created_at' | 'popular' | 'trending';
    countryCode?: string;
  }) {
    let query = this.db
      .from('messages')
      .select('*', { count: 'exact' });

    if (params.countryCode) {
      query = query.eq('country_code', params.countryCode);
    }

    switch (params.sortBy) {
      case 'popular':
        query = query.order('created_at', { ascending: false });
        break;
      case 'trending':
      case 'created_at':
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data, count, error } = await query
      .range(params.offset, params.offset + params.limit - 1);

    if (error) throw error;
    return { items: data as DbMessage[], total: count ?? 0 };
  }

  async getMessageReactions(messageId: string) {
    const { data, error } = await this.db
      .from('reactions')
      .select('reaction_type')
      .eq('message_id', messageId);

    if (error) throw error;

    const counts = new Map<string, number>();
    for (const r of data) {
      counts.set(r.reaction_type, (counts.get(r.reaction_type) || 0) + 1);
    }

    return Array.from(counts.entries()).map(([reaction_type, count]) => ({
      reaction_type,
      count,
    }));
  }

  async countByCountry() {
    const { data, error } = await this.db
      .from('messages')
      .select('country_code');

    if (error) throw error;

    const counts = new Map<string, number>();
    for (const m of data) {
      counts.set(m.country_code, (counts.get(m.country_code) || 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([country_code, count]) => ({ country_code, count }))
      .sort((a, b) => b.count - a.count);
  }

  async countAll() {
    const { count, error } = await this.db
      .from('messages')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count ?? 0;
  }

  async countDistinctCountries() {
    const { data, error } = await this.db
      .from('messages')
      .select('country_code');

    if (error) throw error;
    return new Set(data.map(m => m.country_code)).size;
  }
}
