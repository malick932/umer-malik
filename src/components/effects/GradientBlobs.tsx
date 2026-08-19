"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect } from "react";

interface Blob {
  className: string;
  color: string;
  parallax: number;
  animationClass: string;
}

const blobs: Blob[] = [
  {
    className: "left-[-10%] top-[-10%] h-[520px] w-[520px]",
    color: "var(--color-purple)",
    parallax: 24,
    animationClass: "animate-blob-float-slow",
  },
  {
    className: "right-[-8%] top-[10%] h-[460px] w-[460px]",
    color: "var(--color-blue)",
    parallax: -18,
    animationClass: "animate-blob-float-medium",
  },
  {
    className: "left-[20%] bottom-[-15%] h-[480px] w-[480px]",
    color: "var(--color-cyan)",
    parallax: 14,
    animationClass: "animate-blob-float-fast",
  },
];

/** Layered, slowly-morphing gradient blobs with subtle cursor parallax. */
export function GradientBlobs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {blobs.map((blob, i) => (
        <BlobItem key={i} blob={blob} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

function BlobItem({
  blob,
  sx,
  sy,
}: {
  blob: Blob;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useTransform(sx, (v) => v * blob.parallax);
  const y = useTransform(sy, (v) => v * blob.parallax);

  return (
    <motion.div style={{ x, y }} className={`absolute ${blob.className}`}>
      <div
        className={`h-full w-full rounded-full opacity-40 blur-[110px] ${blob.animationClass}`}
        style={{ background: blob.color }}
      />
    </motion.div>
  );
}
