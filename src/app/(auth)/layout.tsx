/**
 * Auth Layout — Shared layout for authentication pages.
 * Full-width, centered content with glassmorphism.
 */

import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
