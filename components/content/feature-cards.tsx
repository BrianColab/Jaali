import { HoverLift } from "@/components/motion/reveal";
import { Card, CardGrid, type CardVariant } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import type { FeatureCardItem } from "@/types/content";

type FeatureCardsProps = Readonly<{
  items: readonly FeatureCardItem[];
  variant?: CardVariant;
}>;

export function FeatureCards({
  items,
  variant = "outlined",
}: FeatureCardsProps) {
  return (
    <CardGrid className="feature-cards" columns={3}>
      {items.map(({ description, icon: Icon, id, title }) => (
        <HoverLift key={id}>
          <Card className="feature-card" variant={variant}>
            {Icon ? (
              <Icon
                className="card__icon"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            ) : null}
            <Heading level={3} variant="card">
              {title}
            </Heading>
            <Text muted>{description}</Text>
          </Card>
        </HoverLift>
      ))}
    </CardGrid>
  );
}
