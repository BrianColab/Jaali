import { ContactForm } from "@/components/contact/contact-form";
import { FeatherWatermark } from "@/components/brand/feather-watermark";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

export function ContactPage() {
  return (
    <article className="content-page donation-page">
      <header className="content-page__hero">
        <FeatherWatermark />
        <Container>
          <Eyebrow>Get in Touch</Eyebrow>
          <Heading id="page-title" level={1} variant="display">
            Contact Us
          </Heading>
          <Text className="content-page__intro" size="lead">
            Send us a message and our team will follow up with you.
          </Text>
        </Container>
      </header>

      <section className="donation-page__body" aria-labelledby="contact-us">
        <Container className="donation-page__grid">
          <div className="donation-page__copy">
            <Eyebrow>Contact</Eyebrow>
            <Heading id="contact-us" level={2} variant="section">
              We Would Like to Hear From You
            </Heading>
            <Text>
              Whether you have a question, want to share information or would
              like to get involved, reach out and we will respond as soon as
              we can.
            </Text>
          </div>

          <ContactForm />
        </Container>
      </section>
    </article>
  );
}
