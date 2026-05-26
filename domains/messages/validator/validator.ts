const MAX_MESSAGE_LENGTH = 280;
const MIN_MESSAGE_LENGTH = 1;

const PROFANITY_LIST = [
  /f[*\s]*u[*\s]*c[*\s]*k/i,
  /s[*\s]*h[*\s]*i[*\s]*t/i,
  /b[*\s]*i[*\s]*t[*\s]*c[*\s]*h/i,
  /a[*\s]*s[*\s]*s/i,
  /d[*\s]*a[*\s]*m[*\s]*n/i,
];

export interface ValidationError {
  field: string;
  message: string;
}

export interface MessageValidation {
  valid: boolean;
  errors: ValidationError[];
  sanitized: string;
}

export function validateMessage(
  messageText: string,
  countryCode: string,
): MessageValidation {
  const errors: ValidationError[] = [];

  const trimmed = messageText.trim();

  if (!trimmed || trimmed.length < MIN_MESSAGE_LENGTH) {
    errors.push({ field: 'messageText', message: 'Message cannot be empty' });
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    errors.push({
      field: 'messageText',
      message: `Message must be ${MAX_MESSAGE_LENGTH} characters or less`,
    });
  }

  if (!countryCode || countryCode.length !== 2) {
    errors.push({ field: 'countryCode', message: 'A valid country code is required' });
  }

  let sanitized = trimmed;

  for (const pattern of PROFANITY_LIST) {
    sanitized = sanitized.replace(pattern, '***');
  }

  sanitized = sanitized
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '');

  return { valid: errors.length === 0, errors, sanitized };
}

export function validateDisplayName(name: string): ValidationError | null {
  const trimmed = name.trim();
  if (!trimmed) return null;

  if (trimmed.length > 30) {
    return { field: 'displayName', message: 'Display name must be 30 characters or less' };
  }

  if (/<[^>]*>/.test(trimmed)) {
    return { field: 'displayName', message: 'Display name cannot contain HTML' };
  }

  return null;
}

export function isSpam(text: string): boolean {
  const repeated = /(.)\1{10,}/.test(text);
  const hasCase = text !== text.toLowerCase();
  const allCaps = hasCase && text === text.toUpperCase() && text.length > 50;
  const tooManyLinks = (text.match(/https?:\/\//g) || []).length > 2;

  return repeated || allCaps || tooManyLinks;
}
