const ID_KEY = 'eid-identity';

export function getOrCreateUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const stored = localStorage.getItem(ID_KEY);
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem(ID_KEY, id);
  return id;
}
