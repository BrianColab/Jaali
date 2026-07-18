import { Container } from "@/components/ui/container";

type PlaceholderSectionProps = Readonly<{
  title: string;
}>;

export function PlaceholderSection({ title }: PlaceholderSectionProps) {
  return (
    <section className="placeholder-section" aria-labelledby="page-title">
      <Container>
        <h1 id="page-title" className="placeholder-section__title">
          {title}
        </h1>
        <p className="placeholder-section__status">Content pending approval.</p>
      </Container>
    </section>
  );
}
