"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Award, Eye, ShieldCheck } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import { staggerItem } from "@/animations/variants";
import type { Certification } from "@/data/certifications";

export function CertificationCard({
  certification,
  onPreview,
}: {
  certification: Certification;
  onPreview: () => void;
}) {
  return (
    <motion.div variants={staggerItem}>
      <TiltCard maxTilt={6} className="h-full">
        <div className="gradient-border group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.02]">
          <button
            type="button"
            onClick={onPreview}
            data-cursor-hover
            className="relative aspect-[3/2] w-full overflow-hidden bg-white"
          >
            <Image
              src={certification.image}
              alt={certification.title}
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-bg/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                <Eye size={15} />
                Preview
              </span>
            </div>
          </button>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple/20 to-cyan/20 text-cyan">
                <Award size={16} />
              </span>
              <div>
                <h3 className="text-sm font-semibold leading-tight text-white">
                  {certification.title}
                </h3>
                <p className="mt-1 text-xs text-white/40">{certification.issuer}</p>
              </div>
            </div>

            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/35">
              {certification.period}
            </p>

            <a
              href={certification.verifyHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 pt-4 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <ShieldCheck size={13} />
              Verify
            </a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
