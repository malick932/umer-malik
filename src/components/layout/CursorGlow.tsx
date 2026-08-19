"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useMousePosition } from "@/hooks/useMousePosition";

/** A soft, mouse-following light glow layered behind content. Disabled on touch devices. */
export function CursorGlow() {
  const { x, y } = useMousePosition({ damping: 24, stiffness: 140 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !prefersReducedMotion);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30"
      style={{ x, y }}
    >
      <div
        className="h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-purple) 18%, transparent) 0%, color-mix(in oklch, var(--color-cyan) 8%, transparent) 45%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
