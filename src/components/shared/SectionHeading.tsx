"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Substring of `title` to render with the gradient accent treatment. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-white/50">
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
        {parts ? (
          <>
            {parts[0]}
            <span className="bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-transparent">
              {highlight}
            </span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-balance leading-relaxed text-white/50">
          {description}
        </p>
      )}
    </motion.div>
  );
}
