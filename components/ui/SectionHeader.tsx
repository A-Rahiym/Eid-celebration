import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.sub}>{subtitle}</p>}
    </div>
  );
}
