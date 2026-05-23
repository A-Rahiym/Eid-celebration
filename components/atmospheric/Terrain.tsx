export default function Terrain() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 340,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(10,20,50,0.8) 60%, rgba(8,16,40,0.95) 100%)',
          clipPath:
            'polygon(0% 65%, 2% 50%, 5% 58%, 8% 38%, 11% 54%, 14% 30%, 17% 46%, 20% 22%, 23% 40%, 27% 15%, 30% 36%, 33% 18%, 36% 42%, 40% 10%, 43% 32%, 46% 16%, 50% 8%, 53% 22%, 56% 12%, 60% 30%, 63% 14%, 66% 34%, 70% 18%, 73% 38%, 76% 22%, 80% 42%, 84% 26%, 87% 48%, 90% 30%, 93% 52%, 96% 36%, 100% 60%, 100% 100%, 0% 100%)',
          opacity: 0.45,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 230,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(8,15,35,0.9) 40%, #060d1e 80%)',
          clipPath:
            'polygon(0% 55%, 3% 38%, 6% 50%, 9% 25%, 13% 45%, 17% 20%, 20% 40%, 24% 12%, 28% 35%, 32% 18%, 36% 38%, 40% 8%, 44% 30%, 48% 14%, 52% 32%, 56% 10%, 60% 28%, 64% 14%, 68% 35%, 72% 18%, 76% 40%, 80% 22%, 84% 44%, 88% 25%, 92% 48%, 96% 30%, 100% 52%, 100% 100%, 0% 100%)',
        }}
      />

      <svg
        style={{ position: 'absolute', bottom: 62, left: '4%', opacity: 0.55 }}
        width="140"
        height="100"
        viewBox="0 0 140 100"
        fill="none"
      >
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

      <svg
        style={{ position: 'absolute', bottom: 62, right: '5%', opacity: 0.55, transform: 'scaleX(-1)' }}
        width="140"
        height="100"
        viewBox="0 0 140 100"
        fill="none"
      >
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

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(180deg, transparent, var(--navy-deep) 85%)',
        }}
      />
    </div>
  );
}
