import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  side: "left" | "right";
  loopNote?: string;
};

export type ApproachCard = {
  icon: keyof typeof APPROACH_ICON_MAP;
  title: string;
  description: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type TechItem = {
  name: string;
  icon: string;
};

export type TechCategory = {
  id: string;
  label: string;
  iconName: string;
  fullWidth: boolean;
  techs: TechItem[];
};

export type CaseStudy = {
  id: string;
  category: string;
  client: string;
  headline: string;
  challenge: string;
  findings: string;
  impact: string;
  diagramLines: string[];
  diagramArrows: string[];
};

export type ContactConfig = {
  headline: string;
  headlineAccent: string;
  headlineLine2: string;
  headlineLine3: string;
  subText: string;
  email: string;
  formTitle: string;
  formSubtitle: string;
  projectTypes: string[];
};

export type SiteMeta = {
  url: string;
  name: string;
  title: string;
  description: string;
  ogImage: string;
  twitterHandle: string;
  email: string;
  keywords: string[];
};

export type SiteConfig = {
  name: string;
  brandMark: string;
  tagline: string;
  email: string;
  availableStatus: string;
  consultationLabel: string;
};

export const APPROACH_ICON_MAP: Record<string, string> = {
  Workflow: "Workflow",
  Bot: "Bot",
  Map: "Map"
};

export const SITE_CONFIG: SiteConfig = {
  name: "Someshwari Adeya",
  brandMark: "Someshwari Adeya.",
  tagline:
    "Full-stack product engineering with a bias toward reliability, clarity, and cleaner systems.",
  email: "hello@someshwari.com",
  availableStatus: "Available for select consulting and build partnerships",
  consultationLabel: "Book Free Consultation"
};

export const NAV_LINKS: NavLink[] = [
  { label: "Approach", href: "/#approach" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" }
];

export const HERO_COPY = {
  eyebrow: "Systems Engineer",
  eyebrowAccent: "Full-Stack Product Architect",
  headlineLines: [
    {
      id: "line-1",
      parts: [{ text: "I build", className: "text-on-surface" }]
    },
    {
      id: "line-2",
      parts: [{ text: "web Applications", className: "text-primary" }]
    },
    {
      id: "line-3",
      parts: [
        { text: "that go", className: "text-on-surface" },
        { text: "live", className: "text-primary-container" },
        { text: "fast", className: "text-on-surface" }
      ]
    },
    {
      id: "line-4",
      parts: [
        { text: "and", className: "text-on-surface" },
        { text: "scale", className: "text-primary" },
        { text: "clean.", className: "text-on-surface" }
      ]
    }
  ],
  description:
    "I help product teams ship the parts that usually get messy in production: admin workflows, automation logic, AI-assisted features, billing behavior, and offline-first interfaces that still need to feel clean.",
  primaryCta: "View selected work",
  secondaryCta: "Read engineering notes",
  availability: SITE_CONFIG.availableStatus,
  illustrationAlt:
    "Illustration of Someshwari Adeya building products on a laptop"
} as const;

export const STATS: Stat[] = [
  { value: "4+", label: "Years shipping production software" },
  { value: "8+", label: "Systems delivered across real client teams" },
  { value: "3+", label: "Industries including edtech fintech saas logistics" },
  { value: "24h", label: "Turnaround for urgent fixes and release support" }
];

export const APPROACH_COPY = {
  label: "Approach",
  headlineLeading: "Better ",
  headlineAccent: "products",
  headlineTrailing: " come from better operational decisions.",
  description:
    "I build digital products with equal focus on seamless user experience and business operations. To me, a beautiful and modern website is only as good as the behind-the-scenes systems—like secure billing, customer dashboards, and database structures—that keep your daily business running reliably."
} as const;

export const APPROACH_CARDS: ApproachCard[] = [
  {
    icon: "Workflow",
    title: "Solid Foundations & Team Workspaces",
    description:
      "Designing secure databases and intuitive admin dashboards for your internal teams. I prevent technical headaches before they start by ensuring that your data stays perfectly organized, auditable, and built to support your growth."
  },
  {
    icon: "Bot",
    title: "Smart & Reliable Automation",
    description:
      "Replacing repetitive manual tasks with secure automated workflows. Built with built-in safety checks, automated error correction, and strict compliance so your background operations run quietly and smoothly without constant human supervision."
  },
  {
    icon: "Map",
    title: "Fast Maps & Real-Time Data Dashboards",
    description:
      "Creating highly responsive visual tools that handle massive amounts of customer information without slowing down. Specialized in interactive mapping, offline-ready sync features, and speed-optimized layouts that feel instant."
  }
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Email", href: `mailto:${SITE_CONFIG.email}` },
  { label: "Approach", href: "#approach" },
  { label: "Blog", href: "#blog" },
  { label: "Top", href: "#top" }
];

export const NAV_ARIA = {
  openMenu: "Open navigation menu",
  closeMenu: "Close navigation menu",
  navLabel: "Primary navigation"
} as const;

export const PAGE_IDS = {
  top: "top",
  hero: "hero",
  stats: "stats",
  approach: "approach",
  howIWork: "how-i-work",
  techStack: "tech-stack"
} as const;

export const SECTION_PLACEHOLDERS = {
  projects: "projects",
  services: "services",
  lab: "lab",
  blog: "blog"
} as const;

export const UI_COPY = {
  close: "Close",
  mobileMenuDescription: SITE_CONFIG.tagline
} as const;

export const HOW_I_WORK_COPY = {
  label: "HOW I WORK",
  headlineLeading: "My process, ",
  headlineAccent: "end to end."
} as const;

export const HOW_I_WORK_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery",
    subtitle: "Understand the business first",
    description:
      "Before touching the codebase, I understand the goal. What does success look like for you? Who uses this? What's broken today?",
    side: "right"
  },
  {
    step: 2,
    title: "Audit",
    subtitle: "Understand before touching",
    description:
      "I map the existing system — data flows, pain points, technical debt. No assumptions. No rewrites before reading.",
    side: "left"
  },
  {
    step: 3,
    title: "Plan",
    subtitle: "Map the work, surface risks",
    description:
      "Scope, milestones, edge cases. Written before the first line of code. You know exactly what's being built and why.",
    side: "right"
  },
  {
    step: 4,
    title: "Execute",
    subtitle: "Build with prod in mind",
    description:
      "Clean commits, edge cases considered from day one. Not just making it work — making it maintainable.",
    side: "left"
  },
  {
    step: 5,
    title: "Test",
    subtitle: "Break it before users do",
    description:
      "Edge cases, failure states, load. Real-world conditions. If the iterate loop fires, it fires here — not in production.",
    side: "right",
    loopNote: "↺ loops back to execute if needed"
  },
  {
    step: 6,
    title: "Deploy",
    subtitle: "Ship clean, monitor early",
    description:
      "Staged rollout where possible. Monitoring from minute one. No silent failures reaching your users.",
    side: "left"
  },
  {
    step: 7,
    title: "Handoff",
    subtitle: "Docs, context, continuity",
    description:
      "You get documentation, recorded walkthroughs if needed, and a system your own team can maintain. I don't disappear after deploy.",
    side: "right"
  }
];

