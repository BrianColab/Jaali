import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { SectionTone } from "@/types/content";
import { cn } from "@/utils/cn";

type SectionProps = Readonly<{
  align?: "left" | "center";
  chapter?: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  id: string;
  intro?: string;
  title: string;
  tone?: SectionTone;
}>;

export function Section({
  align = "left",
  chapter,
  children,
  className,
  eyebrow,
  id,
  intro,
  title,
  tone = "warm-ivory",
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className={cn("section", `section--${tone}`, className)}
      aria-labelledby={headingId}
    >
      <Container>
        <header
          className={cn(
            "section__header",
            align === "center" && "section__header--center",
          )}
        >
          {chapter || eyebrow ? (
            <div className="section__meta">
              {chapter ? (
                <span className="section__chapter" aria-hidden="true">
                  {chapter}
                </span>
              ) : null}
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            </div>
          ) : null}
          <Heading id={headingId} level={2} variant="section">
            {title}
          </Heading>
          {intro ? <Text size="lead">{intro}</Text> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
