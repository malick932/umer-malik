"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  download?: boolean;
  target?: string;
  rel?: string;
}

/** A button/link that subtly follows the cursor within its bounds, snapping back on leave. */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35,
  download,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
      data-cursor-hover
    >
      <Comp
        href={href}
        onClick={onClick}
        download={download}
        target={target}
        rel={rel}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium transition-colors",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