export const HOW_I_WORK_ILLUSTRATION_COPY = {
  discoveryTag: "Search goals and user pain",
  auditLines: ["System map", "Pain points", "Data flow", "Technical debt"],
  planChecklist: ["Complete scope", "Review risk", "Stage milestones"],
  executeSnippet: [
    'const release = "stable";',
    "if (edgeCase) handleIt();",
    "ship(cleanCommits);"
  ],
  testOutputs: [
    "✓ auth edge case covered",
    "✓ retry behavior stable",
    "✗ load spike needs review"
  ],
  deployTag: "Rollout and monitor",
  handoffTag: "handoff.md"
} as const;

export const TECH_STACK_COPY = {
  label: "—· TECH STACK ·—",
  headlineLeading: "TECH ",
  headlineAccent: "STACK",
  description:
    "Technologies & tools I use to build scalable systems, automate workflows and deliver real-world impact."
} as const;

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    label: "Frontend Systems",
    iconName: "Code2",
    fullWidth: false,
    techs: [
      { name: "JavaScript", icon: "javascript.svg" },
      { name: "Next.js", icon: "nextjs.svg" },
      { name: "React", icon: "react.svg" },
      { name: "TypeScript", icon: "typescript.svg" },
      { name: "Tailwind CSS", icon: "tailwind.svg" },
      { name: "Redux", icon: "redux.svg" },
      { name: "Redux Toolkit", icon: "redux-toolkit.svg" },
      { name: "HTML", icon: "html.svg" },
      { name: "CSS", icon: "css.svg" }
    ]
  },
  {
    id: "backend",
    label: "Backend Engineering",
    iconName: "Server",
    fullWidth: false,
    techs: [
      { name: "Node.js", icon: "nodejs.svg" },
      { name: "Express.js", icon: "express.svg" },
      { name: "NestJS", icon: "nestjs.svg" },
      { name: "GraphQL", icon: "graphql.svg" },
      { name: "REST APIs", icon: "api.svg" },
      { name: "Supabase", icon: "api.svg" }
    ]
  },
  {
    id: "database",
    label: "Database & Storage",
    iconName: "Database",
    fullWidth: false,
    techs: [
      { name: "PostgreSQL", icon: "postgresql.svg" },
      { name: "MongoDB", icon: "mongodb.svg" },
      { name: "Redis", icon: "redis.svg" },
      { name: "Firebase", icon: "firebase.svg" },
      { name: "Prisma", icon: "prisma.svg" }
    ]
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    iconName: "Cloud",
    fullWidth: false,
    techs: [
      { name: "AWS", icon: "aws.svg" },
      { name: "Docker", icon: "docker.svg" },
      { name: "Vercel", icon: "vercel.svg" },
      { name: "GitHub Actions", icon: "github-actions.svg" },
      { name: "Nginx", icon: "nginx.svg" }
    ]
  },
  {
    id: "ai",
    label: "AI & Automation",
    iconName: "Bot",
    fullWidth: true,
    techs: [
      { name: "OpenAI", icon: "openai.svg" },
      { name: "LangChain", icon: "langchain.svg" },
      { name: "n8n", icon: "n8n.svg" },
      { name: "Puppeteer", icon: "puppeteer.svg" }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "ksgta",
    category: "Education Platform",
    client: "Kumar Singh Global Trading Academy",
    headline:
      "Built the core product system for a trading education business, from student flows to billing logic and day-to-day admin operations.",
    challenge:
      "The difficult part was not the marketing site. It was making enrollment, payments, invoicing, and internal workflows behave like one dependable product.",
    findings:
      "I split business-critical logic into clearer workflows so payment state, invoice generation, and admin updates stopped fighting each other.",
    impact:
      "Reduced operational friction and gave the team a product they could run without constant manual patchwork.",
    diagramLines: ["Billing flow stabilized"],
    diagramArrows: ["Enrollment → Payment", "→ Invoice → Admin"]
  },
  {
    id: "freightflow",
    category: "Logistics SaaS",
    client: "FreightFlow",
    headline:
      "Built the core product system for a freight operations business, from digital lorry receipts to automatic trip P&L settlement and Indian GST/GTA compliance.",
    challenge:
      "Replacing chaotic spreadsheets, offline ledgers, and manual tracking loops with a multi-tenant enterprise system.",
    findings:
      "Designed a robust row-level security architecture, automated GTA RCM calculations, and created instant driver advance toll leak tracking.",
    impact:
      "Achieved 100% digital workflows, eliminated expense leaks, and automated complex SAC tax reporting pipelines.",
    diagramLines: ["Operations Digitized"],
    diagramArrows: ["LR Created → Trip Dispatched", "→ Expense Tracked → Invoice Settle"]
  },
  {
    id: "cms-techsonance",
    category: "Enterprise Operations",
    client: "CMS TechSonance",
    headline:
      "Developed a production-grade internal workspace and CMS platform with 23 granular RBAC roles managing HR, CRM, finance, and tickets.",
    challenge:
      "Consolidating 13 separate operational modules (NFC/GPS attendance, billing, payroll, support) into a single secure monorepo dashboard.",
    findings:
      "Implemented Supabase RLS and JWT middleware, geofenced GPS verification loops, Firebase FCM push messaging, and automated Swagger generation.",
    impact:
      "Secured complete multi-tenant isolation, unified NFC geofenced registers, and created a fully validated 53+ REST API system.",
    diagramLines: ["Granular RBAC Enforced"],
    diagramArrows: ["Employee NFC Tap → Geofence Pass", "→ Real-Time Logs → Payroll Processed"]
  },
  {
    id: "syncserve-pos",
    category: "Offline Point of Sale",
    client: "SyncServe POS",
    headline:
      "Engineered an offline-first Point of Sale interface hosted in an Electron desktop wrapper for seamless local billing and sync.",
    challenge:
      "Ensuring restaurants and retail outlets can check out items, print Kitchen Order Tickets (KOT), and take payments during active internet outages.",
    findings:
      "Housed Next.js in an Electron container, utilizing SQLite and Dexie.js (IndexedDB) with background queue sync triggers.",
    impact:
      "Offered ultra-fast desktop checkout speeds, automatic network reconnection sync, and zero transaction data loss in production.",
    diagramLines: ["Offline billing stable"],
    diagramArrows: ["Offline checkout → SQLite Save", "→ Queue Sync → PostgreSQL Cloud Update"]
  },
  {
    id: "hisaab-kitaab",
    category: "GST Accounting",
    client: "Hisaab Kitaab",
    headline:
      "Created an all-in-one GST compliance and smart accounting platform helping modern Indian MSMEs track double-entry ledgers.",
    challenge:
      "Simplifying complex tax calculations (CGST/SGST/IGST), SAC/HSN codes, and invoice aging for non-technical business owners.",
    findings:
      "Built a prominent GST preference checkout card, optimized client-side jsPDF/XLSX export engines, and designed aging receivables widgets.",
    impact:
      "Automated complete Indian tax compliance, accelerated PDF invoices, and created clean, indisputable cash flow ledgers.",
    diagramLines: ["GST Computations automated"],
    diagramArrows: ["Billing Preference → Tax Calc", "→ Invoice PDF → Accounts Ledger"]
  }
];

