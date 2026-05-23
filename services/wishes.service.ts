import { apiFetch } from './api';
import type { WishesResponse, Wish, CreateWishPayload } from '@/lib/types';

export const wishesService = {
  getAll: (filter?: string) =>
    apiFetch<WishesResponse>(`/api/wishes?filter=${filter || 'all'}`),

  create: (data: CreateWishPayload) =>
    apiFetch<Wish>('/api/wishes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
