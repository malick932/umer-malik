"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

interface UseMousePositionOptions {
  damping?: number;
  stiffness?: number;
}

/** Tracks the viewport-relative mouse position as smoothed motion values. */
export function useMousePosition({
  damping = 30,
  stiffness = 200,
}: UseMousePositionOptions = {}): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return { x: springX, y: springY };
}
