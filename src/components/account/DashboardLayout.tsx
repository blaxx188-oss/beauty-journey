"use client";

import React from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { Container } from "@/components/design-system/layout/Container";
import { Section } from "@/components/design-system/layout/Section";
import { useAuth } from "@/lib/auth-context";
import { LoadingState } from "@/components/design-system/core/LoadingState";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Protect route
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-secondary/20">
        <LoadingState message="جاري تحميل حسابك..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <Section className="py-8 md:py-12 bg-neutral-secondary/20 min-h-screen">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </Container>
    </Section>
  );
}
