import { EMOJI_OPTIONS } from '@/lib/constants';
import styles from './ComposeSection.module.scss';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className={styles.emojiRow} aria-label="Add emoji to message">
      {EMOJI_OPTIONS.map(emoji => (
        <button
          key={emoji}
          type="button"
          onClick={() => onEmojiSelect(emoji)}
          title={emoji}
          aria-label={`Add ${emoji} emoji`}
          className={styles.emojiBtn}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
