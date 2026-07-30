"use client";

/**
 * Checkout Store — Zustand-powered checkout state management.
 * Manages the multi-step checkout flow: shipping → delivery → payment → review.
 */

import { create } from "zustand";
import type {
  CheckoutStep,


  ShippingAddress,
  ShippingMethod,
  PaymentMethodType,
  DeliveryInfo,
  PaymentInfo,
  GuestInfo,
  AppliedCoupon,


  OrderCheckoutStatus,
} from "@/types";
import { calculateCheckoutTotals } from "@/services/checkout";

// ============================================
// TYPES
// ============================================

export interface CheckoutStoreState {
  currentStep: CheckoutStep;
  isGuest: boolean;
  guestInfo: GuestInfo | null;
  shippingAddress: ShippingAddress | null;
  selectedSavedAddress: string | null;
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  appliedCoupon: AppliedCoupon | null;
  orderNotes: string;
  billingSameAsShipping: boolean;
  termsAccepted: boolean;
  isLoading: boolean;
  error: string | null;
  orderStatus: OrderCheckoutStatus;
  lastOrderId: string | null;
  lastOrderNumber: string | null;
}

export interface CheckoutStoreActions {
  // Step navigation
  setStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  canProceed: () => boolean;

  // Guest mode
  setIsGuest: (isGuest: boolean) => void;
  setGuestInfo: (info: GuestInfo) => void;

  // Shipping address
  setShippingAddress: (address: ShippingAddress) => void;
  clearShippingAddress: () => void;
  setSelectedSavedAddress: (id: string | null) => void;

  // Delivery
  setShippingMethod: (method: ShippingMethod) => void;
  setDeliveryNotes: (notes: string) => void;
  setDeliveryInfo: (info: Partial<DeliveryInfo>) => void;

  // Payment
  setPaymentMethod: (method: PaymentMethodType) => void;
  setPaymentInfo: (info: Partial<PaymentInfo>) => void;

  // Coupon
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;

  // Order
  setOrderNotes: (notes: string) => void;
  setBillingSameAsShipping: (same: boolean) => void;
  setTermsAccepted: (accepted: boolean) => void;

  // Loading & Error
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOrderStatus: (status: OrderCheckoutStatus) => void;

  // Order result
  setLastOrder: (orderId: string, orderNumber: string) => void;

  // Reset
  resetCheckout: () => void;

  // Computed
  getSteps: () => { id: CheckoutStep; label: string; description: string; completed: boolean; current: boolean }[];
  getCurrentStepIndex: () => number;
  getTotalSteps: () => number;
}

export type CheckoutStore = CheckoutStoreState & CheckoutStoreActions;

// ============================================
// STEP DEFINITIONS
// ============================================

const CHECKOUT_STEPS: { id: CheckoutStep; label: string; description: string }[] = [
  {
    id: "shipping",
    label: "عنوان الشحن",
    description: "أدخل عنوان التوصيل",
  },
  {
    id: "delivery",
    label: "طريقة الشحن",
    description: "اختر طريقة الشحن",
  },
  {
    id: "payment",
    label: "طريقة الدفع",
    description: "اختر طريقة الدفع",
  },
  {
    id: "review",
    label: "مراجعة الطلب",
    description: "راجع طلبك وقم بالتأكيد",
  },
];

const STEP_ORDER: CheckoutStep[] = ["shipping", "delivery", "payment", "review"];

// ============================================
// STORE
// ============================================

