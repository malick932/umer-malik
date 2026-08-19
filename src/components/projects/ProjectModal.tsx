"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Monitor, Smartphone, X, type LucideIcon } from "lucide-react";
import { SiAppstore, SiGoogleplay, SiSteam } from "react-icons/si";
import type { IconType } from "react-icons";
import type { Project } from "@/data/projects";

const platformIcons: Record<string, LucideIcon> = {
  Android: Smartphone,
  iOS: Smartphone,
  Mobile: Smartphone,
  PC: Monitor,
};

const storeLinks: { key: keyof Project["links"]; icon: IconType; label: string }[] = [
  { key: "appStore", icon: SiAppstore, label: "App Store" },
  { key: "playStore", icon: SiGoogleplay, label: "Google Play" },
  { key: "steam", icon: SiSteam, label: "Steam" },
];

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="gradient-border relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-surface"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-cursor-hover
              className="glass absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white"
            >
              <X size={16} />
            </button>

            {/* Visual header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
              {project.images.length > 0 ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  sizes="672px"
                  className="object-cover"
                />
              ) : project.icon ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple/15 via-blue/10 to-cyan/15">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                    <Image
                      src={project.icon}
                      alt={project.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {project.platforms.map((platform) => {
                  const Icon = platformIcons[platform];
                  return (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60"
                    >
                      {Icon && <Icon size={12} />}
                      {platform}
                    </span>
                  );
                })}
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-white/45">{project.tagline}</p>

              <p className="mt-5 leading-relaxed text-white/60">{project.description}</p>

              <div className="mt-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Genre & Tags
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Built With
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-gradient-to-r from-purple/10 via-blue/10 to-cyan/10 px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {storeLinks
                  .filter((s) => project.links[s.key])
                  .map((s) => (
                    <a
                      key={s.key}
                      href={project.links[s.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple via-blue to-cyan px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
                    >
                      <s.icon size={14} />
                      {s.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
