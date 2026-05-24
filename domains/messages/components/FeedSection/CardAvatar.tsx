import Image from 'next/image';
import { getInitials } from '@/lib/utils';
import { avatarUrl } from '@/lib/avatar';
import styles from './FeedSection.module.scss';

interface CardAvatarProps {
  name: string;
  avatarSeed: string;
  color: string;
  accent: string;
}

export default function CardAvatar({ name, avatarSeed, color, accent }: CardAvatarProps) {
  return (
    <div
      className={styles.avatar}
      style={{ background: color, color: accent }}
      aria-hidden="true"
    >
      {avatarSeed ? (
        <Image
          src={avatarUrl(avatarSeed)}
          alt={name}
          width={36}
          height={36}
          className={styles.avatarImg}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
