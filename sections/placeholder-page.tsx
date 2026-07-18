import { PlaceholderSection } from "@/components/ui/placeholder-section";

type PlaceholderPageProps = Readonly<{
  title: string;
}>;

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return <PlaceholderSection title={title} />;
}
