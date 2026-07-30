"use client";

/**
 * Container — Max-width constrained content wrapper.
 * Responsive breakpoints: mobile (100%), tablet (768px), desktop (1280px).
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const containerVariants = cva("mx-auto w-full px-4", {
  variants: {
    size: {
      sm: "max-w-md",
      md: "max-w-3xl",
      lg: "max-w-5xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps extends VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

function Container({ size, children, className, asChild, ...props }: ContainerProps) {
  const Component = asChild ? "div" : "div";
  return (
    <Component className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </Component>
  );
}

Container.displayName = "Container";

export { Container, containerVariants };
export default Container;
