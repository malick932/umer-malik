"use client";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TimelineItem } from "@/components/shared/TimelineItem";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-purple/10 blur-[130px]"
      />

      <Container className="relative max-w-3xl">
        <SectionHeading
          eyebrow="Experience"
          title="From first prototype to shipped titles"
          highlight="shipped titles"
          description="A timeline of how the work built up — hover or tap any entry for the full breakdown."
        />

        <div className="mt-16">
          {experience.map((entry, i) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
