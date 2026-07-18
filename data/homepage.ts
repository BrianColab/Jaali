import type { HomepageContent } from "@/types/content";

export const homepageContent = {
  hero: {
    eyebrow: "Homepage framework",
    title: "Justice for Jaali",
    body: "Approved hero copy pending.",
    primaryAction: {
      href: "/get-help-now",
      label: "Get Help Now",
    },
    secondaryAction: {
      href: "/jaalis-story",
      label: "Jaali’s Story",
    },
    tertiaryAction: {
      href: "/know-your-rights",
      label: "Know Your Rights",
    },
    quaternaryAction: {
      href: "/donate",
      label: "Donate",
    },
  },
  story: {
    header: {
      id: "jaalis-story",
      eyebrow: "Story",
      title: "Jaali’s Story",
      intro: "Approved section introduction pending family review.",
      tone: "soft-white",
    },
    block: {
      eyebrow: "Approved story label pending",
      title: "Approved story heading pending",
      body: "Approved biographical copy pending family and legal review.",
      mediaPosition: "start",
    },
  },
  timeline: {
    header: {
      id: "timeline",
      eyebrow: "Timeline",
      title: "Timeline",
      intro: "Approved timeline context pending.",
      tone: "warm-ivory",
    },
    items: [
      {
        id: "timeline-placeholder-1",
        date: "Timeline entry 01",
        title: "Approved timeline heading pending",
        description: "Approved timeline copy pending.",
      },
      {
        id: "timeline-placeholder-2",
        date: "Timeline entry 02",
        title: "Approved timeline heading pending",
        description: "Approved timeline copy pending.",
      },
      {
        id: "timeline-placeholder-3",
        date: "Timeline entry 03",
        title: "Approved timeline heading pending",
        description: "Approved timeline copy pending.",
      },
    ],
  },
  context: {
    header: {
      id: "not-an-isolated-tragedy",
      eyebrow: "Context",
      title: "This Is Not An Isolated Tragedy",
      intro: "Approved contextual copy and citations pending review.",
      tone: "charcoal",
    },
    quote: "Approved quotation pending.",
    attribution: "Approved attribution pending",
  },
  advocacy: {
    header: {
      id: "what-were-fighting-for",
      eyebrow: "Advocacy",
      title: "What We’re Fighting For",
      intro: "Approved advocacy introduction pending.",
      tone: "soft-white",
    },
    items: [
      {
        id: "priority-placeholder-1",
        title: "Priority 01",
        description: "Approved advocacy priority pending.",
      },
      {
        id: "priority-placeholder-2",
        title: "Priority 02",
        description: "Approved advocacy priority pending.",
      },
      {
        id: "priority-placeholder-3",
        title: "Priority 03",
        description: "Approved advocacy priority pending.",
      },
    ],
  },
  rights: {
    header: {
      id: "know-your-rights",
      eyebrow: "Patient advocacy",
      title: "Know Your Rights",
      intro: "Approved rights copy pending legal and clinical review.",
      tone: "warm-ivory",
    },
    items: [
      {
        id: "rights-placeholder-1",
        title: "Rights topic 01",
        content:
          "Approved rights information pending legal and clinical review.",
      },
      {
        id: "rights-placeholder-2",
        title: "Rights topic 02",
        content:
          "Approved rights information pending legal and clinical review.",
      },
      {
        id: "rights-placeholder-3",
        title: "Rights topic 03",
        content:
          "Approved rights information pending legal and clinical review.",
      },
    ],
    cta: {
      title: "Approved patient-safety CTA pending",
      body: "Approved CTA copy and destination pending.",
      action: {
        href: "/know-your-rights",
        label: "View Framework",
      },
    },
  },
  warningSigns: {
    header: {
      id: "maternal-warning-signs",
      eyebrow: "Clinical information",
      title: "Maternal Warning Signs",
      intro: "All clinical wording must be approved before publication.",
      tone: "forest",
    },
    items: [
      "Approved maternal warning sign pending clinical review.",
      "Approved maternal warning sign pending clinical review.",
      "Approved maternal warning sign pending clinical review.",
      "Approved maternal warning sign pending clinical review.",
    ],
  },
  vision: {
    header: {
      id: "vision",
      eyebrow: "Vision",
      title: "Vision",
      intro: "Approved vision statement pending.",
      tone: "soft-white",
    },
    block: {
      eyebrow: "Approved vision label pending",
      title: "Approved vision heading pending",
      body: "Approved vision copy pending stakeholder review.",
      mediaPosition: "end",
    },
  },
  resources: {
    header: {
      id: "resources",
      eyebrow: "Resources",
      title: "Resources",
      intro: "Approved resource library introduction pending.",
      tone: "charcoal",
    },
    items: [
      {
        id: "resource-placeholder-1",
        category: "Resource category",
        title: "Approved resource pending",
        description: "Approved resource description and destination pending.",
        href: "/resources",
      },
      {
        id: "resource-placeholder-2",
        category: "Resource category",
        title: "Approved resource pending",
        description: "Approved resource description and destination pending.",
        href: "/resources",
      },
      {
        id: "resource-placeholder-3",
        category: "Resource category",
        title: "Approved resource pending",
        description: "Approved resource description and destination pending.",
        href: "/resources",
      },
    ],
  },
  shareStory: {
    header: {
      id: "share-your-story",
      eyebrow: "Shared experiences",
      title: "Share Your Story",
      intro:
        "Approved consent, privacy, and safety language pending legal review.",
      tone: "soft-white",
    },
    cta: {
      title: "Approved story-sharing CTA pending",
      body: "Approved CTA copy, consent process, and form destination pending.",
      action: {
        href: "/share-your-experience",
        label: "View Framework",
      },
    },
  },
  donate: {
    header: {
      id: "donate",
      eyebrow: "Support",
      title: "Donate",
      intro:
        "Approved fundraising language and provider integration pending legal review.",
      tone: "charcoal",
    },
    banner: {
      title: "Approved donation CTA pending",
      body: "Approved donation copy and reporting commitments pending.",
      action: {
        href: "/donate",
        label: "View Framework",
      },
    },
  },
} as const satisfies HomepageContent;
