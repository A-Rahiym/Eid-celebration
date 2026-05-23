import { getInitials } from '@/lib/utils';
import styles from './FeedSection.module.scss';

interface CardAvatarProps {
  name: string;
  color: string;
  accent: string;
}

export default function CardAvatar({ name, color, accent }: CardAvatarProps) {
  return (
    <div
      className={styles.avatar}
      style={{ background: color, color: accent }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
