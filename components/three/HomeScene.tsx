"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { CipherCore } from "./CipherCore";

/**
 * Fixed full-viewport canvas behind the home hero + services story.
 * Stops rendering entirely once the story has scrolled away.
 */
export default function HomeScene({ count, onReady }: { count: number; onReady: () => void }) {
  const [active, setActive] = useState(true);
  // Phones have 3x screens and a small canvas: render near native density so particles stay crisp.
  const small = window.matchMedia("(max-width: 767px)").matches;
  const maxDpr = Math.min(window.devicePixelRatio || 1, small ? 2.5 : 1.75);
  const minDpr = small ? 1.5 : 0.75;
  const [dpr, setDpr] = useState(maxDpr);

  useEffect(() => {
    const zone = document.getElementById("scene-zone");
    if (!zone) return;
    const st = ScrollTrigger.create({
      trigger: zone,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => setActive(self.isActive),
    });
    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0 }}
    >
      <Canvas
        dpr={dpr}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 9], fov: 35, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => requestAnimationFrame(onReady)}
      >
        <PerformanceMonitor
          onDecline={() => setDpr((d) => Math.max(minDpr, d - 0.25))}
          onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.25))}
        />
        <CipherCore count={count} />
      </Canvas>
    </div>
  );
}
