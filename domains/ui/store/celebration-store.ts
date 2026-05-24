import { create } from 'zustand';

interface CelebrationState {
  showNewBadge: boolean;
  lastCreatedAt: string | null;
  dismissedBadge: () => void;
  markNewMessage: () => void;
}

export const useCelebrationStore = create<CelebrationState>((set) => ({
  showNewBadge: false,
  lastCreatedAt: null,
  dismissedBadge: () => set({ showNewBadge: false }),
  markNewMessage: () => set({ showNewBadge: true, lastCreatedAt: new Date().toISOString() }),
}));