export const CONTACT_CONFIG: ContactConfig = {
  headline: "Better products",
  headlineAccent: "usually come",
  headlineLine2: "from better",
  headlineLine3: "operational decisions.",
  subText:
    "I work with teams that need cleaner execution across product engineering, SaaS feature delivery, internal tooling, or operational cleanup.",
  email: "hello@someshwari.com",
  formTitle: "Project Inquiry",
  formSubtitle: "Tell me what needs to move.",
  projectTypes: [
    "Product engineering",
    "Automation systems",
    "Admin workflows",
    "Offline-first apps",
    "AI-assisted features",
    "Other"
  ]
};

export const SITE_META: SiteMeta = {
  url: "https://www.techsonance.co.in",
  name: "Someshwari Adeya",
  title: "Someshwari Adeya — Full-Stack Product Engineer",
  description:
    "I help product teams ship the parts that get messy in production: admin workflows, automation logic, SaaS products, billing systems, and offline-first interfaces.",
  ogImage: "/og-default.png",
  twitterHandle: "@someshwari",
  email: "hello@someshwari.com",
  keywords: [
    "full-stack engineer",
    "product engineer",
    "Next.js developer",
    "React developer",
    "Node.js engineer",
    "automation engineer",
    "admin workflow development",
    "SaaS engineer",
    "POS developer",
    "freelance full-stack developer",
    "billing systems engineer",
    "AI-assisted features",
    "remote product engineer",
    "TypeScript developer",
    "system architect",
    "FreightFlow",
    "CMS TechSonance",
    "SyncServe POS",
    "Hisaab Kitaab",
    "GST compliance",
    "TechSonance"
  ]
};

