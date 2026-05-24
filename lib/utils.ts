import { COUNTRIES } from './constants';

export function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export function formatCount(n: number): string {
  return n.toLocaleString();
}

export function getFlagEmoji(countryCode: string): string {
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

export function getCountryName(code: string): string {
  if (code.length === 2 && !COUNTRIES.some((c) => c.code === code)) {
    const nameMap: Record<string, string> = {
      SA: 'Saudi Arabia', TR: 'Turkey', ID: 'Indonesia',
      PK: 'Pakistan', BD: 'Bangladesh', EG: 'Egypt',
      NG: 'Nigeria', MY: 'Malaysia', IR: 'Iran',
      DZ: 'Algeria', MA: 'Morocco', GB: 'United Kingdom',
      US: 'United States', FR: 'France', DE: 'Germany',
      SN: 'Senegal', JO: 'Jordan', AE: 'UAE',
      KM: 'Comoros', LB: 'Lebanon', SO: 'Somalia',
      SD: 'Sudan', YE: 'Yemen', LY: 'Libya',
      TN: 'Tunisia', AF: 'Afghanistan', UZ: 'Uzbekistan',
      KZ: 'Kazakhstan', AZ: 'Azerbaijan', KG: 'Kyrgyzstan',
      TJ: 'Tajikistan', IQ: 'Iraq', SY: 'Syria',
      QA: 'Qatar', BH: 'Bahrain', OM: 'Oman',
      KW: 'Kuwait', IN: 'India', CN: 'China',
    };
    return nameMap[code] || code;
  }
  const country = COUNTRIES.find((c) => c.code === code);
  return country?.name || 'Everywhere';
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}