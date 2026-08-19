"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAvailableSections } from "@/hooks/useAvailableSections";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const sectionIds = useMemo(() => navItems.map((item) => item.href.slice(1)), []);
  const activeId = useActiveSection(sectionIds);
  const availableSections = useAvailableSections(sectionIds);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          "mx-3 mt-3 rounded-2xl border transition-colors duration-500 md:mx-6 md:mt-4",
          isScrolled
            ? "border-white/10 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between px-4 md:px-6">
          <a
            href="#hero"
            data-cursor-hover
            className="font-mono text-lg font-semibold tracking-tight text-white"
          >
            UM<span className="text-purple">.</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeId === id;
              const isAvailable = availableSections.has(id);

              if (!isAvailable) {
                return (
                  <span
                    key={item.href}
                    title="Coming soon"
                    className="relative flex cursor-not-allowed items-center gap-1.5 px-4 py-2 text-sm font-medium text-white/25"
                  >
                    {item.label}
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                  </span>
                );
              }

              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor-hover
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-white/55 hover:text-white/90"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-purple via-blue to-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-cursor-hover
              className="hidden rounded-full bg-gradient-to-r from-purple via-blue to-cyan px-5 py-2 text-sm font-medium text-white shadow-[0_0_20px_-6px_var(--color-purple)] transition-transform hover:scale-105 sm:inline-flex"
            >
              Contact
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              data-cursor-hover
              onClick={() => setIsMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </Container>
      </motion.div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.12 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-3 mt-2 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const id = item.href.slice(1);
                const isAvailable = availableSections.has(id);

                if (!isAvailable) {
                  return (
                    <span
                      key={item.href}
                      className="flex cursor-not-allowed items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white/25"
                    >
                      {item.label}
                      <span className="text-xs font-normal uppercase tracking-wide text-white/20">
                        Soon
                      </span>
                    </span>
                  );
                }

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      activeId === id
                        ? "bg-white/5 text-white"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
