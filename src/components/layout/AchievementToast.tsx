"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Trophy } from "lucide-react";
import { useSound } from "@/components/layout/SoundProvider";
import { achievements } from "@/data/achievements";

type AchievementItem = (typeof achievements)[number];

/** Fires a game-style "achievement unlocked" toast the first time each major section is scrolled into view. */
export function AchievementToast() {
  const [current, setCurrent] = useState<AchievementItem | null>(null);
  const queueRef = useRef<AchievementItem[]>([]);
  const unlockedRef = useRef<Set<string>>(new Set());
  const isShowingRef = useRef(false);
  const { play } = useSound();

  const showNext = () => {
    const next = queueRef.current.shift();
    if (!next) {
      isShowingRef.current = false;
      return;
    }
    isShowingRef.current = true;
    setCurrent(next);
    play("unlock");
  };

  useEffect(() => {
    const sections = achievements
      .map((a) => ({ achievement: a, el: document.getElementById(a.sectionId) }))
      .filter((s): s is { achievement: AchievementItem; el: HTMLElement } => !!s.el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = sections.find((s) => s.el === entry.target);
          if (!match || unlockedRef.current.has(match.achievement.sectionId)) return;

          unlockedRef.current.add(match.achievement.sectionId);
          queueRef.current.push(match.achievement);
          if (!isShowingRef.current) showNext();
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!current) return;
    const timeout = setTimeout(() => {
      setCurrent(null);
      setTimeout(showNext, 300);
    }, 3200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40">
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.sectionId}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-border flex items-center gap-3 rounded-2xl bg-surface/95 px-4 py-3 shadow-2xl backdrop-blur-xl"
          >
            <motion.span
              initial={{ rotate: -15, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.1 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple via-blue to-cyan text-white shadow-[0_0_16px_-2px_var(--color-purple)]"
            >
              <Trophy size={18} />
            </motion.span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                Achievement Unlocked
              </p>
              <p className="text-sm font-semibold text-white">{current.title}</p>
              <p className="text-xs text-white/40">{current.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
