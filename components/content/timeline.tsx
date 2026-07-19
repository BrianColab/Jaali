import { TimelineReveal } from "@/components/motion/reveal";
import { Heading, Text } from "@/components/ui/typography";
import type { TimelineItem } from "@/types/content";

type TimelineProps = Readonly<{
  items: readonly TimelineItem[];
}>;

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="timeline">
      {items.map((item, index) => (
        <li className="timeline__item" key={item.id}>
          <span className="timeline__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="timeline__marker" aria-hidden="true" />
          <TimelineReveal className="timeline__content" delay={index * 0.08}>
            {item.date ? (
              <time className="timeline__date">{item.date}</time>
            ) : null}
            <Heading level={3} variant="card">
              {item.title}
            </Heading>
            <Text muted>{item.description}</Text>
          </TimelineReveal>
        </li>
      ))}
    </ol>
  );
}