export const CASE_STUDIES_COPY = {
  label: "Selected Work",
  headline:
    "Case studies shaped around engineering judgment, not stack trivia.",
  sectionTitle: "Selected Work",
  challengeLabel: "Challenge",
  findingsLabel: "Findings",
  impactLabel: "Impact"
} as const;

export const CONTACT_FORM_COPY = {
  nameLabel: "NAME",
  namePlaceholder: "Your name",
  emailLabel: "EMAIL",
  emailPlaceholder: "you@company.com",
  companyLabel: "COMPANY",
  companyPlaceholder: "Company or team",
  projectTypeLabel: "PROJECT TYPE",
  projectTypePlaceholder: "Select a type",
  messageLabel: "MESSAGE",
  messagePlaceholder:
    "What are you building, where is it stuck, and what kind of help do you need?",
  submitLabel: "Send inquiry",
  sendingLabel: "Sending...",
  errorChip: "Something went wrong. Try emailing directly.",
  successTitle: "Message sent.",
  successBody: "I'll be in touch within 24 hours.",
  sendAnother: "Send another",
  validationRequired: "This field is required.",
  validationEmail: "Enter a valid email address."
} as const;

export const CONTACT_SECTION_COPY = {
  label: "Contact"
} as const;

export const NOT_FOUND_COPY = {
  label: "404 — Page not found",
  headline: "Wrong turn.",
  body: "This page doesn't exist or was moved. Let's get you back.",
  goHome: "← Go home",
  viewWork: "View my work"
} as const;

