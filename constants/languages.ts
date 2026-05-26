import type { AppLocale } from '@/i18n/routing';

export interface LanguageOption {
  locale: AppLocale;
  label: string;
  name: string;
  icon: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { locale: 'en', label: 'EN', name: 'English', icon: '🌍' },
  { locale: 'ha', label: 'HA', name: 'Hausa', icon: '🌍' },
  { locale: 'ig', label: 'IG', name: 'Igbo', icon: '🌍' },
  { locale: 'yo', label: 'YO', name: 'Yorùbá', icon: '🌍' },
  { locale: 'ar', label: 'AR', name: 'العربية', icon: '🌙' },
  { locale: 'fr', label: 'FR', name: 'Français', icon: '✨' },
  { locale: 'tr', label: 'TR', name: 'Türkçe', icon: '🕌' },
  { locale: 'id', label: 'ID', name: 'Bahasa Indonesia', icon: '🌿' },
];
