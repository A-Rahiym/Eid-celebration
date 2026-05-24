interface StarMedallionProps {
  className?: string;
  opacity?: number;
  dark?: boolean;
}

export default function StarMedallion({ className, opacity = 0.75, dark = false }: StarMedallionProps) {
  const outerRing = dark ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.35)';
  const innerRing = dark ? 'rgba(201,169,110,0.35)' : 'rgba(201,169,110,0.4)';
  const starFill = dark ? 'rgba(201,169,110,0.12)' : 'rgba(201,169,110,0.18)';
  const starStroke = dark ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.6)';
  const dot = dark ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.5)';
  const centreFill = dark ? 'rgba(201,169,110,0.6)' : 'rgba(201,169,110,0.7)';
  const bgFill = dark ? 'rgba(201,169,110,0.03)' : 'rgba(201,169,110,0.04)';

  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <g opacity={opacity}>
        <circle cx="20" cy="20" r="18" stroke={outerRing} strokeWidth="0.6" fill={bgFill} />
        <circle cx="20" cy="20" r="12" stroke={innerRing} strokeWidth="0.5" fill="none" />
        <polygon
          points="20,3 22.4,17.6 37,20 22.4,22.4 20,37 17.6,22.4 3,20 17.6,17.6"
          fill={starFill}
          stroke={starStroke}
          strokeWidth="0.5"
        />
        <circle cx="20" cy="20" r="2.5" fill={centreFill} />
        <circle cx="20" cy="5" r="1" fill={dot} />
        <circle cx="20" cy="35" r="1" fill={dot} />
        <circle cx="5" cy="20" r="1" fill={dot} />
        <circle cx="35" cy="20" r="1" fill={dot} />
      </g>
    </svg>
  );
}
