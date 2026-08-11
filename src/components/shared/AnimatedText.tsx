"use client";

import { motion } from "framer-motion";
import { charContainer, charItem } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

/** Reveals text word-by-word with a clipped upward slide, staggered on mount. */
export function AnimatedText({
  text,
  className,
  as = "span",
  delay = 0,
  stagger = 0.06,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Comp = motion[as];

  return (
    <Comp
      className={cn("inline-flex flex-wrap", className)}
      variants={charContainer(stagger, delay)}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-[0.1em]">
          <motion.span className="inline-block" variants={charItem}>
            {word}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
