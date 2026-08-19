"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Gamepad2, Monitor, PlayCircle, Smartphone, type LucideIcon } from "lucide-react";
import { SiAppstore, SiGoogleplay, SiSteam } from "react-icons/si";
import type { IconType } from "react-icons";
import { TiltCard } from "@/components/shared/TiltCard";
import type { Project } from "@/data/projects";
import { staggerItem } from "@/animations/variants";

const platformIcons: Record<string, LucideIcon> = {
  Android: Smartphone,
  iOS: Smartphone,
  Mobile: Smartphone,
  PC: Monitor,
};

const storeIcons: { key: keyof Project["links"]; icon: IconType; label: string }[] = [
  { key: "appStore", icon: SiAppstore, label: "App Store" },
  { key: "playStore", icon: SiGoogleplay, label: "Google Play" },
  { key: "steam", icon: SiSteam, label: "Steam" },
];

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const hasScreenshots = project.images.length > 0;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div variants={staggerItem}>
      <TiltCard maxTilt={5} className="h-full">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={handleKeyDown}
          data-cursor-hover
          className="gradient-border group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white/[0.02] text-left transition-colors hover:bg-white/[0.04]"
        >
          {/* HUD corner accents, revealed on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1.5 top-1.5 z-10 h-4 w-4 rounded-tl-lg border-l-2 border-t-2 border-cyan/0 transition-colors duration-300 group-hover:border-cyan/70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-1.5 right-1.5 z-10 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-purple/0 transition-colors duration-300 group-hover:border-purple/70"
          />

          {/* Visual */}
          <div className="relative aspect-[4/3] overflow-hidden bg-surface">
            {hasScreenshots ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : project.icon ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple/15 via-blue/10 to-cyan/15">
                <div
                  aria-hidden
                  className="absolute h-40 w-40 rounded-full bg-purple/20 blur-3xl"
                />
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={project.icon}
                    alt={project.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple/15 via-blue/10 to-cyan/15">
                <Gamepad2 size={40} className="text-white/25" />
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg/90 to-transparent" />

            {project.videos && project.videos.length > 0 && (
              <span
                title="Includes gameplay video"
                className="glass absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-cyan"
              >
                <PlayCircle size={14} />
              </span>
            )}

            {/* Platform badges */}
            <div className="absolute right-3 top-3 flex gap-1.5">
              {project.platforms.map((platform) => {
                const Icon = platformIcons[platform] ?? Gamepad2;
                return (
                  <span
                    key={platform}
                    title={platform}
                    className="glass flex h-7 w-7 items-center justify-center rounded-full text-white/80"
                  >
                    <Icon size={13} />
                  </span>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-white/45">{project.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-5">
              <span className="text-xs font-medium text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View Details →
              </span>
              <div className="flex gap-2">
                {storeIcons
                  .filter((s) => project.links[s.key])
                  .map((s) => (
                    <a
                      key={s.key}
                      href={project.links[s.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      onClick={(e) => e.stopPropagation()}
                      data-cursor-hover
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
                    >
                      <s.icon size={12} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
