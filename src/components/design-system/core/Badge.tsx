"use client";

/**
 * Badge — Small inline status/label indicator.
 * Variants: default, success, error, warning, info, accent
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// ============================================
// VARIANTS
// ============================================

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-sm transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-neutral-secondary text-text-primary",
        success: "bg-success/10 text-success",
        error: "bg-error/10 text-error",
        warning: "bg-warning/10 text-warning",
        info: "bg-info/10 text-info",
        accent: "bg-accent/10 text-accent",
      },
      size: {
        sm: "px-1.5 py-0 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================
// TYPES
// ============================================

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function Badge({ variant, size, children, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export default Badge;
