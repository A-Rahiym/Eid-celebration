import type { SupabaseClient } from '@supabase/supabase-js';
import { ReactionRepository } from '@/domains/reactions/repository/repository';
import { validateAddReaction, validateRemoveReaction } from '@/domains/reactions/validator/validator';
import { ValidationError } from '../../messages/service/service';
import type { ReactionCount } from '@/lib/types';

export class ReactionService {
  private reactionRepo: ReactionRepository;

  constructor(db: SupabaseClient) {
    this.reactionRepo = new ReactionRepository(db);
  }

  async add(params: {
    messageId: string;
    reactionType: string;
    userId: string;
  }) {
    const validation = validateAddReaction(params.messageId, params.reactionType);
    if (!validation.valid) {
      throw new ValidationError(validation.errors.map(e => e.message).join('; '));
    }

    const result = await this.reactionRepo.insert({
      message_id: params.messageId,
      user_id: params.userId,
      reaction_type: params.reactionType,
    });

    if (!result) {
      throw new ValidationError('Reaction already exists');
    }

    return this.reactionRepo.countByMessage(params.messageId);
  }

  async remove(params: {
    messageId: string;
    reactionType: string;
    userId: string;
  }) {
    const validation = validateRemoveReaction(params.messageId, params.reactionType);
    if (!validation.valid) {
      throw new ValidationError(validation.errors.map(e => e.message).join('; '));
    }

    await this.reactionRepo.remove(
      params.messageId,
      params.userId,
      params.reactionType,
    );

    return this.reactionRepo.countByMessage(params.messageId);
  }

  async getMessageReactions(messageId: string): Promise<ReactionCount[]> {
    return this.reactionRepo.countByMessage(messageId);
  }
}