export const ERROR_PAGE_COPY = {
  label: "Something went wrong",
  headline: "System error.",
  body: "An unexpected error occurred. The issue has been noted.",
  tryAgain: "Try again",
  goHome: "← Go home"
} as const;

export const BLOG_PLACEHOLDER_COPY = {
  label: "Engineering Notes",
  headline: "Writing in progress.",
  body: "Engineering notes and system design write-ups coming soon."
} as const;

export const BLOG_META_COPY = {
  title: "Engineering Notes",
  description:
    "Product engineering write-ups, system design notes, and lessons from real production work.",
  canonicalPath: "/blog"
} as const;

export const NOT_FOUND_META_COPY = {
  title: "404 — Page Not Found",
  description: "This page does not exist."
} as const;

export const OG_COPY = {
  nameUpper: "SOMESHWARI ADEYA",
  role: "Full-Stack Product Engineer",
  url: "techsonance.co.in",
  footer: "Systems engineer · Product architect"
} as const;

export type IconRegistry = Record<string, LucideIcon>;

export interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  status: string;
  headline: string;
  summary: string;
  coverImage: string;
  problem: string;
  process: string[];
  outcome: string;
  metrics: Array<{ value: string; label: string }>;
  techStack: string[];
  diagramArrows: string[];
  liveUrl?: string;
}

export const SERVICES = [
  {
    id: "website-development",
    icon: "Code2",
    title: "Website Development",
    description: "Custom-built, high-speed websites tailored specifically to your brand and user needs."
  },
  {
    id: "seo-optimized",
    icon: "SearchCheck",
    title: "SEO & Speed Auditing",
    description: "Engineered from the ground up for maximum page speed, search visibility, and organic growth."
  },
  {
    id: "modern-design",
    icon: "Palette",
    title: "Modern UI/UX Design",
    description: "Clean, contemporary interfaces crafted with micro-animations and a premium, luxury feel."
  },
  {
    id: "responsive",
    icon: "MonitorSmartphone",
    title: "Responsive & Native",
    description: "Perfect user experience across mobile, tablet, and desktop screens with native-like fluidity."
  },
  {
    id: "api-integrations",
    icon: "Cpu",
    title: "Connected Systems & APIs",
    description: "Linking your app with payment gateways, CRMs, WhatsApp APIs, and external tools to keep data moving without manual double-entry."
  },
  {
    id: "custom-admin",
    icon: "Settings",
    title: "Custom Admin Dashboards",
    description: "Designing easy-to-use, secure management portals for your staff, with tailored editing roles and quick search features for operations."
  },
  {
    id: "database-design",
    icon: "Database",
    title: "Clean Databases & Scaling",
    description: "Designing fast, organized database models that keep customer information completely safe, load screens instantly, and scale as you grow."
  },
  {
    id: "performance-support",
    icon: "ShieldCheck",
    title: "Performance Auditing & Support",
    description: "Identifying screen bottlenecks, resolving slow page load issues, and providing rapid support responses to keep your system online."
  }
];


export const BEYOND_ROLES = {
  sectionLabel: "Beyond Roles",
  headline: "Founder & CEO",
  subText: "Designing, building, and shipping production-grade digital products with TechSonance InfoTech LLP.",
  agency: {
    chip: "Agency",
    logo: "/images/hero-illustration.png",
    logoAlt: "TechSonance InfoTech LLP logo",
    title: "Founder, TechSonance InfoTech LLP",
    description: "Premium software development agency shipping modern, revenue-ready products.",
    stats: [
      { value: "10+", label: "Client projects delivered" },
      { value: "2 mo", label: "Young, fast-moving" },
      { value: "Studio", label: "Strategy → launch" }
    ],
    body: "TechSonance InfoTech LLP partners with founders and brands to design, build, and ship production-grade web apps with polish, speed, and measurable outcomes.",
    ctaLabel: "Book a build with TechSonance InfoTech",
    ctaHref: "https://www.techsonance.co.in/"
  }
};

