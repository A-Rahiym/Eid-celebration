interface GeometricWatermarkCircleProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function GeometricWatermarkCircle({ className, style }: GeometricWatermarkCircleProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="rgba(61,184,156,1)" strokeWidth="0.6">
        <circle cx="100" cy="100" r="88" />
        <circle cx="100" cy="100" r="62" />
        <circle cx="100" cy="100" r="36" />
        <polygon points="100,12 188,100 100,188 12,100" />
        <polygon points="100,36 164,100 100,164 36,100" />
      </g>
    </svg>
  );
}
