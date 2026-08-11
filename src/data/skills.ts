/** Core skills rendered as animated proficiency bars. */
export const coreSkills = [
  { name: "Unity", level: 95 },
  { name: "C#", level: 90 },
  { name: "2D/3D", level: 88 },
  { name: "Level Design", level: 85 },
  { name: "UI/UX", level: 82 },
  { name: "WebGL", level: 75 },
];

/** Supporting tech, grouped and shown as icon badges. */
export const skillCategories = [
  {
    title: "Multiplayer & Backend",
    skills: [
      { name: "Mirror Networking", icon: "network" },
      { name: "PlayFab", icon: "cloud" },
      { name: "Firebase", icon: "firebase" },
      { name: "REST APIs", icon: "server" },
    ],
  },
  {
    title: "Systems & Optimization",
    skills: [
      { name: "DOTween", icon: "zap" },
      { name: "Asset Bundles", icon: "package" },
      { name: "Optimization", icon: "trending-up" },
      { name: "AR/VR", icon: "glasses" },
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      { name: "Figma", icon: "figma" },
      { name: "Blender", icon: "blender" },
    ],
  },
] as const;

/** Called out separately: part-time web design/dev work, not core game dev. */
export const bonusSkills = {
  label: "Also Building for the Web",
  description: "Part-time web designer/developer on the side.",
  skills: [
    { name: "VS Code", icon: "vscode" },
    { name: "Node.js", icon: "nodejs" },
  ],
};
