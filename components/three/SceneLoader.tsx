"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { onReady } from "@/lib/ready";
import { sceneState } from "@/lib/scene-store";

const HomeScene = dynamic(() => import("./HomeScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Picks a particle budget for the device; 0 = use the static fallback. */
function particleBudget() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  if (!hasWebGL()) return 0;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return 0;
  const small = window.matchMedia("(max-width: 767px)").matches;
  const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  if (small) return weak ? 9000 : 16000;
  return weak ? 24000 : 52000;
}

/**
 * Lazy-loads the WebGL scene after the preloader and when the browser is idle,
 * so three.js never competes with first paint. Falls back to the CSS core.
 */
export function SceneLoader({ form = 0 }: { form?: number }) {
  const [count, setCount] = useState(0);

  // Each page decides which form the core starts in (0 = core, 1–7 = services).
  useEffect(() => {
    sceneState.morph = form;
    sceneState.opacity = 1;
  }, [form]);

  useEffect(() => {
    let timer = 0;
    const off = onReady(() => {
      const budget = particleBudget();
      if (!budget) return;
      // Small delay lets the hero text reveal start before three.js parses.
      timer = window.setTimeout(() => setCount(budget), 250);
    });
    return () => {
      off();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => () => {
    delete document.documentElement.dataset.scene;
  }, []);

  if (!count) return null;
  return <HomeScene count={count} onReady={() => (document.documentElement.dataset.scene = "on")} />;
}
