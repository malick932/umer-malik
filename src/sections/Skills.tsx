"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Glasses,
  Network,
  Package,
  Server,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SiBlender, SiFigma, SiFirebase, SiNodedotjs } from "react-icons/si";
import type { IconType } from "react-icons";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SkillBar } from "@/components/shared/SkillBar";
import { TiltCard } from "@/components/shared/TiltCard";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { bonusSkills, coreSkills, skillCategories } from "@/data/skills";

const skillIcons: Record<string, LucideIcon | IconType> = {
  network: Network,
  cloud: Cloud,
  server: Server,
  zap: Zap,
  package: Package,
  glasses: Glasses,
  "trending-up": TrendingUp,
  firebase: SiFirebase,
  figma: SiFigma,
  blender: SiBlender,
  nodejs: SiNodedotjs,
  vscode: Code2,
};

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[130px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit behind every build"
          highlight="every build"
          description="Core engineering strengths refined over 3+ years shipping mobile, PC, and WebGL titles — plus the systems and backends that make them run."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="gradient-border flex flex-col gap-6 rounded-3xl bg-white/[0.02] p-8"
          >
            {coreSkills.map((skill) => (
              <motion.div key={skill.name} variants={staggerItem}>
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {skillCategories.map((category) => (
              <motion.div key={category.title} variants={staggerItem}>
                <TiltCard
                  maxTilt={6}
                  className="gradient-border h-full rounded-2xl bg-white/[0.03] p-6 backdrop-blur-sm"
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                    {category.title}
                  </h3>
                  <div className="mt-5 flex flex-col gap-3">
                    {category.skills.map((skill) => {
                      const Icon = skillIcons[skill.icon];
                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-3 text-sm text-white/75"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan">
                            <Icon size={15} />
                          </span>
                          {skill.name}
                        </div>
                      );
                    })}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-4 border-t border-white/10 pt-10 text-center"
        >
          <motion.span
            variants={staggerItem}
            className="font-mono text-xs uppercase tracking-[0.25em] text-white/35"
          >
            {bonusSkills.label}
          </motion.span>
          <motion.p variants={staggerItem} className="text-sm text-white/45">
            {bonusSkills.description}
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-3">
            {bonusSkills.skills.map((skill) => {
              const Icon = skillIcons[skill.icon];
              return (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Icon size={14} />
                  {skill.name}
                </span>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
