"use client";

/**
 * Tiny "site is ready" signal: fired when the preloader finishes (or is skipped).
 * Intro animations wait for it so they never play behind the preloader.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onReady(fn: () => void) {
  if (ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const isReady = () => ready;
