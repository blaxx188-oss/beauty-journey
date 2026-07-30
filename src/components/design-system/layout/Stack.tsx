"use client";

/**
 * Stack — Vertical or horizontal flex stack with consistent spacing.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    direction: "vertical",
    gap: "md",
    align: "start",
    justify: "start",
  },
});

export interface StackProps extends VariantProps<typeof stackVariants> {
  children: React.ReactNode;
  className?: string;
}

function Stack({ direction, gap, align, justify, children, className }: StackProps) {
  return (
    <div className={cn(stackVariants({ direction, gap, align, justify }), className)}>
      {children}
    </div>
  );
}

Stack.displayName = "Stack";

export { Stack, stackVariants };
export default Stack;
