"use client";

/**
 * ResponsiveWrapper — Conditional rendering based on viewport size.
 * Uses a simple CSS display approach for reliability without JS measurement.
 */

import React from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface ResponsiveWrapperProps {
  show?: Breakpoint | Breakpoint[];
  hide?: Breakpoint | Breakpoint[];
  children: React.ReactNode;
  className?: string;
}

// ============================================
// VISIBILITY MAPS
// ============================================

const showMap: Record<Breakpoint, string> = {
  mobile: "block sm:hidden",
  tablet: "hidden sm:block lg:hidden",
  desktop: "hidden lg:block",
};

const hideMap: Record<Breakpoint, string> = {
  mobile: "hidden sm:block",
  tablet: "block sm:hidden lg:block",
  desktop: "block lg:hidden",
};

// ============================================
// HELPERS
// ============================================

function getVisibilityClasses(
  show?: Breakpoint | Breakpoint[],
  hide?: Breakpoint | Breakpoint[]
): string {
  if (show && !Array.isArray(show)) show = [show];
  if (hide && !Array.isArray(hide)) hide = [hide];

  if (show) {
    return (show as Breakpoint[]).map((bp) => showMap[bp]).join(" ");
  }

  if (hide) {
    return (hide as Breakpoint[]).map((bp) => hideMap[bp]).join(" ");
  }

  return "";
}

// ============================================
// COMPONENT
// ============================================

function ResponsiveWrapper({ show, hide, children, className }: ResponsiveWrapperProps) {
  const visibility = getVisibilityClasses(show, hide);

  if (!show && !hide) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn(visibility, className)}>
      {children}
    </div>
  );
}

// ============================================
// CONVENIENCE COMPONENTS
// ============================================

export function MobileOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ResponsiveWrapper show="mobile" className={className}>{children}</ResponsiveWrapper>;
}

export function TabletOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ResponsiveWrapper show="tablet" className={className}>{children}</ResponsiveWrapper>;
}

export function DesktopOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ResponsiveWrapper show="desktop" className={className}>{children}</ResponsiveWrapper>;
}

ResponsiveWrapper.displayName = "ResponsiveWrapper";

export { ResponsiveWrapper, getVisibilityClasses };
export default ResponsiveWrapper;
