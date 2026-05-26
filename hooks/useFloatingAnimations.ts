'use client';

import { useMemo } from 'react';
import { useReducedMotion, type Transition } from 'framer-motion';
import type { FeedMessage } from '@/lib/types';
import {
  FLOAT_EASE,
  FLOAT_FADE_DURATION,
  FLOAT_REPEAT,
  FLOAT_REPEAT_TYPE,
} from '@/constants/motion';

export interface FloatingAnimationConfig {
  delayStep: number;
  baseDuration: number;
  durationVariance: number;
  keyframes: {
    x: readonly [number, number];
    y: readonly [number, number];
    rotate: readonly [number, number];
  };
}

export interface FloatingAnimation {
  x: number[];
  y: number[];
  rotate: number[];
  transition: Transition;
}

export type FloatingAnimationMap = Record<string, FloatingAnimation>;

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash >>> 0;
}

function createRng(seed: number) {
  let t = seed + 0x6D2B79F5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function offset(rng: () => number, range: number) {
  return (rng() - 0.5) * range;
}

export function useFloatingAnimations(
  messages: FeedMessage[],
  config: FloatingAnimationConfig,
) {
  const reducedMotionPreference = useReducedMotion();
  const reducedMotion = reducedMotionPreference ?? false;

  const animations = useMemo<FloatingAnimationMap>(() => {
    const map: FloatingAnimationMap = {};

    messages.forEach((message, index) => {
      const rng = createRng(hashString(message.id));
      const duration = config.baseDuration + rng() * config.durationVariance;
      const delay = index * config.delayStep;

      const x = [0, offset(rng, config.keyframes.x[0]), offset(rng, config.keyframes.x[1]), 0];
      const y = [0, offset(rng, config.keyframes.y[0]), offset(rng, config.keyframes.y[1]), 0];
      const rotate = [
        0,
        offset(rng, config.keyframes.rotate[0]),
        offset(rng, config.keyframes.rotate[1]),
        0,
      ];

      const transition: Transition = {
        opacity: { duration: FLOAT_FADE_DURATION, delay },
        scale: { duration: FLOAT_FADE_DURATION, delay },
        ...(reducedMotion
          ? {}
          : {
              x: {
                duration,
                repeat: FLOAT_REPEAT,
                repeatType: FLOAT_REPEAT_TYPE,
                ease: FLOAT_EASE,
                delay,
              },
              y: {
                duration,
                repeat: FLOAT_REPEAT,
                repeatType: FLOAT_REPEAT_TYPE,
                ease: FLOAT_EASE,
                delay,
              },
              rotate: {
                duration,
                repeat: FLOAT_REPEAT,
                repeatType: FLOAT_REPEAT_TYPE,
                ease: FLOAT_EASE,
                delay,
              },
            }),
      };

      map[message.id] = {
        x,
        y,
        rotate,
        transition,
      };
    });

    return map;
  }, [messages, config, reducedMotion]);

  return { animations, reducedMotion };
}
