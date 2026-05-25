import { COUNTRIES } from './constants';

export function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export function formatCount(n: number, locale?: string): string {
  return new Intl.NumberFormat(locale).format(n);
}

export function getFlagEmoji(countryCode: string): string {
  if (countryCode === 'XX') return '🌍';
  if (countryCode.length === 2) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((c) => 0x1F1E6 + c.charCodeAt(0) - 65);
    return String.fromCodePoint(...codePoints);
  }
  const country = COUNTRIES.find((c) => c.code === countryCode);
  return country?.flag || '🌍';
}

export function getCountryName(code: string, locale?: string): string {
  if (!code) return '';
  if (code.length === 2) {
    try {
      const displayNames = new Intl.DisplayNames(locale, { type: 'region' });
      return displayNames.of(code.toUpperCase()) || code;
    } catch {
      return code;
    }
  }
  const country = COUNTRIES.find((c) => c.code === code);
  return country?.code || code;
}

export function formatRelativeTime(iso: string, locale?: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (mins < 1) return rtf.format(0, 'minute');
  if (mins < 60) return rtf.format(-mins, 'minute');
  const hours = Math.floor(mins / 60);
  if (hours < 24) return rtf.format(-hours, 'hour');
  return rtf.format(-Math.floor(hours / 24), 'day');
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}