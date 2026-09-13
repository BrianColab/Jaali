import type { ReactNode } from "react";

import { Heading, Text } from "@/components/ui/typography";

type DonateBannerProps = Readonly<{
  actions?: ReactNode;
  body: string;
  title: string;
}>;

export function DonateBanner({ actions, body, title }: DonateBannerProps) {
  return (
    <aside className="donate-banner" aria-label={title}>
      <div className="donate-banner__inner">
        <div>
          <Heading level={3} variant="section">
            {title}
          </Heading>
          <Text size="lead">{body}</Text>
        </div>
        {actions ? (
          <div className="donate-banner__actions button-row">{actions}</div>
        ) : null}
      </div>
    </aside>
  );
}
