import { useTranslations } from 'next-intl';
import { EMOJI_OPTIONS } from '@/lib/constants';
import styles from './ComposeSection.module.scss';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const t = useTranslations('compose');

  return (
    <div className={styles.emojiRow} aria-label={t('emojiRowLabel')}>
      {EMOJI_OPTIONS.map(emoji => (
        <button
          key={emoji}
          type="button"
          onClick={() => onEmojiSelect(emoji)}
          title={emoji}
          aria-label={t('emojiButtonLabel', { emoji })}
          className={styles.emojiBtn}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
