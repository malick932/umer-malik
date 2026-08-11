export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  source: "direct" | "upwork";
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "sabieh-f",
    quote:
      "Umer Malik did an excellent job developing my Unity game from start to finish. He clearly understood the requirements, suggested smart improvements, and delivered everything with solid performance and clean implementation. His Unity skills, especially in gameplay mechanics and optimization, really stood out. Communication was smooth throughout the project, and he was always responsive to feedback and quick with fixes. I'd definitely recommend Umer to anyone looking for a reliable Unity game developer who knows what he's doing and delivers quality work on time.",
    author: "Sabieh F.",
    role: "Verified Client",
    source: "direct",
    rating: 5,
    date: "Jan 2026",
  },
  {
    id: "upwork-csharp-scripter",
    quote:
      "Rockstar C# scripter with expert level knowledge of the timing of more intricate details that make a game good. Will hire again most definitely!",
    author: "Verified Upwork Client",
    role: "C# Scripter — Unity Game Development",
    source: "upwork",
    rating: 5,
    date: "Jan 2026",
  },
  {
    id: "upwork-rocket-space",
    quote:
      "Thanks to Malik and GameNock Agency for his developer skills! It was a fruitful collaboration, full of excitement and cool projects. The team did a great job with tasks on various topics, always handled revisions well, and helped find logical solutions to any challenges in the project. Thank you for your work, speed, and responsible approach!",
    author: "Verified Upwork Client",
    role: "Rocket Space — Unity/Flutter Mobile App",
    source: "upwork",
    rating: 5,
    date: "Aug – Dec 2025",
  },
];
