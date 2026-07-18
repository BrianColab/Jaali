import { TextField } from "@/components/forms/form-controls";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

type NewsletterProps = Readonly<{
  action?: string;
  description: string;
  heading: string;
}>;

export function Newsletter({ action, description, heading }: NewsletterProps) {
  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading" className="newsletter__heading">
        {heading}
      </h2>
      <Text size="small" muted>
        {description}
      </Text>
      <form className="newsletter__form" action={action} method="post">
        <TextField
          id="newsletter-email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Button type="submit" variant="secondary" disabled={!action}>
          Subscribe
        </Button>
      </form>
    </section>
  );
}
