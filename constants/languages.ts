import type { AppLocale } from '@/i18n/routing';

export interface LanguageOption {
  locale: AppLocale;
  label: string;
  name: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { locale: 'en', label: 'EN', name: 'English' },
  { locale: 'ha', label: 'HA', name: 'Hausa' },
  { locale: 'ig', label: 'IG', name: 'Igbo' },
  { locale: 'yo', label: 'YO', name: 'Yorùbá' },
  { locale: 'ar', label: 'AR', name: 'العربية' },
  { locale: 'fr', label: 'FR', name: 'Français' },
  { locale: 'tr', label: 'TR', name: 'Türkçe' },
  { locale: 'id', label: 'ID', name: 'Bahasa Indonesia' },
];
