"use client";

/**
 * Divider — Horizontal or vertical separator line.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const dividerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "h-full w-px self-stretch",
    },
    variant: {
      solid: "bg-border",
      dashed: "border-t border-dashed border-border",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
});

export interface DividerProps extends VariantProps<typeof dividerVariants> {
  className?: string;
  label?: string;
}

function Divider({ orientation, variant, className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className={cn(dividerVariants({ orientation: "horizontal", variant }), "flex-1")} />
        <span className="text-xs text-text-secondary whitespace-nowrap px-2">{label}</span>
        <div className={cn(dividerVariants({ orientation: "horizontal", variant }), "flex-1")} />
      </div>
    );
  }

  return <div role="separator" className={cn(dividerVariants({ orientation, variant }), className)} />;
}

Divider.displayName = "Divider";

export { Divider, dividerVariants };
export default Divider;
