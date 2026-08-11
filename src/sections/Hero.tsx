"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { Container } from "@/components/shared/Container";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { GradientBlobs } from "@/components/effects/GradientBlobs";
import { GridOverlay } from "@/components/effects/GridOverlay";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { HeroCanvas } from "@/components/effects/HeroCanvas";
import { useTypewriter } from "@/hooks/useTypewriter";
import { heroRoles, siteConfig } from "@/data/site";
import { fadeUp, staggerContainer, staggerItem } from "@/animations/variants";

export function Hero() {
  const typedRole = useTypewriter({ words: heroRoles });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg pt-24"
    >
      <div className="absolute inset-0">
        <GradientBlobs />
        <HeroCanvas />
        <GridOverlay />
        <NoiseOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={staggerItem}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-white/60 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_var(--color-cyan)]" />
            Available for new projects
          </motion.span>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            <AnimatedText text={`Hi, I'm ${siteConfig.name}`} as="span" delay={0.2} />
          </h1>

          <motion.p
            variants={staggerItem}
            className="mt-5 bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-2xl font-medium text-transparent sm:text-3xl md:text-4xl"
          >
            {siteConfig.role}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-6 flex h-8 items-center font-mono text-lg text-white/70 sm:text-xl"
          >
            <span className="mr-2 text-white/40">Building</span>
            <span className="text-white">{typedRole}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="ml-1 inline-block h-6 w-[2px] bg-cyan"
            />
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/50 sm:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton
              href="#projects"
              className="group border border-transparent bg-gradient-to-r from-purple via-blue to-cyan text-white shadow-[0_0_30px_-6px_var(--color-purple)]"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </MagneticButton>

            <MagneticButton
              href={siteConfig.resumeUrl}
              download
              className="border border-white/15 bg-white/[0.03] text-white backdrop-blur-sm hover:bg-white/[0.07]"
            >
              <Download size={16} />
              Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/35"
          >
            {["Unity", "C#", "Multiplayer", "AR / VR", "Mobile & PC"].map((tag) => (
              <span key={tag} className="font-mono text-xs uppercase tracking-[0.2em]">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <ScrollCue />
    </section>
  );
}
