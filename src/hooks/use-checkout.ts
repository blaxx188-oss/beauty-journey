"use client";

/**
 * Checkout Hooks — High-level hooks for the checkout flow.
 * Wraps the checkout store with computed values and action wrappers.
 */

import { useCallback, useMemo } from "react";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useCartStore } from "@/stores/cart-store";
import type {
  ShippingAddress,
  ShippingMethod,
  PaymentMethodType,
  GuestInfo,
  AppliedCoupon,
  OrderTotals,
  CheckoutStep,
} from "@/types";
import {
  calculateCheckoutTotals,
  validateCartForCheckout,
  validateShippingAddress,
  generateOrderNumber,
} from "@/services/checkout";
import { calculateShippingCost } from "@/services/shipping";
import {
  processCOD,
  requiresOnlinePayment,
  getCODFee,
} from "@/services/payment";

// ============================================
// MAIN CHECKOUT HOOK
// ============================================

export function useCheckout() {
  // State selectors
  const currentStep = useCheckoutStore((state) => state.currentStep);
  const isGuest = useCheckoutStore((state) => state.isGuest);
  const guestInfo = useCheckoutStore((state) => state.guestInfo);
  const shippingAddress = useCheckoutStore((state) => state.shippingAddress);
  const selectedSavedAddress = useCheckoutStore((state) => state.selectedSavedAddress);
  const deliveryInfo = useCheckoutStore((state) => state.deliveryInfo);
  const paymentInfo = useCheckoutStore((state) => state.paymentInfo);
  const appliedCoupon = useCheckoutStore((state) => state.appliedCoupon);
  const orderNotes = useCheckoutStore((state) => state.orderNotes);
  const billingSameAsShipping = useCheckoutStore((state) => state.billingSameAsShipping);
  const termsAccepted = useCheckoutStore((state) => state.termsAccepted);
  const isLoading = useCheckoutStore((state) => state.isLoading);
  const error = useCheckoutStore((state) => state.error);
  const orderStatus = useCheckoutStore((state) => state.orderStatus);
  const lastOrderId = useCheckoutStore((state) => state.lastOrderId);
  const lastOrderNumber = useCheckoutStore((state) => state.lastOrderNumber);

  // Actions
  const setStep = useCheckoutStore((state) => state.setStep);
  const nextStep = useCheckoutStore((state) => state.nextStep);
  const previousStep = useCheckoutStore((state) => state.previousStep);
  const canProceed = useCheckoutStore((state) => state.canProceed);
  const setIsGuest = useCheckoutStore((state) => state.setIsGuest);
  const setGuestInfo = useCheckoutStore((state) => state.setGuestInfo);
  const setShippingAddress = useCheckoutStore((state) => state.setShippingAddress);
  const clearShippingAddress = useCheckoutStore((state) => state.clearShippingAddress);
  const setSelectedSavedAddress = useCheckoutStore((state) => state.setSelectedSavedAddress);
  const setShippingMethod = useCheckoutStore((state) => state.setShippingMethod);
  const setDeliveryNotes = useCheckoutStore((state) => state.setDeliveryNotes);
  const setDeliveryInfo = useCheckoutStore((state) => state.setDeliveryInfo);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const setPaymentInfo = useCheckoutStore((state) => state.setPaymentInfo);
  const setAppliedCoupon = useCheckoutStore((state) => state.setAppliedCoupon);
  const setOrderNotes = useCheckoutStore((state) => state.setOrderNotes);
  const setBillingSameAsShipping = useCheckoutStore((state) => state.setBillingSameAsShipping);
  const setTermsAccepted = useCheckoutStore((state) => state.setTermsAccepted);
  const setLoading = useCheckoutStore((state) => state.setLoading);
  const setError = useCheckoutStore((state) => state.setError);
  const setOrderStatus = useCheckoutStore((state) => state.setOrderStatus);
  const setLastOrder = useCheckoutStore((state) => state.setLastOrder);
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout);
  const getSteps = useCheckoutStore((state) => state.getSteps);
  const getCurrentStepIndex = useCheckoutStore((state) => state.getCurrentStepIndex);
  const getTotalSteps = useCheckoutStore((state) => state.getTotalSteps);

  // Cart data
  const cartItems = useCartStore((state) => state.items);
  const cartCouponCode = useCartStore((state) => state.couponCode);
  const cartCouponDiscount = useCartStore((state) => state.couponDiscount);
  const cartCouponType = useCartStore((state) => state.couponType);
  const isCouponValid = useCartStore((state) => state.isCouponValid);
  const clearCart = useCartStore((state) => state.clearCart);

  // Computed values
  const steps = useMemo(() => getSteps(), [getSteps]);
  const currentStepIndex = useMemo(() => getCurrentStepIndex(), [getCurrentStepIndex]);
  const totalSteps = useMemo(() => getTotalSteps(), [getTotalSteps]);
  const canGoNext = useMemo(() => canProceed(), [canProceed]);

  // Order totals calculation
  const orderTotals = useMemo((): OrderTotals => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discount =
      isCouponValid && cartCouponType
        ? cartCouponType === "percentage"
          ? (subtotal * cartCouponDiscount) / 100
          : Math.min(cartCouponDiscount, subtotal)
        : appliedCoupon?.discount || 0;

    const afterDiscount = Math.max(0, subtotal - discount);
    const shipping = shippingAddress
      ? calculateShippingCost(
          deliveryInfo.method || "standard",
          shippingAddress.governorate,
          afterDiscount
        )
      : 60;

    const tax = Math.round(afterDiscount * 0.14);
    const grandTotal = afterDiscount + shipping + tax;

    return {
      subtotal,
      discount,
      afterDiscount,
      shipping,
      tax,
      grandTotal,
    };
  }, [
    cartItems,
    isCouponValid,
    cartCouponType,
    cartCouponDiscount,
    appliedCoupon,
    shippingAddress,
    deliveryInfo.method,
  ]);

  // Validation
  const cartValidation = useMemo(
    () => validateCartForCheckout(cartItems),
    [cartItems]
  );

  const addressValidation = useMemo(
    () => (shippingAddress ? validateShippingAddress(shippingAddress) : { isValid: false, missingFields: [] }),
    [shippingAddress]
  );

  // Actions

  const handleSetGuestMode = useCallback(
    (isGuest: boolean) => {
      setIsGuest(isGuest);
    },
    [setIsGuest]
  );

  const handleSetGuestInfo = useCallback(
    (info: GuestInfo) => {
      setGuestInfo(info);
    },
    [setGuestInfo]
  );

  const handleSetAddress = useCallback(
    (address: ShippingAddress) => {
      setShippingAddress(address);
      setSelectedSavedAddress(null);
    },
    [setShippingAddress, setSelectedSavedAddress]
  );

  const handleSelectSavedAddress = useCallback(
    (id: string) => {
      setSelectedSavedAddress(id);
    },
    [setSelectedSavedAddress]
  );

  const handleSetShippingMethod = useCallback(
    (method: ShippingMethod) => {
      setShippingMethod(method);
    },
    [setShippingMethod]
  );

  const handleSetPaymentMethod = useCallback(
    (method: PaymentMethodType) => {
      setPaymentMethod(method);
    },
    [setPaymentMethod]
  );

  const handleSetCoupon = useCallback(
    (coupon: AppliedCoupon | null) => {
      setAppliedCoupon(coupon);
    },
    [setAppliedCoupon]
  );

  // Place order handler
  const placeOrder = useCallback(async () => {
    setLoading(true);
    setError(null);
    setOrderStatus("creating");

    try {
      // Validate cart
      if (!cartValidation.isValid) {
        throw new Error(cartValidation.errors.join("، "));
      }

      // Validate address
      if (!addressValidation.isValid) {
        throw new Error(
          `بيانات العنوان غير مكتملة: ${addressValidation.missingFields.join("، ")}`
        );
      }

      // Generate order number
      const orderNumber = generateOrderNumber();

      // Determine payment method
      const paymentMethod = paymentInfo.method || "cod";
      const isCOD = paymentMethod === "cod";

      // Architecture: In production, call the backend
      // For now, simulate the flow
      const orderId = crypto.randomUUID();

      // Handle COD
      if (isCOD) {
        setOrderStatus("success");
        setLastOrder(orderId, orderNumber);
        clearCart();
        return { orderId, orderNumber, status: "cod" as const };
      }

      // Online payment
      setOrderStatus("processing_payment");

      // Architecture: Initiate payment with Paymob
      // const paymentResult = await initiatePayment({
      //   orderId,
      //   paymentMethod,
      //   amount: orderTotals.grandTotal,
      //   currency: "EGP",
      //   customerName: shippingAddress!.fullName,
      //   customerEmail: isGuest ? guestInfo!.email : "",
      //   customerPhone: shippingAddress!.phoneNumber,
      // });

      // Simulate payment initiation
      const paymentIntentId = crypto.randomUUID();
      setLastOrder(orderId, orderNumber);
      setOrderStatus("success");
      clearCart();

      return {
        orderId,
        orderNumber,
        paymentIntentId,
        status: "requires_payment" as const,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء الطلب";
      setError(message);
      setOrderStatus("failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [
    cartValidation,
    addressValidation,
    paymentInfo.method,
    shippingAddress,
    guestInfo,
    isGuest,
    orderTotals,
    setLoading,
    setError,
    setOrderStatus,
    setLastOrder,
    clearCart,
  ]);

  return {
    // State
    currentStep,
    isGuest,
    guestInfo,
    shippingAddress,
    selectedSavedAddress,
    deliveryInfo,
    paymentInfo,
    appliedCoupon,
    orderNotes,
    billingSameAsShipping,
    termsAccepted,
    isLoading,
    error,
    orderStatus,
    lastOrderId,
    lastOrderNumber,
    orderTotals,
    cartItems,

    // Computed
    steps,
    currentStepIndex,
    totalSteps,
    canGoNext,
    cartValidation,
    addressValidation,

    // Actions
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
    setDeliveryInfo,
    setPaymentInfo,
    setOrderNotes,
    setBillingSameAsShipping,
    setTermsAccepted,
    setError,
    resetCheckout,
    placeOrder,
  };
}

// ============================================
// CHECKOUT STEP HOOK
// ============================================

export function useCheckoutStep() {
  const currentStep = useCheckoutStore((state) => state.currentStep);
  const setStep = useCheckoutStore((state) => state.setStep);
  const nextStep = useCheckoutStore((state) => state.nextStep);
  const previousStep = useCheckoutStore((state) => state.previousStep);
  const getSteps = useCheckoutStore((state) => state.getSteps);

  const steps = useMemo(() => getSteps(), [getSteps]);

  return {
    currentStep,
    steps,
    setStep,
    nextStep,
    previousStep,
  };
}

// ============================================
// PAYMENT HOOK
// ============================================

export function usePayment() {
  const paymentInfo = useCheckoutStore((state) => state.paymentInfo);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const setPaymentInfo = useCheckoutStore((state) => state.setPaymentInfo);

  const isCOD = useMemo(() => paymentInfo.method === "cod", [paymentInfo.method]);
  const needsOnlinePayment = useMemo(
    () => (paymentInfo.method ? requiresOnlinePayment(paymentInfo.method) : false),
    [paymentInfo.method]
  );

  const codFee = useMemo(() => (isCOD ? getCODFee() : 0), [isCOD]);

  return {
    paymentInfo,
    isCOD,
    needsOnlinePayment,
    codFee,
    setPaymentMethod,
    setPaymentInfo,
  };
}
