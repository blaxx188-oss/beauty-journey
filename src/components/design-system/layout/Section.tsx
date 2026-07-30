"use client";

/**
 * Section — Vertical content section with consistent padding.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const sectionVariants = cva("", {
  variants: {
    padding: {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    },
    variant: {
      default: "bg-surface",
      muted: "bg-neutral-primary",
      accent: "bg-accent text-white",
      dark: "bg-midnight-onyx text-white",
    },
  },
  defaultVariants: {
    padding: "md",
    variant: "default",
  },
});

export interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function Section({ padding, variant, children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn(sectionVariants({ padding, variant }), className)}>
      {children}
    </section>
  );
}

Section.displayName = "Section";

export { Section, sectionVariants };
export default Section;
