"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useMousePosition } from "@/hooks/useMousePosition";

/** Custom dot + ring cursor that magnifies over interactive elements. Desktop only. */
export function InteractiveCursor() {
  const { x, y } = useMousePosition({ damping: 40, stiffness: 500 });
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    };
    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{ x, y }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
        animate={{
          width: isHovering ? 56 : 20,
          height: isHovering ? 56 : 20,
        }}
        transition={{ type: "spring", damping: 28, stiffness: 400 }}
      />
    </motion.div>
  );
}
