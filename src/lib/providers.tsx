"use client";

/**
 * Providers — Wraps all client-side context providers.
 * Order matters: ThemeProvider > AuthProvider > QueryProvider > Zustand stores.
 */

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-context";
import { AuthProvider } from "./auth-context";
import { CartProvider } from "@/stores/cart-store";
import { WishlistProvider } from "@/stores/wishlist-store";
import { ToastProvider } from "@/components/design-system/core/Toast";

// React Query client with optimal defaults for ecommerce
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider initialLocale="ar">
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
