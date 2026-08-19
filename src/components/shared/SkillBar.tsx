"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SkillBarProps {
  name: string;
  level: number;
}

/** A game-HUD-style segmented XP bar that fills in once it scrolls into view. */
export function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="font-mono text-xs text-cyan/70">LV {Math.round(level / 10)}</span>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full rounded-full bg-gradient-to-r from-purple via-blue to-cyan shadow-[0_0_10px_-1px_var(--color-cyan)]"
        >
          {/* Segment ticks, like a retro health/XP bar */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(5,5,5,0.55) 6px, rgba(5,5,5,0.55) 8px)",
            }}
          />
          {/* Leading-edge glow */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.8)]"
          />
        </motion.div>
      </div>
    </div>
  );
}
