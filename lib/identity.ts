const prefixes = [
  "Moonlit", "Golden", "Radiant", "Gentle", "Blessed",
  "Lantern", "Crescent", "Starlit", "Noor", "Amber",
  "Drifting", "Shimmering", "Glowing", "Dawnlit", "Ember",
  "Saffron", "Twilight", "Gilded", "Luminous", "Warm",
  "Festive", "Quiet", "Humble", "Tender", "Sacred",
  "Peaceful", "Eternal", "Velvet", "Silk", "Soft",
];

const suffixes = [
  "Traveler", "Soul", "Celebrant", "Dreamer", "Wanderer",
  "Heart", "Spirit", "Gatherer", "Pilgrim", "Seeker",
  "Bloom", "Flame", "Drifter", "Echo", "Light",
  "Breeze", "Smile", "Blessing", "Prayer", "Dawn",
  "Star", "Path", "Bearer", "Weaver", "Voice",
  "Radiance", "Glow", "Whisper", "Song", "Grace",
];

function hashSeed(seed: string): [number, number] {
  let h1 = 0;
  let h2 = 0;
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i);
    h1 = c + ((h1 << 5) - h1);
    h2 = c + ((h2 << 3) + h2);
  }
  return [Math.abs(h1), Math.abs(h2)];
}

export function generateIdentity(seed: string): string {
  const [h1, h2] = hashSeed(seed);
  const prefix = prefixes[h1 % prefixes.length];
  const suffix = suffixes[h2 % suffixes.length];
  return `${prefix} ${suffix}`;
}
