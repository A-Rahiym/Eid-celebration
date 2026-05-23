import { getInitials } from '@/lib/utils';

interface CardAvatarProps {
  name: string;
  color: string;
  accent: string;
}

export default function CardAvatar({ name, color, accent }: CardAvatarProps) {
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.64rem',
        fontWeight: 500,
        flexShrink: 0,
        border: '1px solid rgba(255,255,255,0.06)',
        letterSpacing: '0.02em',
        background: color,
        color: accent,
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
