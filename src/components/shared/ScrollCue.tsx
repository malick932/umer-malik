"use client";

import { motion } from "motion/react";

export function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
        Scroll
      </span>
      <div className="flex h-9 w-6 justify-center rounded-full border border-white/20 p-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-purple to-cyan"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
