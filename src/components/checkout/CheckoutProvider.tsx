"use client";

/**
 * CheckoutProvider — Context provider that ensures checkout store is initialized.
 * Can be extended with cart sync, address loading, and other pre-checkout logic.
 */

import React, { useEffect } from "react";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useCartStore } from "@/stores/cart-store";
import { useAuth } from "@/lib/auth-context";

interface CheckoutProviderProps {
  children: React.ReactNode;
}

export default function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const cartItems = useCartStore((state) => state.items);
  const setIsGuest = useCheckoutStore((state) => state.setIsGuest);

  useEffect(() => {
    // Set guest mode based on auth state
    if (!isAuthLoading) {
      setIsGuest(!user);
    }
  }, [isAuthLoading, user, setIsGuest]);

  return <>{children}</>;
}
