"use client";

/**
 * Cart Store — Zustand-powered cart state management.
 * Handles guest (localStorage) and authenticated user cart merging.
 * Phase 8: Full shopping cart with coupon, save-for-later, stock validation,
 * max quantity validation, wishlist-to-cart, and synchronization architecture.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

// ============================================
// TYPES
// ============================================

export interface CartStoreState {
  items: CartItem[];
  savedForLater: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  couponDiscount: number;
  couponType: "percentage" | "fixed" | null;
  isCouponValid: boolean;
  isLoading: boolean;
  error: string | null;
  isSyncing: boolean;
}

export interface CartStoreActions {
  // Cart actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  addMultipleItems: (items: Omit<CartItem, "quantity">[]) => void;
  removeItem: (productId: string) => void;
  removeMultipleItems: (productIds: string[]) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;

  // Save for later
  moveToSaved: (productId: string) => void;
  moveToCart: (productId: string) => void;
  clearSavedForLater: () => void;

  // Coupon
  applyCoupon: (code: string, discount: number, type: "percentage" | "fixed") => void;
  removeCoupon: () => void;
  setCouponError: (error: string | null) => void;

  // Drawer
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Loading & Error
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSyncing: (isSyncing: boolean) => void;

  // Synchronization
  mergeCarts: (serverItems: CartItem[]) => void;

  // Computed
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  getShippingCost: (governorate?: string) => number;
  getEstimatedTax: () => number;
  getGrandTotal: (governorate?: string) => number;
  getFreeShippingProgress: () => number;
}

export type CartStore = CartStoreState & CartStoreActions;

// ============================================
// CONSTANTS
// ============================================

export const FREE_SHIPPING_THRESHOLD = 500;
export const SHIPPING_COST = 60;
export const FREE_SHIPPING_COST = 0;
export const TAX_RATE = 0.14; // 14% VAT
export const MAX_QUANTITY = 10;
export const DEFAULT_CURRENCY = "EGP";

// ============================================
// STORE
// ============================================

const createCartStore = () =>
  create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],
        savedForLater: [],
        isOpen: false,
        couponCode: null,
        couponDiscount: 0,
        couponType: null,
        isCouponValid: false,
        isLoading: false,
        error: null,
        isSyncing: false,

        // ── Cart Actions ──

        addItem: (newItem) =>
          set((state) => {
            // Check if already in cart
            const existingIndex = state.items.findIndex(
              (item) => item.productId === newItem.productId
            );

            if (existingIndex >= 0) {
              const updatedItems = [...state.items];
              const existing = updatedItems[existingIndex];
              const newQuantity = Math.min(
                existing.quantity + 1,
                existing.maxQuantity
              );
              updatedItems[existingIndex] = { ...existing, quantity: newQuantity };
              return { items: updatedItems, error: null };
            }

            // Check if in saved for later
            const savedIndex = state.savedForLater.findIndex(
              (item) => item.productId === newItem.productId
            );
            if (savedIndex >= 0) {
              const saved = state.savedForLater[savedIndex];
              const updatedSaved = state.savedForLater.filter(
                (_, i) => i !== savedIndex
              );
              return {
                items: [...state.items, { ...saved, quantity: 1 }],
                savedForLater: updatedSaved,
                error: null,
              };
            }

            return {
              items: [...state.items, { ...newItem, quantity: 1 }],
              error: null,
            };
          }),

        addMultipleItems: (newItems) =>
          set((state) => {
            let updatedItems = [...state.items];
            let updatedSaved = [...state.savedForLater];

            for (const newItem of newItems) {
              const existingIndex = updatedItems.findIndex(
                (item) => item.productId === newItem.productId
              );

              if (existingIndex >= 0) {
                const existing = updatedItems[existingIndex];
                const newQuantity = Math.min(
                  existing.quantity + 1,
                  existing.maxQuantity
                );
                updatedItems[existingIndex] = { ...existing, quantity: newQuantity };
              } else {
                // Check saved for later
                const savedIndex = updatedSaved.findIndex(
                  (item) => item.productId === newItem.productId
                );
                if (savedIndex >= 0) {
                  const saved = updatedSaved[savedIndex];
                  updatedSaved = updatedSaved.filter((_, i) => i !== savedIndex);
                  updatedItems = [...updatedItems, { ...saved, quantity: 1 }];
                } else {
                  updatedItems = [...updatedItems, { ...newItem, quantity: 1 }];
                }
              }
            }

            return { items: updatedItems, savedForLater: updatedSaved, error: null };
          }),

        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.productId !== productId),
            error: null,
          })),

        removeMultipleItems: (productIds) =>
          set((state) => ({
            items: state.items.filter(
              (item) => !productIds.includes(item.productId)
            ),
            error: null,
          })),

        updateQuantity: (productId, quantity) =>
          set((state) => {
            const clampedQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY));
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: clampedQuantity }
                  : item
              ),
              error: null,
            };
          }),

        increaseQuantity: (productId) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + 1, item.maxQuantity),
                  }
                : item
            ),
            error: null,
          })),

        decreaseQuantity: (productId) =>
          set((state) => {
            const item = state.items.find((i) => i.productId === productId);
            if (item && item.quantity <= 1) {
              return {
                items: state.items.filter((i) => i.productId !== productId),
                error: null,
              };
            }
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                  : item
              ),
              error: null,
            };
          }),

        clearCart: () =>
          set({
            items: [],
            savedForLater: [],
            couponCode: null,
            couponDiscount: 0,
            couponType: null,
            isCouponValid: false,
            error: null,
          }),

        // ── Save for Later ──

        moveToSaved: (productId) =>
          set((state) => {
            const item = state.items.find((i) => i.productId === productId);
            if (!item) return {};
            return {
              items: state.items.filter((i) => i.productId !== productId),
              savedForLater: [...state.savedForLater, item],
              error: null,
            };
          }),

        moveToCart: (productId) =>
          set((state) => {
            const item = state.savedForLater.find(
              (i) => i.productId === productId
            );
            if (!item) return {};
            return {
              savedForLater: state.savedForLater.filter(
                (i) => i.productId !== productId
              ),
              items: [...state.items, { ...item, quantity: 1 }],
              error: null,
            };
          }),

        clearSavedForLater: () => set({ savedForLater: [] }),

        // ── Coupon ──

        applyCoupon: (code, discount, type) =>
          set({
            couponCode: code,
            couponDiscount: discount,
            couponType: type,
            isCouponValid: true,
            error: null,
          }),

        removeCoupon: () =>
          set({
            couponCode: null,
            couponDiscount: 0,
            couponType: null,
            isCouponValid: false,
            error: null,
          }),

        setCouponError: (error) => set({ error }),

        // ── Drawer ──

        openCart: () => set({ isOpen: true }),
        closeCart: () => set({ isOpen: false }),
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

        // ── Loading & Error ──

        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        setSyncing: (isSyncing) => set({ isSyncing }),

        // ── Synchronization ──

        mergeCarts: (serverItems) =>
          set((state) => {
            const localMap = new Map(
              state.items.map((item) => [item.productId, item])
            );

            for (const serverItem of serverItems) {
              const localItem = localMap.get(serverItem.productId);
              if (localItem) {
                // Merge: take the larger quantity
                const mergedQty = Math.max(
                  localItem.quantity,
                  serverItem.quantity
                );
                localMap.set(serverItem.productId, {
                  ...serverItem,
                  quantity: mergedQty,
                });
              } else {
                localMap.set(serverItem.productId, serverItem);
              }
            }

            return { items: Array.from(localMap.values()), isSyncing: false };
          }),

        // ── Computed ──

        getTotalItems: () =>
          get().items.reduce((total, item) => total + item.quantity, 0),

        getSubtotal: () =>
          get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),

        getDiscountAmount: () => {
          const state = get();
          if (!state.isCouponValid || !state.couponType) return 0;

          const subtotal = state.getSubtotal();

          if (state.couponType === "percentage") {
            return (subtotal * state.couponDiscount) / 100;
          }

          return Math.min(state.couponDiscount, subtotal);
        },

        getTotal: () => {
          const state = get();
          const subtotal = state.getSubtotal();
          const discount = state.getDiscountAmount();
          return Math.max(0, subtotal - discount);
        },

        getShippingCost: (_governorate?: string) => {
          const state = get();
          const subtotal = state.getSubtotal();
          return subtotal >= FREE_SHIPPING_THRESHOLD
            ? FREE_SHIPPING_COST
            : SHIPPING_COST;
        },

        getEstimatedTax: () => {
          const state = get();
          const subtotal = state.getSubtotal();
          return Math.round(subtotal * TAX_RATE);
        },

        getGrandTotal: (governorate?: string) => {
          const state = get();
          const subtotal = state.getSubtotal();
          const discount = state.getDiscountAmount();
          const afterDiscount = Math.max(0, subtotal - discount);
          const shipping = afterDiscount >= FREE_SHIPPING_THRESHOLD
            ? FREE_SHIPPING_COST
            : SHIPPING_COST;
          const tax = Math.round(afterDiscount * TAX_RATE);
          return afterDiscount + shipping + tax;
        },

        getFreeShippingProgress: () => {
          const state = get();
          const subtotal = state.getSubtotal();
          return Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
        },
      }),
      {
        name: "beauty-journey-cart",
        partialize: (state) => ({
          items: state.items,
          savedForLater: state.savedForLater,
          couponCode: state.couponCode,
          couponDiscount: state.couponDiscount,
          couponType: state.couponType,
          isCouponValid: state.isCouponValid,
        }),
      }
    )
  );

// ============================================
// HOOK
// ============================================

export const useCartStore = createCartStore();

// ============================================
// PROVIDER WRAPPER
// ============================================

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
