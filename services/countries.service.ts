import { apiFetch } from './api';
import type { Country } from '@/lib/types';

interface CountriesResponse {
  countries: Country[];
}

export const countriesService = {
  getAll: () => apiFetch<CountriesResponse>('/api/countries'),
};
