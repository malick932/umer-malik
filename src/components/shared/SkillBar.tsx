"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SkillBarProps {
  name: string;
  level: number;
}

/** A labeled proficiency bar that fills in once it scrolls into view. */
export function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="font-mono text-xs text-white/35">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-purple via-blue to-cyan"
        />
      </div>
    </div>
  );
}
