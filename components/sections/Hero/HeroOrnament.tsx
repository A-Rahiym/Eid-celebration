export default function HeroOrnament() {
  return (
    <svg
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 620,
        height: 620,
        opacity: 0.03,
        pointerEvents: 'none',
      }}
      viewBox="0 0 620 620"
      aria-hidden="true"
    >
      <g fill="none" stroke="rgba(201,169,110,1)" strokeWidth="0.8">
        <circle cx="310" cy="310" r="300" />
        <circle cx="310" cy="310" r="240" />
        <circle cx="310" cy="310" r="180" />
        <circle cx="310" cy="310" r="120" />
        <circle cx="310" cy="310" r="60" />
        <polygon points="310,10 590,165 590,455 310,610 30,455 30,165" />
        <polygon points="310,70 530,195 530,425 310,550 90,425 90,195" />
        <polygon points="310,130 470,225 470,395 310,490 150,395 150,225" />
        <line x1="310" y1="10" x2="310" y2="610" />
        <line x1="30" y1="165" x2="590" y2="455" />
        <line x1="30" y1="455" x2="590" y2="55" />
        <line x1="10" y1="310" x2="610" y2="310" />
        <line x1="165" y1="30" x2="455" y2="590" />
        <line x1="455" y1="30" x2="165" y2="590" />
      </g>
    </svg>
  );
}
