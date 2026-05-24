export interface ValidationError {
  field: string;
  message: string;
}

export interface ReactionValidation {
  valid: boolean;
  errors: ValidationError[];
}

const SUPPORTED_REACTIONS = new Set(['🌙', '✨', '❤️', '🤲', '🕌', '⭐']);

export function validateAddReaction(
  messageId: string,
  reactionType: string,
): ReactionValidation {
  const errors: ValidationError[] = [];

  if (!messageId) {
    errors.push({ field: 'messageId', message: 'Message ID is required' });
  }

  if (!reactionType) {
    errors.push({ field: 'reactionType', message: 'Reaction type is required' });
  } else if (!SUPPORTED_REACTIONS.has(reactionType)) {
    errors.push({
      field: 'reactionType',
      message: `Reaction "${reactionType}" is not supported`,
    });
  }

  return { valid: errors.length === 0, errors };
}

export function validateRemoveReaction(
  messageId: string,
  reactionType: string,
): ReactionValidation {
  return validateAddReaction(messageId, reactionType);
}
