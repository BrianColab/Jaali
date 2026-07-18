import { ChevronDown } from "lucide-react";

import { Text } from "@/components/ui/typography";
import type { AccordionItem } from "@/types/content";

type AccordionProps = Readonly<{
  items: readonly AccordionItem[];
}>;

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details className="accordion__item" key={item.id}>
          <summary className="accordion__summary">
            <span>{item.title}</span>
            <ChevronDown
              className="accordion__icon"
              aria-hidden="true"
              size={22}
              strokeWidth={1.5}
            />
          </summary>
          <div className="accordion__content">
            <Text muted>{item.content}</Text>
          </div>
        </details>
      ))}
    </div>
  );
}
