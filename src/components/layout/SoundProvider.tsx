"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

type SoundContextValue = ReturnType<typeof useSoundEffects>;

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSoundEffects();
  const { enabled, play } = sound;

  // Global delegated hover/click blips for anything marked interactive,
  // instead of wiring sound calls into every button individually.
  useEffect(() => {
    if (!enabled) return;

    const closestInteractive = (target: EventTarget | null) =>
      target instanceof Element ? target.closest("a, button, [data-cursor-hover]") : null;

    const handleOver = (e: MouseEvent) => {
      const el = closestInteractive(e.target);
      if (!el) return;
      // mouseover re-fires when moving between child nodes of the same
      // interactive element; only blip when actually entering a new one.
      if (el === closestInteractive(e.relatedTarget)) return;
      play("hover");
    };
    const handleDown = (e: MouseEvent) => {
      if (closestInteractive(e.target)) play("click");
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mousedown", handleDown);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mousedown", handleDown);
    };
  }, [enabled, play]);

  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}

/** Access the shared sound-effects engine. Safe to call outside SoundProvider (no-ops). */
export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return { enabled: false, toggle: () => {}, play: () => {} };
  }
  return ctx;
}
