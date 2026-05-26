export interface Message {
  id: string;
  user_id: string;
  display_name: string;
  country_code: string;
  message_text: string;
  is_flagged: boolean;
  avatar_seed: string;
  created_at: string;
}

export interface FeedMessage extends Message {
  reactions: ReactionAggregate[];
  user_reactions?: string[];
}

export interface ReactionAggregate {
  reaction_type: string;
  count: number;
}
