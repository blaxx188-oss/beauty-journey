"use client";

/**
 * Wishlist Store — Zustand-powered wishlist state management.
 * Persists to localStorage for guest users.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================
// TYPES
// ============================================

export interface WishlistItem {
  productId: string;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  currency: string;
  isInStock: boolean;
  addedAt: string;
  collectionId?: string;
}

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistActions {
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getItemsCount: () => number;
}

// ============================================
// STORE
// ============================================

const createWishlistStore = () =>
  create<WishlistState & WishlistActions>()(
    persist(
      (set, get) => ({
        items: [],

        addItem: (newItem) =>
          set((state) => {
            if (state.items.some((item) => item.productId === newItem.productId)) {
              return state;
            }
            return { items: [...state.items, newItem] };
          }),

        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.productId !== productId),
          })),

        isInWishlist: (productId) =>
          get().items.some((item) => item.productId === productId),

        clearWishlist: () => set({ items: [] }),

        getItemsCount: () => get().items.length,
      }),
      {
        name: "beauty-journey-wishlist",
        partialize: (state) => ({ items: state.items }),
      }
    )
  );

// ============================================
// PROVIDER WRAPPER
// ============================================

export const useWishlistStore = createWishlistStore();

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

