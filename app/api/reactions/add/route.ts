import { NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { ReactionService } from '@/domains/reactions/service/service';
import { ValidationError } from '@/domains/messages/service/service';
import { success, error, parseBody } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await parseBody<{
      messageId: string;
      reactionType: string;
      userId: string;
    }>(request);

    const db = await createAdminClient();
    const reactionService = new ReactionService(db);

    const updatedCounts = await reactionService.add({
      messageId: body.messageId,
      reactionType: body.reactionType,
      userId: body.userId,
    });

    return success(updatedCounts, 201);
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
