const AVATAR_COUNT = 5;

export function pickAvatar(seed: string, gender?: 'm' | 'f'): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  const g = gender || (hash % 2 === 0 ? 'm' : 'f');
  const index = (hash % AVATAR_COUNT) + 1;
  return `${g}${index}`;
}

export function avatarUrl(avatarSeed: string): string {
  return `/avatar/${avatarSeed}.png`;
}
