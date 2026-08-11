"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Monitor, Smartphone, type LucideIcon } from "lucide-react";
import { SiUnity } from "react-icons/si";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { TiltCard } from "@/components/shared/TiltCard";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { aboutBio, aboutPlatforms, aboutStats } from "@/data/about";

const platformIcons: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  monitor: Monitor,
  globe: Globe,
};

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple/10 blur-[140px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="About Me"
          title="Building worlds, one frame at a time"
          highlight="one frame at a time"
          description="From concept to shipped product — here's the developer behind the code."
        />

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
          <PhotoCard />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              variants={staggerItem}
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Unity Game Developer
            </motion.h3>

            {aboutBio.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className="mt-4 leading-relaxed text-white/55"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              variants={staggerItem}
              className="mt-10 grid grid-cols-3 gap-4 sm:gap-6"
            >
              {aboutStats.map((stat) => (
                <TiltCard
                  key={stat.label}
                  maxTilt={6}
                  className="gradient-border rounded-2xl bg-white/[0.03] px-4 py-6 text-center backdrop-blur-sm"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="block bg-gradient-to-r from-purple via-blue to-cyan bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
                  />
                  <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
                    {stat.label}
                  </span>
                </TiltCard>
              ))}
            </motion.div>

            <motion.div variants={staggerItem} className="mt-10">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                Platforms
              </span>
              <div className="mt-4 flex flex-wrap gap-3">
                {aboutPlatforms.map((platform) => {
                  const Icon = platformIcons[platform.icon];
                  return (
                    <span
                      key={platform.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
                    >
                      <Icon size={15} className="text-cyan" />
                      {platform.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function PhotoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[380px]"
    >
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-purple/30 via-blue/20 to-cyan/30 opacity-60 blur-2xl"
      />

      <TiltCard maxTilt={8} className="relative">
        {/* Rotating conic-gradient frame */}
        <div
          aria-hidden
          className="animate-spin-slow absolute -inset-[3px] rounded-[1.85rem] opacity-80"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-purple), var(--color-blue), var(--color-cyan), var(--color-purple))",
          }}
        />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface">
          <Image
            src="/images/umer-portrait.png"
            alt="Umer Malik, Unity Game Developer"
            fill
            priority
            sizes="(min-width: 1024px) 380px, 80vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />

          {/* Reveal curtain: wipes away on scroll-into-view */}
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-purple via-blue to-cyan"
          />
        </div>

        {/* HUD-style corner brackets */}
        <span
          aria-hidden
          className="absolute -left-2.5 -top-2.5 h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-cyan/80"
        />
        <span
          aria-hidden
          className="absolute -right-2.5 -bottom-2.5 h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-purple/80"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 shadow-lg"
        >
          <SiUnity size={16} className="text-white" />
          <span className="text-sm font-medium text-white">Unity Developer</span>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
