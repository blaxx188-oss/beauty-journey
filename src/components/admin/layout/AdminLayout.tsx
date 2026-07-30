"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/design-system/core/LoadingState";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  // Route Protection is also handled by middleware, 
  // but we add this as a second layer for client-side navigation
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/forbidden");
      }
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-secondary/20">
        <LoadingState message="جاري تحميل لوحة التحكم..." />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-neutral-secondary/20 flex flex-row-reverse">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pr-72">
        <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="p-6 border-t border-border bg-white text-center text-xs text-text-secondary">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} Beauty Journey - لوحة تحكم المسؤول
        </footer>
      </div>
    </div>
  );
}
