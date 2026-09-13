import { ShareExperienceForm } from "@/components/content/share-experience-form";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

export function ShareExperienceFormSection() {
  return (
    <section
      className="donation-page__body"
      aria-labelledby="share-your-experience-form"
    >
      <Container className="donation-page__grid">
        <div className="donation-page__copy">
          <Eyebrow>Your Story</Eyebrow>
          <Heading id="share-your-experience-form" level={2} variant="section">
            Share What Happened
          </Heading>
          <Text>
            Everything you share stays private and will not be published or
            used publicly without your clear permission.
          </Text>
        </div>

        <ShareExperienceForm />
      </Container>
    </section>
  );
}
