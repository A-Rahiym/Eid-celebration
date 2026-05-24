import { isSpam } from '@/domains/messages/validator/validator';

export class ModerationService {
  moderate(text: string): ModerationResult {
    const flagged = isSpam(text);

    return {
      flagged,
      reason: flagged ? 'Message failed spam heuristics' : undefined,
      sanitized: text,
    };
  }

  sanitize(text: string): string {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .trim()
      .slice(0, 280);
  }
}

export interface ModerationResult {
  flagged: boolean;
  reason?: string;
  sanitized: string;
}
