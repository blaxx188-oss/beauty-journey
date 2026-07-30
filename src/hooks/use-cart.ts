"use client";

/**
 * useCart Hook — High-level hook wrapping the cart store.
 * Provides derived state, computed values, and convenient action wrappers.
 */

import { useCallback, useMemo } from "react";
import { useCartStore } from "@/stores/cart-store";
import type { CartItem } from "@/types";
import {
  calculateSubtotal,
  calculateDiscount,
  calculateShipping,
  calculateTax,
  getFreeShippingProgress,
  formatFreeShippingMessage,
  countTotalItems,
} from "@/utils/cart-utils";

// ============================================
// HOOK
// ============================================

export function useCart() {
  // Selectors
  const items = useCartStore((state) => state.items);
  const savedForLater = useCartStore((state) => state.savedForLater);
  const isOpen = useCartStore((state) => state.isOpen);
  const isLoading = useCartStore((state) => state.isLoading);
  const error = useCartStore((state) => state.error);
  const isSyncing = useCartStore((state) => state.isSyncing);
  const couponCode = useCartStore((state) => state.couponCode);
  const couponDiscount = useCartStore((state) => state.couponDiscount);
  const couponType = useCartStore((state) => state.couponType);
  const isCouponValid = useCartStore((state) => state.isCouponValid);

  // Actions
  const addItem = useCartStore((state) => state.addItem);
  const addMultipleItems = useCartStore((state) => state.addMultipleItems);
  const removeItem = useCartStore((state) => state.removeItem);
  const removeMultipleItems = useCartStore((state) => state.removeMultipleItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const moveToSaved = useCartStore((state) => state.moveToSaved);
  const moveToCart = useCartStore((state) => state.moveToCart);
  const clearSavedForLater = useCartStore((state) => state.clearSavedForLater);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const setLoading = useCartStore((state) => state.setLoading);
  const setError = useCartStore((state) => state.setError);

  // Computed values (memoized)
  const totalItems = useMemo(() => countTotalItems(items), [items]);
  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const discount = useMemo(
    () => calculateDiscount(subtotal, couponDiscount, couponType, isCouponValid),
    [subtotal, couponDiscount, couponType, isCouponValid]
  );
  const afterDiscount = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount]);
  const shipping = useMemo(() => calculateShipping(afterDiscount), [afterDiscount]);
  const tax = useMemo(() => calculateTax(afterDiscount), [afterDiscount]);
  const grandTotal = useMemo(() => afterDiscount + shipping + tax, [afterDiscount, shipping, tax]);
  const freeShippingProgress = useMemo(() => getFreeShippingProgress(subtotal), [subtotal]);
  const freeShippingMessage = useMemo(() => formatFreeShippingMessage(subtotal), [subtotal]);
  const isFreeShipping = useMemo(() => subtotal >= 500, [subtotal]);

  // Helper: check if item is in cart
  const isItemInCart = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items]
  );

  // Helper: get cart item by product ID
  const getCartItem = useCallback(
    (productId: string) => items.find((item) => item.productId === productId),
    [items]
  );

  // Helper: handle add to cart with drawer feedback
  const handleAddToCart = useCallback(
    (product: Omit<CartItem, "quantity">) => {
      addItem(product);
      openCart();
    },
    [addItem, openCart]
  );

  // Derived state object
  const cart = useMemo(
    () => ({
      // State
      items,
      savedForLater,
      isOpen,
      isLoading,
      error,
      isSyncing,
      couponCode,
      couponDiscount,
      couponType,
      isCouponValid,

      // Computed
      totalItems,
      subtotal,
      discount,
      afterDiscount,
      shipping,
      tax,
      grandTotal,
      freeShippingProgress,
      freeShippingMessage,
      isFreeShipping,

      // Helpers
      isItemInCart,
      getCartItem,

      // Actions
      addItem,
      addMultipleItems,
      removeItem,
      removeMultipleItems,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      moveToSaved,
      moveToCart,
      clearSavedForLater,
      applyCoupon,
      removeCoupon,
      openCart,
      closeCart,
      toggleCart,
      setLoading,
      setError,
      handleAddToCart,
    }),
    [
      items,
      savedForLater,
      isOpen,
      isLoading,
      error,
      isSyncing,
      couponCode,
      couponDiscount,
      couponType,
      isCouponValid,
      totalItems,
      subtotal,
      discount,
      afterDiscount,
      shipping,
      tax,
      grandTotal,
      freeShippingProgress,
      freeShippingMessage,
      isFreeShipping,
      isItemInCart,
      getCartItem,
      addItem,
      addMultipleItems,
      removeItem,
      removeMultipleItems,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      moveToSaved,
      moveToCart,
      clearSavedForLater,
      applyCoupon,
      removeCoupon,
      openCart,
      closeCart,
      toggleCart,
      setLoading,
      setError,
      handleAddToCart,
    ]
  );

  return cart;
}

// ============================================
// CART COUPON HOOK
// ============================================

export function useCartCoupon() {
  const couponCode = useCartStore((state) => state.couponCode);
  const couponDiscount = useCartStore((state) => state.couponDiscount);
  const couponType = useCartStore((state) => state.couponType);
  const isCouponValid = useCartStore((state) => state.isCouponValid);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const setCouponError = useCartStore((state) => state.setCouponError);

  return {
    couponCode,
    couponDiscount,
    couponType,
    isCouponValid,
    applyCoupon,
    removeCoupon,
    setCouponError,
  };
}

// ============================================
// CART SYNCHRONIZATION HOOK
// ============================================

export function useCartSync() {
  const isSyncing = useCartStore((state) => state.isSyncing);
  const mergeCarts = useCartStore((state) => state.mergeCarts);
  const setSyncing = useCartStore((state) => state.setSyncing);

  return {
    isSyncing,
    mergeCarts,
    setSyncing,
  };
}
