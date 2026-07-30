"use client";

/**
 * CheckoutPageContent — Main checkout page controller.
 * Orchestrates the multi-step checkout flow with progress indicator,
 * order summary sidebar, and step-specific forms.
 */

import React, { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Lock } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useAuth } from "@/lib/auth-context";
import type { Variants } from "framer-motion";
import { useCheckout } from "@/hooks/use-checkout";
import {
  CheckoutProgress,
  ShippingAddressForm,
  GuestCheckoutForm,
  DeliveryMethodSelector,
  PaymentMethodSelector,
  CheckoutOrderSummary,
  OrderReview,
  DeliveryNotesInput,
  CheckoutLoading,
  CheckoutErrorBanner,
  CouponInput,
} from "@/components/checkout";
import type { AppliedCoupon } from "@/types";

// ============================================
// ANIMATION VARIANTS
// ============================================

const pageVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

// ============================================
// COMPONENT
// ============================================

export default function CheckoutPageContent() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  // Checkout state
  const {
    currentStep,
    isGuest,
    shippingAddress,
    selectedSavedAddress,
    deliveryInfo,
    paymentInfo,
    appliedCoupon,
    orderNotes,
    termsAccepted,
    isLoading,
    error,
    orderStatus,
    orderTotals,
    cartItems,
    steps,
    currentStepIndex,
    canGoNext,
    setStep,
    nextStep,
    previousStep,
    handleSetGuestMode,
    handleSetGuestInfo,
    handleSetAddress,
    handleSelectSavedAddress,
    handleSetShippingMethod,
    handleSetPaymentMethod,
    handleSetCoupon,
    setDeliveryNotes,
    setOrderNotes,
    setBillingSameAsShipping,
    setTermsAccepted,
    setError,
    resetCheckout,
    placeOrder,
  } = useCheckout();

  const clearCart = useCartStore((state) => state.clearCart);

  // Redirect if cart is empty
  const hasItems = cartItems.length > 0;

  useEffect(() => {
    if (!isAuthLoading && !hasItems) {
      router.replace("/cart");
    }
  }, [isAuthLoading, hasItems, router]);

  // Handle place order
  const handlePlaceOrder = useCallback(async () => {
    try {
      const result = await placeOrder();
      if (result) {
        const paymentMethod = paymentInfo.method || "cod";
        if (paymentMethod === "cod") {
          router.push(`/checkout/success?order=${result.orderNumber}`);
        } else {
          // Architecture: Redirect to Paymob or payment handler
          router.push(`/checkout/success?order=${result.orderNumber}`);
        }
      }
    } catch (err) {
      // Error is already set in the store
      router.push("/checkout/failed");
    }
  }, [placeOrder, paymentInfo.method, router]);

  const handleRetry = useCallback(() => {
    setError(null);
    setStep("review");
  }, [setError, setStep]);

  // Coupon application
  const handleApplyCoupon = useCallback(
    async (code: string): Promise<AppliedCoupon | null> => {
      // Architecture: Validate coupon via API
      // const result = await applyCoupon(code);

      // Simulate for architecture
      if (code === "BEAUTY10") {
        return {
          code,
          discount: 10,
          type: "percentage",
          message: "خصم 10% على كامل الطلب",
        };
      }
      if (code === "WELCOME50") {
        return {
          code,
          discount: 50,
          type: "fixed",
          message: "خصم 50 ج.م ثابت",
        };
      }

      return null;
    },
    []
  );

  const handleRemoveCoupon = useCallback(() => {
    handleSetCoupon(null);
  }, [handleSetCoupon]);

  // Show loading states
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <CheckoutLoading stage="processing" />
      </div>
    );
  }

  // Show order status pages
  if (orderStatus === "success" && cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <CheckoutLoading stage="success" />
      </div>
    );
  }

  if (orderStatus === "failed") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <CheckoutLoading stage="review" />
      </div>
    );
  }

  // If cart is empty and auth is loaded, don't render
  if (!isAuthLoading && !hasItems) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-10 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-text-primary mb-2"
          style={{ fontFamily: "var(--font-heading-ar)" }}
        >
          إتمام الطلب
        </h1>

        {/* Security badges */}
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            دفع آمن
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            تشفير كامل
          </span>
        </div>
      </div>

      {/* Error Banner */}
      <CheckoutErrorBanner message={error} onDismiss={() => setError(null)} />

      {/* Progress Indicator */}
      <CheckoutProgress
        steps={steps}
        onStepClick={(step) => {
          // Only allow going back to completed steps
          const stepIndex = steps.findIndex((s) => s.id === step);
          if (stepIndex < currentStepIndex) {
            setStep(step);
          }
        }}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form Steps */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* ── Shipping Step ── */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  {/* Guest/Logged-in toggle */}
                  {!user && (
                    <GuestCheckoutForm
                      onSubmit={handleSetGuestInfo}
                      defaultValues={null}
                    />
                  )}

                  <ShippingAddressForm
                    onSubmit={handleSetAddress}
                    defaultValues={shippingAddress}
                    savedAddresses={[]}
                    onSelectSaved={handleSelectSavedAddress}
                    isGuest={!user}
                  />

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => router.back()}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                      العودة
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!canGoNext}
                      className={`
                        px-6 py-3 text-sm font-medium rounded-sm transition-all duration-150
                        ${
                          canGoNext
                            ? "bg-accent text-white hover:bg-accent-hover"
                            : "bg-disabled text-white cursor-not-allowed"
                        }
                      `}
                    >
                      متابعة
                    </button>
                  </div>
                </div>
              )}

              {/* ── Delivery Step ── */}
              {currentStep === "delivery" && (
                <div className="space-y-6">
                  <DeliveryMethodSelector
                    selected={deliveryInfo.method}
                    onSelect={handleSetShippingMethod}
                    shippingAddress={shippingAddress}
                  />

                  <DeliveryNotesInput
                    value={deliveryInfo.notes}
                    onChange={setDeliveryNotes}
                  />

                  {/* Coupon */}
                  <CouponInput
                    onApply={handleApplyCoupon}
                    onRemove={handleRemoveCoupon}
                    appliedCoupon={appliedCoupon}
                  />

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={previousStep}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                      عنوان الشحن
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!canGoNext}
                      className={`
                        px-6 py-3 text-sm font-medium rounded-sm transition-all duration-150
                        ${
                          canGoNext
                            ? "bg-accent text-white hover:bg-accent-hover"
                            : "bg-disabled text-white cursor-not-allowed"
                        }
                      `}
                    >
                      متابعة
                    </button>
                  </div>
                </div>
              )}

              {/* ── Payment Step ── */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <PaymentMethodSelector
                    selected={paymentInfo.method}
                    onSelect={handleSetPaymentMethod}
                    codFee={25}
                  />

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={previousStep}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                    >
                      <ArrowRight className="w-4 h-4" />
                      طريقة الشحن
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!canGoNext}
                      className={`
                        px-6 py-3 text-sm font-medium rounded-sm transition-all duration-150
                        ${
                          canGoNext
                            ? "bg-accent text-white hover:bg-accent-hover"
                            : "bg-disabled text-white cursor-not-allowed"
                        }
                      `}
                    >
                      مراجعة الطلب
                    </button>
                  </div>
                </div>
              )}

              {/* ── Review Step ── */}
              {currentStep === "review" && shippingAddress && (
                <OrderReview
                  items={cartItems}
                  shippingAddress={shippingAddress}
                  shippingMethod={deliveryInfo.method || "standard"}
                  paymentMethod={paymentInfo.method || "cod"}
                  totals={orderTotals}
                  coupon={appliedCoupon}
                  orderNotes={orderNotes}
                  onEditStep={(step) => setStep(step)}
                  onPlaceOrder={handlePlaceOrder}
                  onAcceptTerms={setTermsAccepted}
                  termsAccepted={termsAccepted}
                  isLoading={isLoading}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutOrderSummary
            items={cartItems}
            totals={orderTotals}
            coupon={appliedCoupon}
            shippingAddress={shippingAddress}
          />
        </div>
      </div>
    </div>
  );
}
