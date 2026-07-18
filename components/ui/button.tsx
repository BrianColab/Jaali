import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "medium" | "large";

type SharedButtonProps = Readonly<{
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}>;

export type ButtonProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export function Button({
  children,
  className,
  size = "medium",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "button",
        `button--${variant}`,
        `button--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export type ButtonLinkProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className">;

export function ButtonLink({
  children,
  className,
  size = "medium",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "button",
        `button--${variant}`,
        `button--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
