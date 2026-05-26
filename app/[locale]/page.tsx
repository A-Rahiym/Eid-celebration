import { createAdminClient } from '@/lib/supabase/server';
import { StatsService } from '@/domains/stats/service/service';
import HomeContent from './_components/HomeContent';

export const revalidate = 10;

export default async function Home() {
  const db = await createAdminClient();
  const statsService = new StatsService(db);
  const stats = await statsService.getGlobalStats();

  return <HomeContent stats={stats} />;
}
