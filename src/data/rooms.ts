import { Room } from "@/types/room";

export const ROOMS: Room[] = [
  {
    id: "entrance",
    name: "Entrance",
    narrative:
      "Step into a digital Machiya and meet an AI consultant focused on practical outcomes, not hype.",
    scene: {
      tone: "dawn",
      accentLabel: "Genkan",
    },
    hotspots: [
      {
        id: "positioning",
        label: "Consulting Focus",
        x: 26,
        y: 58,
        title: "AI Consulting Focus",
        description:
          "I help teams choose, prototype, and deploy AI systems that improve delivery speed and quality while reducing operational risk.",
      },
      {
        id: "industries",
        label: "Industries",
        x: 68,
        y: 38,
        title: "Industry Experience",
        description:
          "Experience across SaaS, e-commerce, support operations, and internal productivity systems where AI can create measurable leverage.",
      },
    ],
  },
  {
    id: "services",
    name: "Services",
    narrative:
      "Inside the atelier room, every service is designed to move from concept to production with clear milestones.",
    scene: {
      tone: "paper",
      accentLabel: "Atelier",
    },
    hotspots: [
      {
        id: "roadmap",
        label: "AI Roadmap",
        x: 24,
        y: 42,
        title: "Strategy and Roadmapping",
        description:
          "Identify high-value use cases, align stakeholders, and define a phased roadmap with technical and business checkpoints.",
      },
      {
        id: "delivery",
        label: "Build and Integrate",
        x: 52,
        y: 60,
        title: "Build and Integrate",
        description:
          "Ship copilots, automation agents, and retrieval workflows integrated with your existing tools, data, and guardrails.",
      },
      {
        id: "enablement",
        label: "Team Enablement",
        x: 74,
        y: 30,
        title: "Team Enablement",
        description:
          "Upskill engineering and product teams with architecture guidance, implementation playbooks, and review support.",
      },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    narrative:
      "The project room highlights tangible outcomes from focused AI engagements.",
    scene: {
      tone: "garden",
      accentLabel: "Tokonoma",
    },
    hotspots: [
      {
        id: "support",
        label: "Support Automation",
        x: 20,
        y: 54,
        title: "Support Workflow Automation",
        description:
          "Designed an AI triage assistant that reduced median response time by 41% while improving escalation quality.",
      },
      {
        id: "knowledge",
        label: "Knowledge Retrieval",
        x: 50,
        y: 35,
        title: "RAG Knowledge System",
        description:
          "Implemented a retrieval-first knowledge assistant with observability and evaluation loops for reliable answers.",
      },
      {
        id: "copilot",
        label: "Internal Copilot",
        x: 76,
        y: 62,
        title: "Internal Team Copilot",
        description:
          "Built an internal copilot tied to policy and process data, increasing first-draft completion speed across departments.",
      },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    narrative:
      "In the tea room, choose the channel that matches your project pace and preferred collaboration style.",
    scene: {
      tone: "tea",
      accentLabel: "Tea Room",
    },
    hotspots: [
      {
        id: "email",
        label: "Email",
        x: 24,
        y: 58,
        title: "Email for Project Briefs",
        description:
          "Send project goals, team context, and timeline to start a focused discovery conversation.",
        cta: {
          label: "Email",
          href: "mailto:hello@example.com",
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        x: 52,
        y: 40,
        title: "Connect on LinkedIn",
        description:
          "Reach out for advisory conversations, speaking requests, or longer-term consulting partnerships.",
        cta: {
          label: "LinkedIn",
          href: "https://www.linkedin.com",
          external: true,
        },
      },
      {
        id: "calendly",
        label: "Calendly",
        x: 78,
        y: 62,
        title: "Book a Discovery Call",
        description:
          "Reserve a short call to align on scope, outcomes, and recommended next steps.",
        cta: {
          label: "Book Call",
          href: "https://calendly.com",
          external: true,
        },
      },
    ],
  },
];
