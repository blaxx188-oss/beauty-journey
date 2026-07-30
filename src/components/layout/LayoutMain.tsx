/**
 * LayoutMain — Primary page layout wrapping content between Header and Footer.
 */

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

export default function LayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <MobileBottomNav />
      <Footer />
    </div>
  );
}
