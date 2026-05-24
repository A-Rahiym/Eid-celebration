import type { SupabaseClient } from '@supabase/supabase-js';
import { MessageRepository } from '@/domains/messages/repository/repository';
import { UserRepository } from '@/domains/messages/repository/user-repository';
import { validateMessage, validateDisplayName, isSpam } from '@/domains/messages/validator/validator';
import type { FeedMessage } from '@/lib/types';

export class MessageService {
  private messageRepo: MessageRepository;
  private userRepo: UserRepository;

  constructor(db: SupabaseClient) {
    this.messageRepo = new MessageRepository(db);
    this.userRepo = new UserRepository(db);
  }

  async create(params: {
    displayName?: string;
    countryCode: string;
    messageText: string;
    userId?: string;
  }) {
    const validation = validateMessage(params.messageText, params.countryCode);
    if (!validation.valid) {
      throw new ValidationError(validation.errors.map(e => e.message).join('; '));
    }

    const nameError = validateDisplayName(params.displayName || '');
    if (nameError) {
      throw new ValidationError(nameError.message);
    }

    if (isSpam(validation.sanitized)) {
      throw new ValidationError('Message flagged as spam');
    }

    const displayName = params.displayName?.trim() || 'Anonymous';
    const userId = params.userId || crypto.randomUUID();

    await this.userRepo.upsert({
      id: userId,
      display_name: displayName,
      country_code: params.countryCode,
      avatar_seed: userId,
    }).catch(() => {});

    const message = await this.messageRepo.insert({
      user_id: userId,
      display_name: displayName,
      country_code: params.countryCode,
      message_text: validation.sanitized,
    });

    return message;
  }

  async getFeed(params: {
    page: number;
    pageSize: number;
    sortBy: 'created_at' | 'popular';
    countryCode?: string;
  }) {
    const offset = (params.page - 1) * params.pageSize;
    const { items, total } = await this.messageRepo.listPaginated({
      limit: params.pageSize,
      offset,
      sortBy: params.sortBy,
      countryCode: params.countryCode,
    });
    const messagesWithReactions: FeedMessage[] = await Promise.all(
      items.map(async (msg) => {
        const reactions = await this.messageRepo.getMessageReactions(msg.id);
        return { ...msg, reactions };
      }),
    );
    return {
      items: messagesWithReactions,
      total,
      page: params.page,
      pageSize: params.pageSize,
      hasMore: offset + params.pageSize < total,
    };
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}