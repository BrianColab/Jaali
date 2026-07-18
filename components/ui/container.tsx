import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/utils/cn";

type ContainerProps<TElement extends ElementType = "div"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

export function Container<TElement extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component className={cn("site-container", className)} {...props}>
      {children}
    </Component>
  );
}
