export const FLOAT_EASE = 'easeInOut';
export const FLOAT_REPEAT = Infinity;
export const FLOAT_REPEAT_TYPE = 'reverse';

export const FLOAT_FADE_DURATION = 0.5;
export const FLOAT_HOVER = { scale: 1.04, transition: { duration: 0.3 } };

export const FEED_ITEM_INITIAL = { opacity: 0, scale: 0.95, y: 20 };
export const FLOATING_FEED_INITIAL = { opacity: 0, scale: 0.85, y: 30 };
export const BASE_VISIBLE = { opacity: 1, scale: 1 };
export const REDUCED_MOTION_INITIAL = { opacity: 0, scale: 1, y: 0 };
export const REDUCED_MOTION_VISIBLE = { opacity: 1, scale: 1, y: 0 };

export const FEED_LIST_ANIMATION_CONFIG = {
  delayStep: 0.04,
  baseDuration: 14,
  durationVariance: 8,
  keyframes: {
    x: [24, 20] as const,
    y: [30, 24] as const,
    rotate: [2, 2] as const,
  },
};

export const FLOATING_FEED_ANIMATION_CONFIG = {
  delayStep: 0.25,
  baseDuration: 14,
  durationVariance: 8,
  keyframes: {
    x: [24, 20] as const,
    y: [30, 24] as const,
    rotate: [2, 2] as const,
  },
};
