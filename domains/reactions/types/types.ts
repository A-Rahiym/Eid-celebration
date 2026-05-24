export interface Reaction {
  id: string;
  message_id: string;
  user_id: string | null;
  reaction_type: string;
  created_at: string;
}

export interface ReactionCount {
  reaction_type: string;
  count: number;
}
