'use client';

import Image from 'next/image';
import { type RefObject } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ComposeSection.module.scss';
import EmojiPicker from './EmojiPicker';
import CharCounter from './CharCounter';
import CountrySelector from './CountrySelector';
import GenderSelector from './GenderSelector';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';
import { avatarUrl } from '@/lib/avatar';

interface ComposeCardProps {
  text: string;
  onTextChange: (text: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  gender: 'm' | 'f' | undefined;
  onGenderChange: (gender: 'm' | 'f' | undefined) => void;
  insertEmoji: (emoji: string) => void;
  handleSend: () => void;
  isPending: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  avatarSeed: string;
  cycleAvatar: () => void;
}

export default function ComposeCard({
  text,
  onTextChange,
  location,
  onLocationChange,
  gender,
  onGenderChange,
  insertEmoji,
  handleSend,
  isPending,
  textareaRef,
  avatarSeed,
  cycleAvatar,
}: ComposeCardProps) {
  const t = useTranslations('compose');

  return (
    <div className={styles.card} role="form" aria-label={t('formLabel')}>
      <div className={styles.cardGlow} />

      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <div
            className={styles.avatar}
            onClick={cycleAvatar}
            role="button"
            tabIndex={0}
            aria-label={t('changeAvatar')}
          >
            {avatarSeed ? (
              <Image
                src={avatarUrl(avatarSeed)}
                alt=""
                width={40}
                height={40}
                className={styles.avatarImg}
              />
            ) : (
              t('you')
            )}
          </div>
          <span className={styles.hintText}>{t('avatarHint')}</span>
        </div>
        <div className={styles.nameRow}>
          <div className={styles.name}>{t('title')}</div>
          <div className={styles.selectRow}>
            <CountrySelector location={location} onLocationChange={onLocationChange} />
            <GenderSelector gender={gender} onGenderChange={onGenderChange} />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => onTextChange(e.target.value.slice(0, 280))}
          rows={3}
          maxLength={280}
          placeholder={t('placeholder')}
          aria-label={t('textareaLabel')}
          className={styles.textarea}
        />
        <CharCounter current={text.length} />
      </div>

      <div className={styles.footer}>
        <EmojiPicker onEmojiSelect={insertEmoji} />
        <div className={styles.right}>
          <div className={styles.sendWrap}>
            <CornerRosette className={`${styles.rosette} ${styles.rosetteTL}`} />
            <CornerRosette className={`${styles.rosette} ${styles.rosetteTR}`} />
            <CornerRosette className={`${styles.rosette} ${styles.rosetteBL}`} />
            <CornerRosette className={`${styles.rosette} ${styles.rosetteBR}`} />
            <button
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || isPending}
              aria-label={t('sendAria')}
              className={styles.sendBtn}
            >
              {isPending ? t('sending') : t('send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}