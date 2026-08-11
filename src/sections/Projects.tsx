"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { staggerContainer } from "@/animations/variants";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const filters = ["All", "Mobile", "PC"] as const;
type Filter = (typeof filters)[number];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "PC") return projects.filter((p) => p.platforms.includes("PC"));
    return projects.filter((p) => p.platforms.some((pl) => pl === "Android" || pl === "iOS" || pl === "Mobile"));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-blue/10 blur-[140px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Games players actually finish"
          highlight="actually finish"
          description={`${projects.length} shipped titles across mobile and PC — from arcade shooters to logic puzzles to a full Steam release.`}
        />

        <div className="mt-10 flex justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              data-cursor-hover
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeFilter === filter ? "text-white" : "text-white/45 hover:text-white/75"
              )}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="project-filter-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{filter}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={activeFilter}
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelected(project)}
            />
          ))}
        </motion.div>
      </Container>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
