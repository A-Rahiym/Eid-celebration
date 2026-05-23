export function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export function formatCount(n: number): string {
  return n.toLocaleString();
}

export function getFlagEmoji(loc: string): string {
  return loc.split(' ')[0] || '';
}

export function getCountryName(loc: string): string {
  return loc.split(' ').slice(1).join(' ') || '';
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