export const useCheckoutStore = create<CheckoutStore>()((set, get) => ({
  // Initial state
  currentStep: "shipping",
  isGuest: false,
  guestInfo: null,
  shippingAddress: null,
  selectedSavedAddress: null,
  deliveryInfo: {
    method: null,
    estimatedDays: "",
    cost: 60,
    notes: "",
  },
  paymentInfo: {
    method: null,
  },
  appliedCoupon: null,
  orderNotes: "",
  billingSameAsShipping: true,
  termsAccepted: false,
  isLoading: false,
  error: null,
  orderStatus: "idle",
  lastOrderId: null,
  lastOrderNumber: null,

  // ── Step Navigation ──

  setStep: (step) => set({ currentStep: step, error: null }),

  nextStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[currentIndex + 1];
      set({ currentStep: nextStep, error: null });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  previousStep: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      const prevStep = STEP_ORDER[currentIndex - 1];
      set({ currentStep: prevStep, error: null });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  canProceed: () => {
    const state = get();
    switch (state.currentStep) {
      case "shipping":
        return (
          state.shippingAddress !== null &&
          state.shippingAddress.fullName.trim().length >= 2 &&
          state.shippingAddress.phoneNumber.trim().length >= 11 &&
          state.shippingAddress.governorate !== "" &&
          state.shippingAddress.city !== "" &&
          state.shippingAddress.area !== "" &&
          state.shippingAddress.street !== ""
        );
      case "delivery":
        return state.deliveryInfo.method !== null;
      case "payment":
        return state.paymentInfo.method !== null;
      case "review":
        return state.termsAccepted;
      default:
        return false;
    }
  },

  // ── Guest Mode ──

  setIsGuest: (isGuest) => set({ isGuest }),
  setGuestInfo: (info) => set({ guestInfo: info }),

  // ── Shipping Address ──

  setShippingAddress: (address) => set({ shippingAddress: address }),
  clearShippingAddress: () => set({ shippingAddress: null, selectedSavedAddress: null }),
  setSelectedSavedAddress: (id) => set({ selectedSavedAddress: id }),

  // ── Delivery ──

  setShippingMethod: (method) =>
    set((state) => ({
      deliveryInfo: {
        ...state.deliveryInfo,
        method,
      },
    })),

  setDeliveryNotes: (notes) =>
    set((state) => ({
      deliveryInfo: {
        ...state.deliveryInfo,
        notes,
      },
    })),

  setDeliveryInfo: (info) =>
    set((state) => ({
      deliveryInfo: {
        ...state.deliveryInfo,
        ...info,
      },
    })),

  // ── Payment ──

  setPaymentMethod: (method) =>
    set((state) => ({
      paymentInfo: {
        ...state.paymentInfo,
        method,
      },
    })),

  setPaymentInfo: (info) =>
    set((state) => ({
      paymentInfo: {
        ...state.paymentInfo,
        ...info,
      },
    })),

  // ── Coupon ──

  setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),

  // ── Order ──

  setOrderNotes: (notes) => set({ orderNotes: notes }),
  setBillingSameAsShipping: (same) => set({ billingSameAsShipping: same }),
  setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),

  // ── Loading & Error ──

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setOrderStatus: (status) => set({ orderStatus: status }),

  // ── Order Result ──

  setLastOrder: (orderId, orderNumber) =>
    set({ lastOrderId: orderId, lastOrderNumber: orderNumber }),

  // ── Reset ──

  resetCheckout: () =>
    set({
      currentStep: "shipping",
      isGuest: false,
      guestInfo: null,
      shippingAddress: null,
      selectedSavedAddress: null,
      deliveryInfo: {
        method: null,
        estimatedDays: "",
        cost: 60,
        notes: "",
      },
      paymentInfo: {
        method: null,
      },
      appliedCoupon: null,
      orderNotes: "",
      billingSameAsShipping: true,
      termsAccepted: false,
      isLoading: false,
      error: null,
      orderStatus: "idle",
      lastOrderId: null,
      lastOrderNumber: null,
    }),

  // ── Computed ──

  getSteps: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);

    return CHECKOUT_STEPS.map((step, index) => ({
      ...step,
      completed: index < currentIndex,
      current: index === currentIndex,
    }));
  },

  getCurrentStepIndex: () => {
    const { currentStep } = get();
    return STEP_ORDER.indexOf(currentStep);
  },

  getTotalSteps: () => STEP_ORDER.length,
}));
