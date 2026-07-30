/**
 * Main Layout — Wraps all public pages with Header, Footer, and MobileBottomNav.
 */

import React from "react";
import LayoutMain from "@/components/layout/LayoutMain";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutMain>{children}</LayoutMain>;
}
