import { NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { MessageService, ValidationError } from '@/domains/messages/service/service';
import { success, error } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '20', 10)));
    const sortBy = (searchParams.get('sortBy') || 'created_at') as 'created_at' | 'popular';
    const countryCode = searchParams.get('countryCode');

    const db = await createAdminClient();
    const messageService = new MessageService(db);

    const result = await messageService.getFeed({
      page,
      pageSize,
      sortBy: sortBy === 'popular' ? 'popular' : 'created_at',
      countryCode: countryCode || undefined,
    });
    return success(result);
  } catch (e) {
    if (e instanceof ValidationError) {
      return error(e.message, 'VALIDATION_ERROR', 400);
    }
    return error('Internal server error', 'INTERNAL_ERROR', 500);
  }
}
