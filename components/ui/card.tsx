import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type CardVariant = "outlined" | "soft" | "dark";

type CardProps = Readonly<{
  as?: "article" | "div" | "li";
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}>;

export function Card({
  as: Component = "article",
  children,
  className,
  variant = "outlined",
}: CardProps) {
  return (
    <Component className={cn("card", `card--${variant}`, className)}>
      {children}
    </Component>
  );
}

type CardGridProps = Readonly<{
  children: ReactNode;
  className?: string;
  columns?: 2 | 3;
}>;

export function CardGrid({ children, className, columns = 3 }: CardGridProps) {
  const columnName = columns === 2 ? "two" : "three";

  return (
    <div className={cn("card-grid", `card-grid--${columnName}`, className)}>
      {children}
    </div>
  );
}
