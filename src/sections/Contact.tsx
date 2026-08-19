"use client";

import { motion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import { SiBehance, SiWhatsapp } from "react-icons/si";
import type { IconType } from "react-icons";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { LinkedInBadge } from "@/components/shared/LinkedInBadge";
import { ContactForm } from "@/components/contact/ContactForm";
import { fadeUp, staggerContainer, staggerItem } from "@/animations/variants";
import { siteConfig } from "@/data/site";

const socialLinks: {
  label: string;
  href: string;
  icon?: IconType;
  custom?: boolean;
  color: string;
}[] = [
  { label: "Email", href: siteConfig.social.email, icon: Mail, color: "text-white/70" },
  { label: "WhatsApp", href: siteConfig.social.whatsapp, icon: SiWhatsapp, color: "text-[#25D366]" },
  { label: "LinkedIn", href: siteConfig.social.linkedin, custom: true, color: "" },
  { label: "Behance", href: siteConfig.social.behance, icon: SiBehance, color: "text-[#1769FF]" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-purple/10 blur-[150px]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          highlight="something great"
          description="Have a game to build, or an idea to sanity-check? Reach out — I usually reply within a day."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="gradient-border rounded-3xl bg-white/[0.02] p-6 sm:p-8"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <motion.div
              variants={staggerItem}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_2px_var(--color-cyan)]" />
              Available for new projects
            </motion.div>

            <motion.a
              variants={staggerItem}
              href={siteConfig.social.email}
              data-cursor-hover
              className="gradient-border flex items-center gap-3 rounded-2xl bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple/20 to-cyan/20 text-cyan">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-xs text-white/40">Email</p>
                <p className="text-sm text-white">{siteConfig.email}</p>
              </div>
            </motion.a>

            <motion.div
              variants={staggerItem}
              className="gradient-border flex items-center gap-3 rounded-2xl bg-white/[0.02] p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple/20 to-cyan/20 text-cyan">
                <MapPin size={16} />
              </span>
              <div>
                <p className="text-xs text-white/40">Location</p>
                <p className="text-sm text-white">{siteConfig.location}</p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/35">
                Find me elsewhere
              </span>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    title={link.label}
                    data-cursor-hover
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    {link.custom ? (
                      <LinkedInBadge size={16} />
                    ) : (
                      link.icon && <link.icon size={16} className={link.color} />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
