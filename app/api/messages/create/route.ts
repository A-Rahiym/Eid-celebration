import { NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { MessageService, ValidationError } from '@/domains/messages/service/service';
import { ModerationService } from '@/domains/messages/service/moderation';
import { success, error, parseBody } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await parseBody<{
      displayName?: string;
      countryCode: string;
      messageText: string;
      userId?: string;
      avatarSeed?: string;
    }>(request);

    const db = await createAdminClient();
    const messageService = new MessageService(db);
    const moderationService = new ModerationService();

    const moderationResult = moderationService.moderate(body.messageText);
    if (moderationResult.flagged) {
      return error('Message flagged by moderation', 'MODERATION_FLAG', 422);
    }

    const sanitizedText = moderationService.sanitize(moderationResult.sanitized);

    const message = await messageService.create({
      displayName: body.displayName,
      countryCode: body.countryCode,
      messageText: sanitizedText,
      userId: body.userId,
      avatarSeed: body.avatarSeed,
    });
    return success(message, 201);
  } catch (e) {
    if (e instanceof ValidationError) {
      return error(e.message, 'VALIDATION_ERROR', 400);
    }
    if (e instanceof SyntaxError) {
      return error('Invalid request body', 'INVALID_JSON', 400);
    }
    return error('Internal server error', 'INTERNAL_ERROR', 500);
  }
}
