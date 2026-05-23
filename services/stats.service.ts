import { apiFetch } from './api';
import type { StatsResponse } from '@/lib/types';

export const statsService = {
  get: () => apiFetch<StatsResponse>('/api/stats'),
};
