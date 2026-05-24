export interface DbUser {
  id: string;
  display_name: string;
  country_code: string;
  avatar_seed: string;
  created_at: string;
}

export interface DbMessage {
  id: string;
  user_id: string;
  display_name: string;
  country_code: string;
  message_text: string;
  is_flagged: boolean;
  avatar_seed: string;
  created_at: string;
}

export type DbMessageInsert = Omit<DbMessage, 'id' | 'is_flagged' | 'created_at'>;

export interface DbReaction {
  id: string;
  message_id: string;
  user_id: string | null;
  reaction_type: string;
  created_at: string;
}

export type DbReactionInsert = Omit<DbReaction, 'id' | 'created_at'>;
