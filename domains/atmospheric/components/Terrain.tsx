import styles from './AtmosphericBackground.module.scss';

export default function Terrain() {
  return (
    <div className={styles.terrain} aria-hidden="true">
      <div className={styles.tFar} />
      <div className={styles.tMid} />

      <svg className={styles.mosqueLeft} width="140" height="100" viewBox="0 0 140 100" fill="none">
        <rect x="60" y="55" width="20" height="45" fill="#0c1830" />
        <path d="M70 55 Q70 35 60 30 Q70 25 80 30 Q70 35 70 55Z" fill="#0c1830" />
        <rect x="30" y="65" width="15" height="35" fill="#0a1628" />
        <path d="M37.5 65 Q37.5 52 32 48 Q37.5 44 43 48 Q37.5 52 37.5 65Z" fill="#0a1628" />
        <rect x="95" y="68" width="12" height="32" fill="#0a1628" />
        <path d="M101 68 Q101 57 96 53 Q101 49 106 53 Q101 57 101 68Z" fill="#0a1628" />
        <line x1="70" y1="25" x2="70" y2="15" stroke="#0c1830" strokeWidth="1.5" />
        <circle cx="70" cy="14" r="2" fill="#0c1830" />
        <line x1="37.5" y1="44" x2="37.5" y2="36" stroke="#0a1628" strokeWidth="1" />
        <circle cx="37.5" cy="35" r="1.5" fill="#0a1628" />
        <line x1="101" y1="49" x2="101" y2="42" stroke="#0a1628" strokeWidth="1" />
        <circle cx="101" cy="41" r="1.5" fill="#0a1628" />
      </svg>

      <svg className={styles.mosqueRight} width="140" height="100" viewBox="0 0 140 100" fill="none">
        <rect x="60" y="55" width="20" height="45" fill="#0c1830" />
        <path d="M70 55 Q70 35 60 30 Q70 25 80 30 Q70 35 70 55Z" fill="#0c1830" />
        <rect x="30" y="65" width="15" height="35" fill="#0a1628" />
        <path d="M37.5 65 Q37.5 52 32 48 Q37.5 44 43 48 Q37.5 52 37.5 65Z" fill="#0a1628" />
        <rect x="95" y="68" width="12" height="32" fill="#0a1628" />
        <path d="M101 68 Q101 57 96 53 Q101 49 106 53 Q101 57 101 68Z" fill="#0a1628" />
        <line x1="70" y1="25" x2="70" y2="15" stroke="#0c1830" strokeWidth="1.5" />
        <circle cx="70" cy="14" r="2" fill="#0c1830" />
        <line x1="37.5" y1="44" x2="37.5" y2="36" stroke="#0a1628" strokeWidth="1" />
        <circle cx="37.5" cy="35" r="1.5" fill="#0a1628" />
        <line x1="101" y1="49" x2="101" y2="42" stroke="#0a1628" strokeWidth="1" />
        <circle cx="101" cy="41" r="1.5" fill="#0a1628" />
      </svg>

      <div className={styles.tFront} />
    </div>
  );
}
