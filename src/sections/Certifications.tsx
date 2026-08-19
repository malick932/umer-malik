"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CertificationCard } from "@/components/certifications/CertificationCard";
import { CertificateLightbox } from "@/components/certifications/CertificateLightbox";
import { staggerContainer } from "@/animations/variants";
import { certifications, type Certification } from "@/data/certifications";

export function Certifications() {
  const [preview, setPreview] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Certifications"
          title="Signed, dated, and on the record"
          highlight="on the record"
          description="Official documentation from GameNock, spanning internship through full-time tenure."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              onPreview={() => setPreview(cert)}
            />
          ))}
        </motion.div>
      </Container>

      <CertificateLightbox certification={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
