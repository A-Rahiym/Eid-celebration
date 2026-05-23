import type { ReactNode } from 'react';

interface FeedGridProps {
  children: ReactNode;
}

const gridStyles: React.CSSProperties = {
  columns: '3',
  columnGap: '1.1rem',
};

export default function FeedGrid({ children }: FeedGridProps) {
  return (
    <div style={gridStyles} role="feed" aria-label="Eid wishes from around the world">
      {children}

      <style jsx>{`
        @media (max-width: 900px) {
          div {
            columns: 2 !important;
          }
        }
        @media (max-width: 560px) {
          div {
            columns: 1 !important;
            column-gap: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
