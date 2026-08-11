"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import type { Certification } from "@/data/certifications";

export function CertificateLightbox({
  certification,
  onClose,
}: {
  certification: Certification | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!certification) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [certification, onClose]);

  return (
    <AnimatePresence>
      {certification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-cursor-hover
              className="glass absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white"
            >
              <X size={16} />
            </button>
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={certification.image}
                alt={certification.title}
                fill
                sizes="768px"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between border-t border-black/10 bg-white p-4">
              <div>
                <p className="text-sm font-semibold text-bg">{certification.title}</p>
                <p className="text-xs text-bg/50">
                  {certification.issuer} · {certification.period}
                </p>
              </div>
              <a
                href={certification.verifyHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2 text-xs font-medium text-white"
              >
                <ShieldCheck size={13} />
                Open Full Document
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
