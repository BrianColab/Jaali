import { ResponsiveAsset } from "@/components/media/responsive-asset";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { ResponsiveImageAsset } from "@/types/assets";
import type { HomepageContent } from "@/types/content";

type HeroProps = Readonly<{
  asset: ResponsiveImageAsset;
  content: HomepageContent["hero"];
}>;

export function Hero({ asset, content }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="homepage-hero-heading">
      <Container>
        <div className="editorial-grid">
          <div className="hero__content">
            <span className="hero__accent-lines" aria-hidden="true" />
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading id="homepage-hero-heading" level={1} variant="display">
              {content.title}
            </Heading>
            <Text className="hero__copy" size="lead">
              {content.body}
            </Text>
            <div className="button-row hero__actions">
              <ButtonLink href={content.primaryAction.href} size="large">
                {content.primaryAction.label}
              </ButtonLink>
              <ButtonLink
                href={content.secondaryAction.href}
                size="large"
                variant="secondary"
              >
                {content.secondaryAction.label}
              </ButtonLink>
              <ButtonLink
                href={content.tertiaryAction.href}
                size="large"
                variant="secondary"
              >
                {content.tertiaryAction.label}
              </ButtonLink>
              <ButtonLink
                href={content.quaternaryAction.href}
                size="large"
                variant="secondary"
              >
                {content.quaternaryAction.label}
              </ButtonLink>
            </div>
          </div>
          <div className="hero__media">
            <ResponsiveAsset asset={asset} priority />
          </div>
        </div>
      </Container>
    </section>
  );
}
