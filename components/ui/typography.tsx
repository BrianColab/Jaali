import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant = "display" | "section" | "card";

type HeadingProps = Readonly<{
  children: ReactNode;
  className?: string;
  id?: string;
  level: HeadingLevel;
  variant?: HeadingVariant;
}>;

export function Heading({
  children,
  className,
  id,
  level,
  variant = "section",
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag id={id} className={cn("heading", `heading--${variant}`, className)}>
      {children}
    </Tag>
  );
}

type TextProps = Readonly<{
  as?: "p" | "div" | "span";
  children: ReactNode;
  className?: string;
  muted?: boolean;
  size?: "lead" | "body" | "small";
}> &
  Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function Text({
  as: Tag = "p",
  children,
  className,
  muted = false,
  size = "body",
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn("text", `text--${size}`, muted && "text--muted", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

type EyebrowProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function Eyebrow({ children, className }: EyebrowProps) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
