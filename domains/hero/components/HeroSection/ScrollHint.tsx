import styles from './HeroSection.module.scss';

export default function ScrollHint() {
  return (
    <div className={styles.scrollHint} aria-hidden="true">
      <span className={styles.scrollText}>Scroll</span>
      <div className={styles.scrollMouse}>
        <div className={styles.scrollWheel} />
      </div>
    </div>
  );
}
