import styles from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export default function Container({
  children,
  maxWidth = 'var(--max-w)',
  className = '',
}: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}
