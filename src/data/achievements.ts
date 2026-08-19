export interface Achievement {
  sectionId: string;
  title: string;
  description: string;
}

/** Section ids intentionally exclude "hero" — that's the starting point, not an unlock. */
export const achievements: Achievement[] = [
  { sectionId: "about", title: "Profile Unlocked", description: "You met the developer." },
  { sectionId: "skills", title: "Skill Tree Revealed", description: "Full loadout inspected." },
  { sectionId: "projects", title: "Project Vault Opened", description: "10 shipped titles found." },
  { sectionId: "experience", title: "Journey Mapped", description: "Career timeline explored." },
  {
    sectionId: "testimonials",
    title: "Reputation Verified",
    description: "Client feedback confirmed.",
  },
  {
    sectionId: "certifications",
    title: "Achievements Collected",
    description: "Credentials on record.",
  },
  { sectionId: "resume", title: "Full Stats Revealed", description: "Complete build sheet found." },
  { sectionId: "contact", title: "Connection Established", description: "Ready to team up." },
];
