import { EMOJI_OPTIONS } from '@/lib/constants';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        flexWrap: 'wrap',
      }}
      aria-label="Add emoji to message"
    >
      {EMOJI_OPTIONS.map(emoji => (
        <button
          key={emoji}
          type="button"
          onClick={() => onEmojiSelect(emoji)}
          title={emoji}
          aria-label={`Add ${emoji} emoji`}
          style={{
            background: 'none',
            border: '1px solid var(--glass-border)',
            borderRadius: 50,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            lineHeight: 1,
            minWidth: 44,
            minHeight: 44,
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