export const SOCIAL_LINKS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    sublabel: "+91 96925 44587",
    href: "https://wa.me/919692544587",
    icon: "MessageCircle",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20"
  },
  {
    id: "instagram",
    label: "Instagram",
    sublabel: "Follow my journey",
    href: "https://instagram.com/someshwari",
    icon: "Instagram",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/20"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sublabel: "Professional network",
    href: "https://linkedin.com/in/someshwari",
    icon: "Linkedin",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  }
];

export const ABOUT_PAGE = {
  meta: {
    title: "About",
    description: "Full-stack product engineer and agency founder. Here's the full story.",
  },
  hero: {
    label: "About Me",
    headline: "Hi there! I'm",
    headlineAccent: "Someshwari",
    subText: "I'm Someshwari Adeya, a full-stack product engineer and founder of TechSonance InfoTech LLP. I specialize in designing and shipping production-ready web platforms, robust billing workflows, offline Point of Sale terminals, and secure enterprise portals.",
    photo: "/images/hero-illustration.png",
    photoAlt: "Someshwari Adeya",
  },
  story: {
    label: "Background",
    headline: "How I got here.",
    paragraphs: [
      "I specialize in Next.js, React, TypeScript, and robust database layers, designing software systems that prioritize billing precision, offline resilience, and secure administrative controls.",
      "Through TechSonance InfoTech LLP, I translate complex manual operations into high-polish digital products, delivering fleet tracking systems, custom ledger computations, and granular RBAC interfaces that scale cleanly.",
      "I believe that solid software isn't just about beautiful layouts, but about reliable background jobs, monitored automations, and clean codebase architectures that teams can maintain."
    ],
  },
  values: [
    { icon: "Target", title: "Execution over theory", body: "I care about what ships. Plans are starting points — working systems are the deliverable." },
    { icon: "Shield", title: "Reliability by design", body: "Edge cases aren't afterthoughts. Production readiness starts on day one." },
    { icon: "BookOpen", title: "Context before code", body: "I read the system before I touch it. No rewrites before understanding." },
    { icon: "Users", title: "Continuity", body: "I don't disappear after deploy. Documentation and handoff are part of the job." },
  ],
  skills: {
    label: "Skills & Tools",
    headline: "What I work with.",
    categories: [
      { name: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"] },
      { name: "Backend", items: ["Node.js", "Express", "GraphQL", "REST APIs", "Prisma"] },
      { name: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "SQLite"] },
      { name: "Automation", items: ["n8n", "Make.com", "Zapier", "Puppeteer", "Webhooks"] },
      { name: "AI", items: ["OpenAI", "LangChain", "Embeddings", "Prompt Engineering"] },
      { name: "Infra", items: ["Vercel", "Docker", "AWS", "GitHub Actions", "Nginx"] },
    ],
  },
  cta: {
    headline: "Want to work together?",
    subText: "I take on select consulting and build partnerships. If you have a system that needs to be cleaner, faster, or more reliable — let's talk.",
    primaryLabel: "Send a project inquiry",
    primaryHref: "/#contact",
    secondaryLabel: "View my work",
    secondaryHref: "/projects",
  },
};

