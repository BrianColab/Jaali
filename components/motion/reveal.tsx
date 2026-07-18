"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

const easing = [0.22, 1, 0.36, 1] as const;

const revealVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  },
  hero: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  timeline: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
} satisfies Record<string, Variants>;

type RevealKind = keyof typeof revealVariants;

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  kind?: RevealKind;
  once?: boolean;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  kind = "fadeUp",
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? revealVariants.fadeIn : revealVariants[kind];

  return (
    <motion.div
      className={cn("motion-reveal", className)}
      variants={variants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : kind === "hero" ? 0.7 : 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: easing,
      }}
    >
      {children}
    </motion.div>
  );
}

type NamedRevealProps = Omit<RevealProps, "kind">;

export function FadeUp(props: NamedRevealProps) {
  return <Reveal kind="fadeUp" {...props} />;
}

export function FadeIn(props: NamedRevealProps) {
  return <Reveal kind="fadeIn" {...props} />;
}

export function SectionReveal(props: NamedRevealProps) {
  return <Reveal kind="fadeUp" {...props} />;
}

export function HeroReveal(props: NamedRevealProps) {
  return <Reveal kind="hero" {...props} />;
}

export function TimelineReveal(props: NamedRevealProps) {
  return <Reveal kind="timeline" {...props} />;
}

type HoverLiftProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function HoverLift({ children, className }: HoverLiftProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      transition={{ duration: 0.22, ease: easing }}
      {...(reduceMotion ? {} : { whileHover: { y: -2 } })}
    >
      {children}
    </motion.div>
  );
}
