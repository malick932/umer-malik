export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "internship",
    role: "Unity Game Developer — Intern",
    company: "GameNock",
    period: "Jul 2022 – Sep 2022",
    summary: "Completed a compulsory Game Developer internship at GameNock, working hands-on with Unity as an entry point into professional game development.",
    highlights: [
      "Completed a structured internship track as a Game Developer using Unity.",
      "Gained first hands-on experience with professional Unity workflows and team-based development.",
      "Set up the transition into freelance game development work that followed.",
    ],
  },
  {
    id: "freelance-early",
    role: "Unity Game Developer",
    company: "Freelance — Game Projects",
    period: "2022 – 2023",
    summary: "Delivered freelance Unity game projects for independent clients while completing a Software Engineering degree.",
    highlights: [
      "Built gameplay systems and mechanics for client game projects in Unity.",
      "Managed end-to-end delivery on freelance engagements, from requirements to final build.",
      "Balanced client work alongside a full-time Software Engineering degree at SZABIST University.",
    ],
  },
  {
    id: "gamenock",
    role: "Unity Game Developer",
    company: "GameNock",
    period: "Dec 2023 – Jul 2026",
    summary: "Developed and shipped 2D and 3D Unity games across hyper-casual, puzzle, arcade, educational, and endless runner genres.",
    highlights: [
      "Implemented gameplay mechanics, core systems, and UI integration for smooth player interaction and consistent game flow.",
      "Integrated AdMob ads (banner, interstitial, rewarded) with proper placement, callbacks, and performance considerations.",
      "Implemented Firebase services — Authentication, Analytics, Remote Config, and Cloud Firestore — for live data and user tracking.",
      "Integrated PlayFab for player data management, progression, and backend services.",
      "Built and consumed REST APIs for dynamic game data, live configuration, and server-driven features.",
      "Designed JSON-based level generation systems for scalable, easily configurable content updates.",
      "Implemented asset bundling and external DLL integrations to optimize build size, modularity, and performance.",
      "Debugged and resolved complex gameplay, UI, and performance issues across Android and iOS platforms.",
    ],
  },
  {
    id: "freelance-current",
    role: "Unity Game Developer",
    company: "Freelance — Upwork",
    period: "Feb 2026 – Present",
    current: true,
    summary: "Providing freelance Unity development services on Upwork, delivering custom gameplay systems and full game builds for independent clients.",
    highlights: [
      "Delivering custom Unity gameplay systems and full builds for independent clients.",
      "Managing client relationships, scoping, and delivery directly through Upwork.",
    ],
  },
];
