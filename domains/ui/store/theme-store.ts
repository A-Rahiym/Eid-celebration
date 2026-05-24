import { create } from 'zustand';
import type { ThemeMode } from '@/lib/types';

interface ThemeState {
  mode: ThemeMode;
  atmosphericIntensity: number;
  reducedMotion: boolean;
  setMode: (mode: ThemeMode) => void;
  setAtmosphericIntensity: (intensity: number) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  atmosphericIntensity: 1,
  reducedMotion: false,
  setMode: (mode) => set({ mode }),
  setAtmosphericIntensity: (intensity) => set({ atmosphericIntensity: intensity }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
}));
