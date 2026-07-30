"use client";

/**
 * CartPageContent — The main cart page content with all states.
 * Handles empty, loading, error, and filled cart states.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Trash2, Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import CartItemComponent from "@/components/cart/CartItem";
import CouponInput from "@/components/cart/CouponInput";
import OrderSummary from "@/components/cart/OrderSummary";
import ShippingSummary from "@/components/cart/ShippingSummary";
import FreeShippingProgress from "@/components/cart/FreeShippingProgress";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartLoadingState from "@/components/cart/CartLoadingState";
import CartErrorState from "@/components/cart/CartErrorState";
import { Breadcrumb } from "@/components/design-system/core/Breadcrumb";
import { Divider } from "@/components/design-system/core/Divider";

// ============================================
// BREADCRUMB ITEMS
// ============================================

const breadcrumbItems = [
  { label: "الرئيسية", href: "/" },
  { label: "سلة التسوق" },
];

// ============================================
// COMPONENT
// ============================================

export default function CartPageContent() {
  const {
    items,
    savedForLater,
    isLoading,
    error,
    clearCart,
    removeItem,
    moveToCart,
    clearSavedForLater,
  } = useCartStore();

  // ── State Handling ──

  if (isLoading) {
    return <CartLoadingState />;
  }

  if (error && items.length === 0) {
    return <CartErrorState />;
  }

  if (items.length === 0 && savedForLater.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-10 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-heading-ar)" }}>
          سلة التسوق
        </h1>
        {items.length > 1 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-error hover:text-error/80 transition-colors"
            aria-label="إفراغ سلة التسوق"
          >
            <Trash2 className="w-4 h-4" />
            <span>إفراغ السلة</span>
          </button>
        )}
      </div>

      {/* Free Shipping Progress */}
      {items.length > 0 && (
        <div className="mb-8">
          <FreeShippingProgress />
        </div>
      )}

      {/* Main Layout: Cart Items + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Cart Items Column */}
        <div className="space-y-6">
          {/* Cart Items List */}
          <div
            className="bg-surface border border-border rounded-sm p-6"
            role="list"
            aria-label="عناصر سلة التسوق"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-text-primary">
                المنتجات ({items.length})
              </h2>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItemComponent
                  key={item.productId}
                  item={item}
                  showSaveForLater={true}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Saved for Later */}
          {savedForLater.length > 0 && (
            <div className="bg-surface border border-border rounded-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  <h2 className="text-base font-semibold text-text-primary">
                    محفوظة للمُشتريات لاحقًا ({savedForLater.length})
                  </h2>
                </div>
                <button
                  onClick={clearSavedForLater}
                  className="text-xs text-text-secondary hover:text-error transition-colors"
                >
                  إزالة الكل
                </button>
              </div>

              <div className="space-y-4">
                {savedForLater.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 py-4 border-b border-border last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-secondary">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-sm font-medium text-text-primary hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-text-secondary hover:text-error transition-colors"
                          aria-label={`إزالة ${item.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-text-primary">
                          {item.price} {item.currency}
                        </span>
                        <button
                          onClick={() => moveToCart(item.productId)}
                          className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                          aria-label={`نقل ${item.title} إلى السلة`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>نقل إلى السلة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Column (Sticky on Desktop) */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
          {/* Order Summary Card */}
          <div className="bg-surface border border-border rounded-sm p-6 space-y-6">
            <h2 className="text-base font-semibold text-text-primary">
              ملخص الطلب
            </h2>

            <OrderSummary />

            <Divider />

            {/* Coupon Input */}
            <CouponInput />

            <Divider />

            {/* Shipping Summary */}
            <ShippingSummary />

            <Divider />

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="block w-full py-3.5 text-center text-sm font-medium bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-150"
              >
                إتمام الشراء
              </Link>
              <Link
                href="/products"
                className="block w-full py-3.5 text-center text-sm font-medium text-text-primary border border-border rounded-sm hover:bg-neutral-secondary transition-colors duration-150"
              >
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
