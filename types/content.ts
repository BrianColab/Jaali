import type { LucideIcon } from "lucide-react";

export type TimelineItem = Readonly<{
  date?: string;
  description: string;
  id: string;
  title: string;
}>;

export type FeatureCardItem = Readonly<{
  description?: string;
  icon?: LucideIcon;
  id: string;
  title: string;
}>;

export type AccordionItem = Readonly<{
  content: string;
  id: string;
  title: string;
}>;

export type ResourceCardItem = Readonly<{
  actionLabel?: string;
  category?: string;
  description?: string;
  href?: string;
  id: string;
  title: string;
}>;

export type SectionTone = "warm-ivory" | "soft-white" | "charcoal" | "forest";

export type ContentAction = Readonly<{
  href: string;
  label: string;
}>;

export type SectionHeaderContent = Readonly<{
  eyebrow: string;
  id: string;
  intro: string;
  title: string;
  tone: SectionTone;
}>;

export type StoryBlockContent = Readonly<{
  body: string;
  eyebrow: string;
  mediaPosition: "start" | "end";
  title: string;
}>;

export type CtaContent = Readonly<{
  action: ContentAction;
  body: string;
  title: string;
}>;

export type HomepageContent = Readonly<{
  advocacy: Readonly<{
    header: SectionHeaderContent;
    items: readonly FeatureCardItem[];
  }>;
  context: Readonly<{
    attribution: string;
    header: SectionHeaderContent;
    quote: string;
  }>;
  donate: Readonly<{
    banner: CtaContent;
    header: SectionHeaderContent;
  }>;
  hero: Readonly<{
    body: string;
    eyebrow: string;
    primaryAction: ContentAction;
    quaternaryAction: ContentAction;
    secondaryAction: ContentAction;
    tertiaryAction: ContentAction;
    title: string;
  }>;
  resources: Readonly<{
    header: SectionHeaderContent;
    items: readonly ResourceCardItem[];
  }>;
  rights: Readonly<{
    cta: CtaContent;
    header: SectionHeaderContent;
    items: readonly AccordionItem[];
  }>;
  shareStory: Readonly<{
    cta: CtaContent;
    header: SectionHeaderContent;
  }>;
  story: Readonly<{
    block: StoryBlockContent;
    header: SectionHeaderContent;
  }>;
  timeline: Readonly<{
    header: SectionHeaderContent;
    items: readonly TimelineItem[];
  }>;
  vision: Readonly<{
    block: StoryBlockContent;
    header: SectionHeaderContent;
  }>;
  warningSigns: Readonly<{
    header: SectionHeaderContent;
    items: readonly string[];
  }>;
}>;
