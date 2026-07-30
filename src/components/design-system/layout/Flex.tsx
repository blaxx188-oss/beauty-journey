"use client";

/**
 * Flex — Low-level flex container with comprehensive props.
 */

import React from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: string | number;
  inline?: boolean;
  className?: string;
}

// ============================================
// HELPERS
// ============================================

const directionMap: Record<FlexDirection, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
};

const wrapMap: Record<FlexWrap, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

const alignMap: Record<FlexAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap: Record<FlexJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

// ============================================
// COMPONENT
// ============================================

function Flex({
  children,
  direction = "row",
  wrap = "nowrap",
  align = "center",
  justify = "start",
  gap,
  inline = false,
  className,
  ...rest
}: FlexProps) {
  const gapStyle = gap !== undefined ? { gap: typeof gap === "number" ? `${gap}px` : gap } : undefined;

  return (
    <div
      className={cn(
        inline ? "inline-flex" : "flex",
        directionMap[direction],
        wrapMap[wrap],
        alignMap[align],
        justifyMap[justify],
        className
      )}
      style={gapStyle}
      {...rest}
    >
      {children}
    </div>
  );
}

Flex.displayName = "Flex";

export { Flex };
export default Flex;
