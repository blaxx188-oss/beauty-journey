"use client";

/**
 * CheckoutLoading — Loading states for the checkout flow.
 * Shows skeleton screens and processing animations.
 */

import { motion } from "framer-motion";
import { Loader2, CreditCard, Shield } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface CheckoutLoadingProps {
  stage: "shipping" | "delivery" | "payment" | "review" | "processing" | "success";
}

// ============================================
// COMPONENT
// ============================================

export default function CheckoutLoading({ stage }: CheckoutLoadingProps) {
  if (stage === "processing") {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-6">
        {/* Processing Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-accent" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2
            className="text-xl font-bold text-text-primary"
            style={{ fontFamily: "var(--font-heading-ar)" }}
          >
            جاري معالجة الطلب...
          </h2>
          <p className="text-sm text-text-secondary">
            يرجى الانتظار، لا تغلق هذه الصفحة
          </p>
        </motion.div>

        {/* Processing Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 text-right"
        >
          <div className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-text-primary">تم إنشاء الطلب</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
            >
              <Loader2 className="w-3 h-3 text-white animate-spin" />
            </motion.div>
            <span className="text-text-primary">جاري معالجة الدفع...</span>
          </div>
          <div className="flex items-center gap-3 text-sm opacity-40">
            <div className="w-5 h-5 rounded-full border-2 border-border" />
            <span className="text-text-secondary">تأكيد الطلب</span>
          </div>
        </motion.div>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
          <Shield className="w-3.5 h-3.5" />
          <span>معاملة آمنة ومشفرة</span>
        </div>
      </div>
    );
  }

  // Skeleton loading for form steps
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-neutral-secondary rounded-sm" />
      <div className="h-4 w-72 bg-neutral-secondary rounded-sm" />
      <div className="space-y-4">
        <div className="h-12 w-full bg-neutral-secondary rounded-sm" />
        <div className="h-12 w-full bg-neutral-secondary rounded-sm" />
        <div className="h-12 w-full bg-neutral-secondary rounded-sm" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-12 bg-neutral-secondary rounded-sm" />
          <div className="h-12 bg-neutral-secondary rounded-sm" />
          <div className="h-12 bg-neutral-secondary rounded-sm" />
        </div>
      </div>
    </div>
  );
}
