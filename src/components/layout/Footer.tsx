"use client";

import { ArrowUp } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-bg py-8">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          href="#hero"
          data-cursor-hover
          className="font-mono text-sm font-semibold tracking-tight text-white/70 transition-colors hover:text-white"
        >
          UM<span className="text-purple">.</span>
        </a>

        <p className="text-center text-xs text-white/35">
          © {year} {siteConfig.name}. All rights reserved.
        </p>

        <a
          href="#hero"
          data-cursor-hover
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
        >
          <ArrowUp size={15} />
        </a>
      </Container>
    </footer>
  );
}
