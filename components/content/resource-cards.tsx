import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { HoverLift } from "@/components/motion/reveal";
import { Card, CardGrid } from "@/components/ui/card";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { ResourceCardItem } from "@/types/content";

type ResourceCardsProps = Readonly<{
  items: readonly ResourceCardItem[];
}>;

export function ResourceCards({ items }: ResourceCardsProps) {
  return (
    <CardGrid className="resource-cards" columns={3}>
      {items.map((item) => (
        <HoverLift key={item.id}>
          <Card className="resource-card">
            {item.category ? <Eyebrow>{item.category}</Eyebrow> : null}
            <Heading level={3} variant="card">
              {item.title}
            </Heading>
            {item.description ? <Text muted>{item.description}</Text> : null}
            {item.href && item.actionLabel ? (
              <Link className="card__link" href={item.href}>
                {item.actionLabel}
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </Link>
            ) : null}
          </Card>
        </HoverLift>
      ))}
    </CardGrid>
  );
}
