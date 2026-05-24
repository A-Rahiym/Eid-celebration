interface CornerRosetteProps {
  className?: string;
}

export default function CornerRosette({ className }: CornerRosetteProps) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M2 30 Q2 2 30 2" stroke="rgba(201,169,110,0.45)" strokeWidth="0.8" fill="none" />
      <path d="M6 30 Q6 6 30 6" stroke="rgba(201,169,110,0.22)" strokeWidth="0.5" fill="none" />
      <path d="M11 30 Q11 11 30 11" stroke="rgba(201,169,110,0.10)" strokeWidth="0.4" fill="none" strokeDasharray="1.5 4" />
      <line x1="2" y1="2" x2="18" y2="2" stroke="rgba(201,169,110,0.22)" strokeWidth="0.5" />
      <line x1="2" y1="2" x2="2" y2="18" stroke="rgba(201,169,110,0.22)" strokeWidth="0.5" />
      <line x1="2" y1="2" x2="14" y2="14" stroke="rgba(201,169,110,0.14)" strokeWidth="0.4" />
      <path d="M2 2 Q10 2 12 9 Q6 11 2 2Z" fill="rgba(201,169,110,0.07)" />
      <path d="M2 2 Q2 10 9 12 Q11 6 2 2Z" fill="rgba(201,169,110,0.07)" />
      <path d="M2 7 Q5 5 7 2" stroke="rgba(201,169,110,0.42)" strokeWidth="0.9" fill="none" />
      <path d="M2 12 Q7 7 12 2" stroke="rgba(201,169,110,0.18)" strokeWidth="0.5" fill="none" />
      <circle cx="12" cy="2" r="1.2" fill="rgba(201,169,110,0.45)" />
      <circle cx="2" cy="12" r="1.2" fill="rgba(201,169,110,0.45)" />
      <circle cx="9" cy="9" r="1.6" fill="rgba(201,169,110,0.28)" stroke="rgba(201,169,110,0.50)" strokeWidth="0.5" />
      <circle cx="2" cy="2" r="2.2" fill="rgba(201,169,110,0.65)" />
    </svg>
  );
}
