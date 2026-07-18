export type EditorialContentSection = Readonly<{
  id: string;
  items?: readonly string[];
  paragraphs?: readonly string[];
  title: string;
}>;

export type EditorialPageContent = Readonly<{
  emergencyNotice?: string;
  eyebrow: string;
  intro: string;
  sections: readonly EditorialContentSection[];
  title: string;
}>;
