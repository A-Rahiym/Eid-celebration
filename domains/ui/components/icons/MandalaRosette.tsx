interface MandalaRosetteProps {
  className?: string;
}

export default function MandalaRosette({ className }: MandalaRosetteProps) {
  return (
    <svg className={className} width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <g opacity="0.55" stroke="none">
        <path d="M4 68 Q4 4 68 4" stroke="rgba(201,169,110,0.5)" strokeWidth="0.8" fill="none" />
        <path d="M10 68 Q10 10 68 10" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" fill="none" />
        <circle cx="4" cy="4" r="3" fill="rgba(201,169,110,0.6)" />
        <line x1="4" y1="4" x2="36" y2="4" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
        <line x1="4" y1="4" x2="4" y2="36" stroke="rgba(201,169,110,0.25)" strokeWidth="0.5" />
        <line x1="4" y1="4" x2="28" y2="28" stroke="rgba(201,169,110,0.2)" strokeWidth="0.5" />
        <path d="M4 4 Q20 4 24 18 Q12 22 4 4Z" fill="rgba(201,169,110,0.07)" />
        <path d="M4 4 Q4 20 18 24 Q22 12 4 4Z" fill="rgba(201,169,110,0.07)" />
        <path d="M4 4 Q18 12 22 26 Q8 28 4 4Z" fill="rgba(201,169,110,0.04)" />
        <circle cx="24" cy="4" r="1.5" fill="rgba(201,169,110,0.4)" />
        <circle cx="4" cy="24" r="1.5" fill="rgba(201,169,110,0.4)" />
        <circle cx="18" cy="18" r="2" fill="rgba(201,169,110,0.3)" stroke="rgba(201,169,110,0.5)" strokeWidth="0.5" />
        <path d="M16 68 Q16 16 68 16" stroke="rgba(201,169,110,0.15)" strokeWidth="0.4" fill="none" strokeDasharray="2 4" />
        <path d="M4 14 Q9 9 14 4" stroke="rgba(201,169,110,0.45)" strokeWidth="1" fill="none" />
        <path d="M4 22 Q13 13 22 4" stroke="rgba(201,169,110,0.25)" strokeWidth="0.6" fill="none" />
      </g>
    </svg>
  );
}
