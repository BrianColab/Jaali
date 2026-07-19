import { DonationForm } from "@/components/donation/donation-form";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { donatePageContent } from "@/data/pages";

export function DonationPage() {
  return (
    <article className="content-page donation-page">
      <header className="content-page__hero">
        <Container>
          <Eyebrow>{donatePageContent.eyebrow}</Eyebrow>
          <Heading id="page-title" level={1} variant="display">
            {donatePageContent.title}
          </Heading>
          <Text className="content-page__intro" size="lead">
            {donatePageContent.intro}
          </Text>
        </Container>
      </header>

      <section className="donation-page__body" aria-labelledby="fund-network">
        <Container className="donation-page__grid">
          <div className="donation-page__copy">
            <Eyebrow>Donate</Eyebrow>
            <Heading id="fund-network" level={2} variant="section">
              Fund the Network
            </Heading>
            {donatePageContent.paragraphs.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>

          <DonationForm />
        </Container>
      </section>
    </article>
  );
}
