import { SectionReveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { EditorialPageContent } from "@/types/pages";

type ContentPageProps = Readonly<{
  content: EditorialPageContent;
}>;

export function ContentPage({ content }: ContentPageProps) {
  return (
    <article className="content-page">
      <header className="content-page__hero">
        <Container>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading id="page-title" level={1} variant="display">
            {content.title}
          </Heading>
          <Text className="content-page__intro" size="lead">
            {content.intro}
          </Text>
          {content.emergencyNotice ? (
            <p className="content-page__emergency" role="note">
              {content.emergencyNotice}
            </p>
          ) : null}
        </Container>
      </header>

      <div className="content-page__body">
        {content.sections.map((section, index) => (
          <section
            className="content-page__section"
            id={section.id}
            key={section.id}
            aria-labelledby={`${section.id}-heading`}
          >
            <Container>
              <SectionReveal className="content-page__section-grid">
                <p className="content-page__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="content-page__section-content">
                  <Heading
                    id={`${section.id}-heading`}
                    level={2}
                    variant="section"
                  >
                    {section.title}
                  </Heading>
                  {section.paragraphs?.map((paragraph) => (
                    <Text key={paragraph}>{paragraph}</Text>
                  ))}
                  {section.items ? (
                    <ul className="content-page__list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </SectionReveal>
            </Container>
          </section>
        ))}
      </div>
    </article>
  );
}
