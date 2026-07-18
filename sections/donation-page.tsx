import {
  CheckboxField,
  SelectField,
  TextField,
} from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
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

          <form className="donation-form" aria-labelledby="donation-form-title">
            <Heading id="donation-form-title" level={3} variant="card">
              Your Support
            </Heading>
            <TextField
              id="donation-support"
              label="Your support"
              min="1"
              name="support"
              type="number"
            />
            <SelectField
              id="donation-funding-area"
              label="Funding will support"
              name="funding-area"
              options={donatePageContent.fundingAreas.map((area) => ({
                label: area,
                value: area,
              }))}
            />
            <CheckboxField id="donation-reporting" name="reporting">
              We will report clearly on how funds are used and what the work
              achieves.
            </CheckboxField>
            <Button type="button" size="large">
              Donate
            </Button>
          </form>
        </Container>
      </section>
    </article>
  );
}
