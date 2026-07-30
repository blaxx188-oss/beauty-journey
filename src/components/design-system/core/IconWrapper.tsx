"use client";

/**
 * IconWrapper — Consistent wrapper for icons with size, color, and background control.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const iconWrapperVariants = cva(
  "inline-flex items-center justify-center rounded-sm transition-colors duration-150",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
      },
      variant: {
        default: "bg-neutral-secondary text-text-primary",
        accent: "bg-accent/10 text-accent",
        muted: "bg-neutral-secondary text-text-secondary",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface IconWrapperProps extends VariantProps<typeof iconWrapperVariants> {
  children: React.ReactNode;
  className?: string;
}

function IconWrapper({ size, variant, children, className }: IconWrapperProps) {
  return (
    <span className={cn(iconWrapperVariants({ size, variant }), className)}>
      {children}
    </span>
  );
}

IconWrapper.displayName = "IconWrapper";

export { IconWrapper, iconWrapperVariants };
export default IconWrapper;
