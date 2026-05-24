import { createAdminClient } from '@/lib/supabase/server';
import { StatsService } from '@/domains/stats/service/service';
import { success, error } from '@/lib/api-utils';

export const revalidate = 10;

export async function GET() {
  try {
    const db = await createAdminClient();
    const statsService = new StatsService(db);

    const stats = await statsService.getGlobalStats();

    return success(stats);
  } catch {
    return error('Internal server error', 'INTERNAL_ERROR', 500);
  }
}
