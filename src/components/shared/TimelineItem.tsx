"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { fadeUp } from "@/animations/variants";
import type { ExperienceEntry } from "@/data/experience";
import { cn } from "@/lib/utils";

export function TimelineItem({
  entry,
  isLast,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Rail */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
            entry.current
              ? "border-cyan bg-cyan shadow-[0_0_12px_2px_var(--color-cyan)]"
              : "border-purple bg-bg"
          )}
        >
          {entry.current && (
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-cyan/60" />
          )}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-white/10" />}
      </div>

      {/* Content */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        onMouseEnter={() => setIsOpen(true)}
        data-cursor-hover
        className="gradient-border flex-1 rounded-2xl bg-white/[0.02] p-6 text-left transition-colors hover:bg-white/[0.04]"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              {entry.period}
              {entry.current && (
                <span className="ml-2 rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] text-cyan">
                  Current
                </span>
              )}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-white">{entry.role}</h3>
            <p className="text-sm text-white/45">{entry.company}</p>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1 text-white/40"
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/55">{entry.summary}</p>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                {entry.highlights.map((point, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-white/50">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gradient-to-r from-purple to-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
