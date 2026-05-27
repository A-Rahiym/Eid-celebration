'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './AboutModal.module.scss';
import CornerRosette from '@/domains/ui/components/icons/CornerRosette';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  const t = useTranslations('about');

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.close} onClick={onClose} aria-label={t('close')}>×</button>

      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-label={t('title')}>
        <div className={styles.frame} aria-hidden="true">
          <CornerRosette className={`${styles.corner} ${styles.cornerTL}`} />
          <CornerRosette className={`${styles.corner} ${styles.cornerTR}`} />
          <CornerRosette className={`${styles.corner} ${styles.cornerBL}`} />
          <CornerRosette className={`${styles.corner} ${styles.cornerBR}`} />
        </div>

        <div className={styles.content}>
          <div className={styles.devCard}>
            <Image
              src="/developer.png"
              alt="Abdulrahman Abdulrahim"
              width={80}
              height={80}
              className={styles.devAvatar}
            />
            <div>
              <p className={styles.devName}>Abdulrahman Abdulrahim</p>
              <p className={styles.devRole}>{t('developer')}</p>
            </div>
          </div>

          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.desc}>{t('description')}</p>

          <div className={styles.section}>
            <h3 className={styles.sub}>{t('motivation')}</h3>
            <p className={styles.text}>{t('motivationText')}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sub}>{t('tech')}</h3>
            <ul className={styles.list}>
              <li>Next.js 16 — {t('techFrontend')}</li>
              <li>Supabase — {t('techDb')}</li>
              <li>TanStack Query — {t('techData')}</li>
              <li>next-intl — {t('techI18n')}</li>
              <li>Framer Motion — {t('techMotion')}</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sub}>{t('openSource')}</h3>
            <p className={styles.text}>
              {t('openSourceDesc')}{' '}
              <a href="https://github.com/A-Rahiym/Eid-celebration" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub
              </a>
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sub}>{t('reachOut')}</h3>
            <div className={styles.socials}>
              <a href="https://github.com/A-Rahiym" target="_blank" rel="noopener noreferrer" className={styles.social}>
                GitHub
              </a>
              <a href="https://x.com/A_Rahiym" target="_blank" rel="noopener noreferrer" className={styles.social}>
                X / Twitter
              </a>
              <a href="https://www.linkedin.com/in/abdulrahim-abdulrahman-88a7a4263/" target="_blank" rel="noopener noreferrer" className={styles.social}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
