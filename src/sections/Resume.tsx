"use client";

import { motion } from "motion/react";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { TiltCard } from "@/components/shared/TiltCard";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { aboutStats } from "@/data/about";
import { siteConfig } from "@/data/site";

export function Resume() {
  return (
    <section id="resume" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[150px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Resume"
          title="The full breakdown, one download away"
          highlight="one download away"
          description="Every role, every shipped title, every tool — laid out on paper."
        />

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
          <ResumePreviewCard />

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerItem} className="grid grid-cols-3 gap-4 sm:gap-6">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
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
                </div>
              ))}
            </motion.div>

            <motion.p variants={staggerItem} className="mt-8 leading-relaxed text-white/55">
              A single PDF covering the GameNock timeline, freelance work, the full shipped
              project list, and technical skill set — kept current with everything on this
              page.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton
                href={siteConfig.resumeUrl}
                download
                className="group border border-transparent bg-gradient-to-r from-purple via-blue to-cyan text-white shadow-[0_0_30px_-6px_var(--color-purple)]"
              >
                <Download
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Download Resume
              </MagneticButton>

              <MagneticButton
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 bg-white/[0.03] text-white backdrop-blur-sm hover:bg-white/[0.07]"
              >
                <ExternalLink size={16} />
                View in New Tab
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ResumePreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[340px]"
    >
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-purple/25 via-blue/15 to-cyan/25 opacity-60 blur-3xl"
      />

      <TiltCard maxTilt={10} className="relative">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f5f5f2] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* PDF badge */}
          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1 font-mono text-[10px] font-medium text-white">
            <FileText size={10} className="text-cyan" />
            PDF
          </span>

          <div className="flex h-full flex-col p-6">
            <div className="border-b border-black/10 pb-4">
              <div className="h-3 w-3/5 rounded-full bg-[#1a1a1a]" />
              <div className="mt-2 h-2 w-2/5 rounded-full bg-purple/50" />
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-black/10" />
              <div className="h-1.5 w-11/12 rounded-full bg-black/10" />
              <div className="h-1.5 w-4/5 rounded-full bg-black/10" />
            </div>

            {["Experience", "Projects", "Technical Skills"].map((section, i) => (
              <div key={section} className={i === 0 ? "mt-5" : "mt-4"}>
                <div className="h-1.5 w-1/3 rounded-full bg-cyan/60" />
                <div className="mt-2 space-y-1.5">
                  <div className="h-1 w-full rounded-full bg-black/[0.08]" />
                  <div className="h-1 w-5/6 rounded-full bg-black/[0.08]" />
                  {i === 0 && <div className="h-1 w-4/6 rounded-full bg-black/[0.08]" />}
                </div>
              </div>
            ))}

            <div className="mt-auto flex items-center gap-2 border-t border-black/10 pt-4">
              <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-purple via-blue to-cyan" />
              <div className="space-y-1">
                <div className="h-1 w-16 rounded-full bg-black/20" />
                <div className="h-1 w-10 rounded-full bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
