"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type BlipType = "hover" | "click" | "open" | "close" | "unlock";

const BLIP_PRESETS: Record<BlipType, { freq: number; duration: number; type: OscillatorType }> = {
  hover: { freq: 720, duration: 0.03, type: "sine" },
  click: { freq: 480, duration: 0.05, type: "square" },
  open: { freq: 560, duration: 0.08, type: "triangle" },
  close: { freq: 340, duration: 0.06, type: "triangle" },
  unlock: { freq: 660, duration: 0.14, type: "sine" },
};

const STORAGE_KEY = "portfolio-sound-enabled";

/**
 * Tiny retro-game "blip" sound engine synthesized with the Web Audio API —
 * no audio files needed. Respects a persisted user toggle.
 */
export function useSoundEffects() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setEnabled(stored === "true");
  }, []);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (type: BlipType) => {
      if (!enabled) return;
      const ctx = getContext();
      const preset = BLIP_PRESETS[type];

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = preset.type;
      oscillator.frequency.setValueAtTime(preset.freq, ctx.currentTime);
      if (type === "unlock") {
        oscillator.frequency.exponentialRampToValueAtTime(
          preset.freq * 1.5,
          ctx.currentTime + preset.duration
        );
      }

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + preset.duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + preset.duration);
    },
    [enabled, getContext]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      if (next) getContext();
      return next;
    });
  }, [getContext]);

  return { enabled, toggle, play };
}