export const PROJECTS: Project[] = [
  {
    slug: "ksgta",
    title: "Kumar Singh Global Trading Academy — Trading Education Platform",
    category: "Education Platform",
    tags: ["Product Systems", "Billing", "Admin"],
    year: "2026",
    status: "Live",
    headline: "Built the core product system for a trading education business, from student flows to billing logic and day-to-day admin operations.",
    summary: "From student enrollment to billing logic and day-to-day admin operations — this was the operational layer that made the business run.",
    coverImage: "/images/projects/ksgta-cover.png",
    problem: "The difficult part was not the marketing site. It was making enrollment, payments, invoicing, and internal workflows behave like one dependable product.",
    process: [
      "Audited the existing flow — found 6 disconnected manual steps in the enrollment process.",
      "Designed a unified state machine for student lifecycle: enrolled → active → invoiced → graduated.",
      "Built admin tooling to let the ops team manage everything without touching the database.",
      "Implemented billing logic with edge case handling for failed payments, retries, and refunds."
    ],
    outcome: "Reduced operational friction and gave the team a product they could run without constant manual patchwork.",
    metrics: [
      { value: "6", label: "Manual steps eliminated" },
      { value: "100%", label: "Billing automated" },
      { value: "0", label: "Manual DB edits needed post-launch" }
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Stripe"],
    diagramArrows: ["Enrollment → Payment", "→ Invoice → Admin"],
    liveUrl: "http://kumarsingh.live/"
  },
  {
    slug: "freightflow",
    title: "FreightFlow — Road Transport & Logistics SaaS",
    category: "Logistics SaaS",
    tags: ["Multi-Tenant", "Trip P&L", "GST Compliance"],
    year: "2026",
    status: "Live",
    headline: "A full-stack SaaS platform built exclusively for Indian road transport and logistics businesses.",
    summary: "Replaces disconnected spreadsheets, paper registers, and generic accounting tools with a single, purpose-built system that manages everything — from Lorry Receipts (LR) to trip P&L settlement and GST compliance.",
    coverImage: "/images/projects/freightflow-cover.png",
    problem: "The road transport industry in India faces massive financial leakage from unaccounted driver advances, unmonitored toll/fuel cash drops, and complex monthly GST and RCM GTA reporting. Disconnected spreadsheets and manual paper registers make real-time per-trip profitability tracking impossible.",
    process: [
      "Engineered an enterprise-grade multi-tenant architecture utilizing row-level database security to ensure absolute isolation across transporters.",
      "Designed a complete Lorry Receipt (LR) & Order Management module supporting consignee accounts, custom formats, and digital LR slips.",
      "Implemented a comprehensive trip lifecycle tracker that monitors fuel drops, toll charges, driver wages, and calculates actual trip P&L.",
      "Automated complex tax compliance pathways including CGST/SGST/IGST Calculations, RCM GTA reporting, and e-Way Bill/e-Invoice API triggers."
    ],
    outcome: "Eliminated operational leakages on cash driver advances and toll charges while enabling fleet operators to check exact vehicle-wise and route-wise profit margins instantly.",
    metrics: [
      { value: "100%", label: "Digital Lorry Receipts" },
      { value: "Zero", label: "Toll & fuel leakage" },
      { value: "Automated", label: "GST & GTA RCM filing" }
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Prisma", "Zustand", "Tailwind CSS 4", "Upstash Redis", "jsPDF", "XLSX"],
    diagramArrows: ["LR Created → Trip Dispatched", "→ Expense Tracked → Invoice Settle"],
    liveUrl: "https://freightflow.techsonance.co.in/"
  },
  {
    slug: "cms-techsonance",
    title: "CMS TechSonance — Enterprise Operations Platform",
    category: "Enterprise Operations",
    tags: ["23 Roles RBAC", "Geofenced NFC", "CRM/HelpDesk"],
    year: "2025",
    status: "Live",
    headline: "Production-grade, multi-tenant internal operations and customer CMS platform.",
    summary: "Consolidates 13 separate business modules (NFC/GPS attendance, billing, payroll, CRM, ticketing) into a unified secure dashboard secured by 23 granular user access roles.",
    coverImage: "/images/projects/cms-techsonance-cover.png",
    problem: "Managing internal teams, localized payroll, reimbursement workflows, client CRM tickets, and office registers across multiple departments was highly fragmented, relying on separate third-party SaaS services with high costs and poor data synchronization.",
    process: [
      "Designed a multi-tenant DB structure with 23 granular user roles (Admin, PM, Finance, Intern, Client, Developer) for absolute RBAC compliance.",
      "Implemented a geofenced and IP-whitelisted attendance system linking legacy manual clock-ins with high-speed NFC hardware reader APIs.",
      "Created highly interactive CRM, Ticketing, and Content Management modules featuring secure attachment storage via Supabase S3 buckets.",
      "Built automated salary/payroll calculation engines with bulk processing hooks and real-time push alerts via Firebase FCM."
    ],
    outcome: "Consolidated all daily operating mechanisms of TechSonance InfoTech LLP into a single secure workspace, achieving instant context alignment across teams and clients.",
    metrics: [
      { value: "23", label: "Granular RBAC user roles" },
      { value: "53+", label: "Validated REST API endpoints" },
      { value: "100%", label: "Geofenced & NFC Attendance" }
    ],
    techStack: ["Next.js 15.3", "React 19", "TypeScript", "Supabase (PostgreSQL)", "MongoDB", "Firebase (FCM)", "Tailwind CSS 4", "better-auth", "shadcn/ui", "Radix UI"],
    diagramArrows: ["Employee NFC Tap → Geofence Pass", "→ Real-Time Logs → Payroll Processed"],
    liveUrl: "https://cms.techsonance.co.in/"
  },
  {
    slug: "syncserve-pos",
    title: "SyncServe POS — Offline-First retail Point of Sale",
    category: "Offline Point of Sale",
    tags: ["Offline SQLite", "Dexie.js", "Electron App"],
    year: "2025",
    status: "In Progress",
    headline: "High-performance hybrid POS application with offline-first billing reliability.",
    summary: "A modern offline-first Point of Sale interface tailored for retail and restaurants, combining native desktop installation with automatic cloud synchronization.",
    coverImage: "/images/projects/syncserve-pos-cover.png",
    problem: "Active internet fluctuations at billing terminals in high-traffic restaurants or retail outlets frequently halt checkout transactions, causing order delays, duplicate logs, and direct revenue loss.",
    process: [
      "Designed an offline-first operational schema using local SQLite and Dexie.js (IndexedDB) for client-side persistence.",
      "Created a robust queue synchronization engine that queues local order logs and background-syncs them to a PostgreSQL cloud DB once online.",
      "Housed the entire Next.js build within an Electron wrapper to distribute a native desktop binary for macOS and Windows systems.",
      "Developed interactive order states (Hold/Resume), modifier addon managers, dynamic search grids, and automated KOT network printing."
    ],
    outcome: "Ensured completely uninterrupted cashier operations, ultra-fast checkout billing times under 1 second, and guaranteed zero transaction loss.",
    metrics: [
      { value: "100%", label: "Offline checkout operational" },
      { value: "Ultra-fast", label: "Billing & KOT generation" },
      { value: "Zero", label: "Data loss during synchronization" }
    ],
    techStack: ["Next.js 16", "React 19", "TypeScript", "Electron", "SQLite", "PostgreSQL", "Dexie.js (IndexedDB)", "Tailwind CSS 4", "Prisma"],
    diagramArrows: ["Offline checkout → SQLite Save", "→ Queue Sync → PostgreSQL Cloud Update"],
    liveUrl: "https://app.syncserve.techsonance.co.in/"
  },
  {
    slug: "hisaab-kitaab",
    title: "Hisaab Kitaab — Smart Accounting & GST SaaS",
    category: "GST Accounting",
    tags: ["Double-Entry GL", "GST Tax Engine", "PDF/Excel Engine"],
    year: "2025",
    status: "Live",
    headline: "Smart, all-in-one GST billing and accounting SaaS tailored for Indian MSMEs.",
    summary: "Simplifies complex tax compliance, SAC/HSN codes, double-entry financial ledgers, and invoice aging for non-technical business owners with fast local generation.",
    coverImage: "/images/projects/hisaab-kitaab-cover.png",
    problem: "Most generic accounting apps are overly complex, require extensive training, or lack proper localization for Indian business compliance like RCM, SAC code lookups, or split CGST/SGST vs. IGST calculations.",
    process: [
      "Engineered an intuitive billing flow centered around a prominent GST vs. Non-GST selector to immediately route the tax calculations.",
      "Developed a local-first accounts receivable aging engine with automated alerts to prompt outstanding payments via Nodemailer templates.",
      "Optimized browser workers to compile thousands of financial entries into professional PDF invoice logs (jsPDF) and Excel data grids (XLSX).",
      "Created pre-seeded double-entry accounting ledgers customized to Indian logistics and trade operations."
    ],
    outcome: "Enabled business owners to manage complete tax filing readiness and track clean accounts sheets without needing a professional accountant.",
    metrics: [
      { value: "100%", label: "GST & Invoice Compliance" },
      { value: "Instant", label: "PDF Invoice & Excel Export" },
      { value: "Automated", label: "Accounts Receivable Ageing" }
    ],
    techStack: ["Next.js", "React 19", "TypeScript", "PostgreSQL", "Zustand", "Tailwind CSS 4", "jsPDF", "XLSX", "Zod", "Nodemailer"],
    diagramArrows: ["Billing Preference → Tax Calc", "→ Invoice PDF → Accounts Ledger"],
    liveUrl: "https://hisaabkitaab.techsonance.co.in/"
  }
];
