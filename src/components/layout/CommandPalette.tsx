"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Briefcase,
  Download,
  FileText,
  Gamepad2,
  Home,
  Mail,
  MessageSquare,
  Search,
  Sparkles,
  User,
  Volume2,
  VolumeX,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SiBehance } from "react-icons/si";
import type { IconType } from "react-icons";
import { useSound } from "@/components/layout/SoundProvider";
import { useScrollLock } from "@/hooks/useScrollLock";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon | IconType;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { play, enabled, toggle } = useSound();

  const goTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const commands: Command[] = useMemo(
    () => [
      { id: "hero", label: "Home", hint: "Jump to top", icon: Home, action: goTo("hero") },
      { id: "about", label: "About", hint: "Jump to section", icon: User, action: goTo("about") },
      { id: "skills", label: "Skills", hint: "Jump to section", icon: Wrench, action: goTo("skills") },
      {
        id: "projects",
        label: "Projects",
        hint: "Jump to section",
        icon: Gamepad2,
        action: goTo("projects"),
      },
      {
        id: "experience",
        label: "Experience",
        hint: "Jump to section",
        icon: Briefcase,
        action: goTo("experience"),
      },
      {
        id: "testimonials",
        label: "Testimonials",
        hint: "Jump to section",
        icon: MessageSquare,
        action: goTo("testimonials"),
      },
      {
        id: "certifications",
        label: "Certifications",
        hint: "Jump to section",
        icon: Award,
        action: goTo("certifications"),
      },
      {
        id: "resume-section",
        label: "Resume",
        hint: "Jump to section",
        icon: FileText,
        action: goTo("resume"),
      },
      { id: "contact", label: "Contact", hint: "Jump to section", icon: Mail, action: goTo("contact") },
      {
        id: "download-resume",
        label: "Download Resume",
        hint: "Opens PDF",
        icon: Download,
        action: () => window.open(siteConfig.resumeUrl, "_blank"),
      },
      {
        id: "email",
        label: "Send an Email",
        hint: siteConfig.email,
        icon: Mail,
        action: () => window.open(siteConfig.social.email, "_blank"),
      },
      {
        id: "behance",
        label: "View Behance",
        hint: "Opens in new tab",
        icon: SiBehance,
        action: () => window.open(siteConfig.social.behance, "_blank"),
      },
      {
        id: "sound",
        label: enabled ? "Disable Sound Effects" : "Enable Sound Effects",
        hint: "Toggle UI blips",
        icon: enabled ? Volume2 : VolumeX,
        action: () => toggle(),
      },
    ],
    [enabled, toggle]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const close = () => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
    play("close");
  };

  const runCommand = (command: Command) => {
    command.action();
    play("unlock");
    close();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isToggleCombo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isToggleCombo) {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          play(next ? "open" : "close");
          if (!next) {
            setQuery("");
            setActiveIndex(0);
          }
          return next;
        });
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const command = filtered[activeIndex];
        if (command) runCommand(command);
      }
    };

    const handleExternalOpen = () => {
      setIsOpen(true);
      play("open");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleExternalOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleExternalOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filtered, activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-bg/80 px-4 pt-[12vh] backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="gradient-border relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface shadow-2xl"
          >
            {/* HUD corner accents */}
            <span
              aria-hidden
              className="absolute -left-px -top-px h-4 w-4 rounded-tl-2xl border-l-2 border-t-2 border-cyan/60"
            />
            <span
              aria-hidden
              className="absolute -right-px -top-px h-4 w-4 rounded-tr-2xl border-r-2 border-t-2 border-purple/60"
            />

            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search size={16} className="shrink-0 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
              <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/30">
                <Sparkles size={11} className="text-cyan" />
                Menu
              </span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-white/35">No matches found.</p>
              ) : (
                filtered.map((command, i) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => runCommand(command)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      i === activeIndex ? "bg-white/[0.07] text-white" : "text-white/60"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                        i === activeIndex
                          ? "border-cyan/40 bg-cyan/10 text-cyan"
                          : "border-white/10 bg-white/[0.02] text-white/50"
                      )}
                    >
                      <command.icon size={14} />
                    </span>
                    <span className="flex-1">{command.label}</span>
                    <span className="font-mono text-[11px] text-white/30">{command.hint}</span>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
