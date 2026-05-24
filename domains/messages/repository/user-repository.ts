import type { SupabaseClient } from '@supabase/supabase-js';
import type { DbUser } from '@/lib/types';

export class UserRepository {
  constructor(private readonly db: SupabaseClient) {}

  async upsert(data: { id?: string; display_name: string; country_code: string; avatar_seed: string }) {
    const { data: result, error } = await this.db
      .from('users')
      .upsert(
        {
          id: data.id,
          display_name: data.display_name,
          country_code: data.country_code,
          avatar_seed: data.avatar_seed,
        },
        { onConflict: 'id', ignoreDuplicates: false },
      )
      .select()
      .single();

    if (error) throw error;
    return result as DbUser;
  }

  async findById(id: string) {
    const { data, error } = await this.db
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as DbUser;
  }

  async findByDisplayName(name: string) {
    const { data, error } = await this.db
      .from('users')
      .select('*')
      .eq('display_name', name)
      .maybeSingle();

    if (error) return null;
    return data as DbUser | null;
  }
}
