export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  platforms: string[];
  tags: string[];
  technologies: string[];
  links: {
    appStore?: string;
    playStore?: string;
    steam?: string;
    web?: string;
    github?: string;
  };
  /** Square app icon, under /public. Used as the card's visual when no screenshots exist. */
  icon?: string;
  /** Real gameplay screenshots/header art, under /public. Takes priority over `icon` when present. */
  images: string[];
  /** Gameplay video clips, under /public. Shown in the modal; also flags a video badge on the card. */
  videos?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "gamisodes",
    title: "Gamisodes",
    tagline: "Interactive, Playable Shows",
    description:
      "Interactive cartoon episodes featuring iconic characters like Inspector Gadget and Baby Einstein, blending story-driven watching with playable mini-games. Built and implemented multiple 2D and 3D mini-games across Story, Battle, and Classic Race modes for a continuously updated content platform aimed at all ages.",
    platforms: ["Android", "iOS"],
    tags: ["2D", "3D", "Interactive Fiction", "Mini-Games"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/pk/app/gamisodes/id6691440023",
      playStore: "https://play.google.com/store/apps/details?id=com.Gamisodes",
    },
    icon: "/images/projects/gamisodes/icon.jpg",
    images: [],
    featured: true,
  },
  {
    id: "organizer-pro",
    title: "Organizer Pro",
    tagline: "A satisfying 3D decluttering sim",
    description:
      "A casual decluttering and organizational game with over 15,000 objects to organize. No rules or time limits — just pure arranging and satisfying before-and-after transformations, with roughly 30 hours of playtime across 30 levels.",
    platforms: ["PC"],
    tags: ["3D", "Casual", "Simulation", "Puzzle", "Relaxing"],
    technologies: ["Unity", "C#"],
    links: {
      steam: "https://store.steampowered.com/app/4378250/Organizer_Pro/",
    },
    icon: "/images/projects/organizer-pro/logo.png",
    images: [
      "/images/projects/organizer-pro/header.jpg",
      "/images/projects/organizer-pro/screenshot-1.jpg",
    ],
    featured: true,
  },
  {
    id: "crawl-out-worm-escape",
    title: "Crawl Out: Worm Escape",
    tagline: "Caterpillar Escape",
    description:
      "A brain-puzzle escape game where you guide cute caterpillars through tricky, maze-like paths into their safe holes. Features addictive levels, smooth controls, creative obstacles, and full offline play — designed as simple but satisfying entertainment for all ages.",
    platforms: ["Android", "iOS"],
    tags: ["2D", "Puzzle", "Maze", "Casual"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/crawl-out-worm-escape/id6755949481",
      playStore:
        "https://play.google.com/store/apps/details?id=com.gamenock.crawlout.escape.puzzle.slither",
    },
    icon: "/images/projects/crawl-out-worm-escape/icon.jpg",
    images: [],
  },
  {
    id: "horse-escape",
    title: "Horse Escape: Running Game",
    tagline: "Run, Collect and Escape",
    description:
      "A fast-paced 3D endless runner where you dash on horseback to outrun a relentless chaser — jumping fences, sliding under barriers, and dodging rocks, logs, and traps at full speed. Collect coins to unlock new horse skins and upgrade power-ups, and climb the global leaderboard as the ultimate runner champion.",
    platforms: ["Android", "iOS"],
    tags: ["3D", "Endless Runner", "Action", "Casual"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/horse-escape-running-game/id6532622401",
      playStore: "https://play.google.com/store/apps/details?id=com.W1ldCraft11Anima111",
    },
    icon: "/images/projects/horse-escape/icon.jpg",
    images: [],
  },
  {
    id: "space-shooter-alien-invasion",
    title: "Space Shooter: Alien Invasion",
    tagline: "Galaxy Attack, Alien Invaders",
    description:
      "A fast-paced 2D arcade space shooter with over 50 levels of asteroid storms, alien waves, and boss battles. Full solo development cycle — gameplay mechanics, enemy systems, shooting logic, power-ups, and level progression — with smooth controls, offline play, and leaderboards, optimized to run well across Android devices.",
    platforms: ["Android", "iOS"],
    tags: ["2D", "Arcade", "Shooter", "Action"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/alien-invasion-space-shooter/id6479807709",
      playStore:
        "https://play.google.com/store/apps/details?id=com.gamenock.alieninvasion.spaceshipshooter.galaxywar",
    },
    icon: "/images/projects/space-shooter-alien-invasion/icon.jpg",
    images: [],
  },
  {
    id: "bank-heist-robbery-escape",
    title: "Bank Heist: Robbery Escape",
    tagline: "Stealth Crime Simulator Game",
    description:
      "A stealth heist game where you play a sly fox sneaking through high-security bank floors, dodging patrolling guards with real-time vision AI, and looting hidden treasures without getting caught. Uses hiding spots and timing-based strategy across levels that ramp up in difficulty.",
    platforms: ["Mobile"],
    tags: ["3D", "Stealth", "Action", "Adventure"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/bank-heist-robbery-escape/id6746856663",
    },
    icon: "/images/projects/bank-heist-robbery-escape/icon.jpg",
    images: [],
  },
  {
    id: "alien-fall-landing-on-mars",
    title: "Alien Fall: Landing On Mars",
    tagline: "One-tap descent, safe landing",
    description:
      "A hyper-casual descent game with simple one-tap mechanics — guide a cute alien down toward Mars using an umbrella to manage fall speed and stick the landing. Smooth physics and responsive controls across visually appealing Mars environments, with progressively challenging levels and high offline replay value.",
    platforms: ["Android"],
    tags: ["2D", "Hyper-Casual", "Arcade"],
    technologies: ["Unity", "C#"],
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.gamenock.AlienFall.SpaceGame.Landing.Earth",
    },
    icon: "/images/projects/alien-fall-landing-on-mars/icon.png",
    images: [],
  },
  {
    id: "color-arrow-dodge",
    title: "Color Arrow Dodge",
    tagline: "Escape the colors, follow the arrows, and solve the puzzle!",
    description:
      "A colorful brain puzzle where you clear the board by removing arrows in the correct order — every arrow follows its own direction, and one wrong tap jams the flow. Hundreds of levels that test logic, planning, and timing, wrapped in vibrant colors and smooth animations.",
    platforms: ["Android", "iOS"],
    tags: ["2D", "Puzzle", "Logic"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/color-arrow-dodge/id6758392154",
      playStore: "https://play.google.com/store/apps/details?id=com.GameNock.ArrowDodge",
    },
    icon: "/images/projects/color-arrow-dodge/icon.jpg",
    images: [],
  },
  {
    id: "bunny-has-a-bomb",
    title: "Bunny has a Bomb: Race Rush",
    tagline: "Race, Rush, Adventures, Bomb",
    description:
      "A chaotic cartoon kart racer where four animal characters — Bunny, Puppy, Teddy Bear, and Fox — pass a ticking bomb between them mid-race to avoid being eliminated. Features dynamic arenas, unique per-character karts and animations, unlockable skins, and a global leaderboard, all wrapped in a cartoon 3D style.",
    platforms: ["Android", "iOS"],
    tags: ["3D", "Racing", "Party", "Casual"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/bunny-has-a-bomb-race-rush/id6745409902",
      playStore:
        "https://play.google.com/store/apps/details?id=com.gamenock.bunnyhasthebomb.racinggame.kartgame.driftgame",
    },
    icon: "/images/projects/bunny-has-a-bomb/icon.jpg",
    images: [],
    featured: true,
  },
  {
    id: "luna-escape",
    title: "Luna Escape: Logic Puzzle",
    tagline: "Where logic meets creativity",
    description:
      "A minimalist logic-puzzle game where you guide Luna through directional grid mazes using arrow-based paths and block layouts. Swipe to plan each route, clear the jam, and progress through levels that grow steadily in depth and complexity, with a clean, polished design built for short sessions or long play alike.",
    platforms: ["Android", "iOS"],
    tags: ["2D", "Puzzle", "Logic", "Maze"],
    technologies: ["Unity", "C#"],
    links: {
      appStore: "https://apps.apple.com/in/app/luna-escape-logic-puzzle/id6745811028",
      playStore:
        "https://play.google.com/store/apps/details?id=com.gamenock.lunaescape.logicpuzzle",
    },
    icon: "/images/projects/luna-escape/icon.jpg",
    images: [],
  },
  {
    id: "bike-rush",
    title: "Bike Rush",
    tagline: "Pick up, deliver, don't stop",
    description:
      "A 3D endless bike runner built on a pooled path system for a scalable, performance-optimized environment. Tap for forward motion, drag to steer left and right, and complete the core loop of picking up an object — an egg — and delivering it to a target point. Focused on responsive input handling, performance optimization, and scalable endless-level design.",
    platforms: ["Mobile"],
    tags: ["3D", "Endless Runner", "Casual"],
    technologies: ["Unity", "C#"],
    links: {},
    icon: "/images/projects/bike-rush/icon.png",
    images: [],
    videos: ["/videos/projects/bike-rush/gameplay.mp4"],
  },
  {
    id: "flying-birds",
    title: "Flying Birds",
    tagline: "Fly, dodge, survive",
    description:
      "A 2D endless flying game featuring multiple playable bird characters — parrot, lovebird, pigeon, and blue parrot — controlled through three selectable input schemes: joystick, invisible joystick, or left/right buttons. Dodge dynamic obstacles like predatory eagles while collecting shields and point-boosting power-ups. Built around responsive controls, endless level design, and replayable mechanics.",
    platforms: ["Mobile"],
    tags: ["2D", "Endless Runner", "Arcade", "Casual"],
    technologies: ["Unity", "C#"],
    links: {},
    icon: "/images/projects/flying-birds/icon.jpg",
    images: [],
    videos: ["/videos/projects/flying-birds/gameplay.mp4"],
  },
];
