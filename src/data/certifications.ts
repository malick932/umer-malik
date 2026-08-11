export interface Certification {
  id: string;
  title: string;
  issuer: string;
  period: string;
  image: string;
  /** Full-resolution file opened by the Verify button — the signed document itself. */
  verifyHref: string;
}

export const certifications: Certification[] = [
  {
    id: "internship",
    title: "Certificate of Internship",
    issuer: "GameNock",
    period: "Jul 2022 – Sep 2022",
    image: "/images/certifications/internship.png",
    verifyHref: "/images/certifications/internship.png",
  },
  {
    id: "achievement",
    title: "Certificate of Achievement — 1 Year",
    issuer: "GameNock",
    period: "Recognized after 1 year of service",
    image: "/images/certifications/achievement.png",
    verifyHref: "/images/certifications/achievement.png",
  },
  {
    id: "experience-letter",
    title: "Experience Letter",
    issuer: "GameNock",
    period: "Dec 2023 – Jul 2026",
    image: "/images/certifications/experience-letter.png",
    verifyHref: "/certificates/experience-letter.pdf",
  },
];
