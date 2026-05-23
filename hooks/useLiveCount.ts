'use client';

import { useState, useEffect, useRef } from 'react';

interface UseLiveCountReturn {
  liveCount: number;
  wishCount: number;
  countriesCount: number;
}

export function useLiveCount(): UseLiveCountReturn {
  const [stats, setStats] = useState({
    liveCount: 3241,
    wishCount: 1847,
    countriesCount: 84,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats({
            liveCount: data.liveCount,
            wishCount: data.wishCount,
            countriesCount: data.countriesCount,
          });
        }
      } catch {
        // Silently fail — keep current values
      }
    }

    fetchStats();
    intervalRef.current = setInterval(fetchStats, 4500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return stats;
}
