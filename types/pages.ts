export type EditorialResourceLink = Readonly<{
  href?: string;
  label: string;
  note?: string;
}>;

export type EditorialResourceGroup = Readonly<{
  category: string;
  links: readonly EditorialResourceLink[];
}>;

export type EditorialContentSection = Readonly<{
  id: string;
  items?: readonly string[];
  paragraphs?: readonly string[];
  resources?: readonly EditorialResourceGroup[];
  title: string;
}>;

export type EditorialPageContent = Readonly<{
  emergencyNotice?: string;
  eyebrow: string;
  intro: string;
  sections: readonly EditorialContentSection[];
  title: string;
}>;
