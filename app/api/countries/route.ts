import { COUNTRIES } from '@/lib/constants';

export async function GET() {
  return Response.json({ countries: COUNTRIES });
}
