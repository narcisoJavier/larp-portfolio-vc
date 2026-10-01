"use client";

import { useSyncExternalStore } from 'react';

/** Keeps the hydration render deterministic, then honors the user's motion preference. */
export function useStableReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

export default useStableReducedMotion;
