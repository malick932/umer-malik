"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { useSound } from "@/components/layout/SoundProvider";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();

  return (
    <motion.button
      type="button"
      onClick={() => {
        toggle();
        if (!enabled) setTimeout(() => play("click"), 60);
      }}
      onMouseEnter={() => play("hover")}
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={enabled}
      data-cursor-hover
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 0.5 }}
      className="glass fixed bottom-6 left-6 z-30 flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
    >
      {enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
    </motion.button>
  );
}
