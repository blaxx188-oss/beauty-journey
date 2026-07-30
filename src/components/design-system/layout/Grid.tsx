"use client";

/**
 * Grid — Responsive CSS Grid layout wrapper.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
    },
    gap: {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-10",
    },
  },
  defaultVariants: {
    columns: 4,
    gap: "md",
  },
});

export interface GridProps extends VariantProps<typeof gridVariants> {
  children: React.ReactNode;
  className?: string;
}

function Grid({ columns, gap, children, className }: GridProps) {
  return (
    <div className={cn(gridVariants({ columns, gap }), className)}>
      {children}
    </div>
  );
}

Grid.displayName = "Grid";

export { Grid, gridVariants };
export default Grid;
