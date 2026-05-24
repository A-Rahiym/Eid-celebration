import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbReaction, DbReactionInsert } from '@/lib/types';

export class ReactionRepository {
  constructor(private readonly db: SupabaseClient) {}

  async insert(data: DbReactionInsert) {
    const { data: result, error } = await this.db
      .from('reactions')
      .insert(data)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') return null;
      throw error;
    }
    return result as DbReaction;
  }

  async remove(messageId: string, userId: string, reactionType: string) {
    const { error } = await this.db
      .from('reactions')
      .delete()
      .eq('message_id', messageId)
      .eq('user_id', userId)
      .eq('reaction_type', reactionType);

    if (error) throw error;
  }

  async findByMessageAndUser(messageId: string, userId: string) {
    const { data, error } = await this.db
      .from('reactions')
      .select('*')
      .eq('message_id', messageId)
      .eq('user_id', userId);

    if (error) throw error;
    return data as DbReaction[];
  }

  async countByMessage(messageId: string) {
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

  async countAll() {
    const { count, error } = await this.db
      .from('reactions')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count ?? 0;
  }

  async countByType() {
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
