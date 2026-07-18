import type { ReactNode } from "react";

import { Heading, Text } from "@/components/ui/typography";

type CtaBannerProps = Readonly<{
  actions: ReactNode;
  body: string;
  title: string;
}>;

export function CtaBanner({ actions, body, title }: CtaBannerProps) {
  return (
    <aside className="cta-banner" aria-label={title}>
      <div className="cta-banner__inner">
        <div>
          <Heading level={3} variant="card">
            {title}
          </Heading>
          <Text muted>{body}</Text>
        </div>
        <div className="cta-banner__actions button-row">{actions}</div>
      </div>
    </aside>
  );
}
