"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Fixed top progress bar reflecting page scroll position. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-purple via-blue to-cyan"
      style={{ scaleX }}
    />
  );
}
