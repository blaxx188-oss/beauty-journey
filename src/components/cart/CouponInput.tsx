"use client";

/**
 * CouponInput — Coupon code input with validation and apply/remove.
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Check, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { validateCoupon } from "@/services/cart-service";

// ============================================
// COMPONENT
// ============================================

export default function CouponInput() {
  const [inputValue, setInputValue] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    couponCode,
    couponDiscount,
    couponType,
    isCouponValid,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const handleApply = useCallback(async () => {
    if (!inputValue.trim()) {
      setLocalError("أدخلي رمز الخصم");
      return;
    }

    setIsApplying(true);
    setLocalError(null);

    try {
      const result = await validateCoupon(inputValue.trim());

      if (result.isValid) {
        applyCoupon(inputValue.trim(), result.discount, result.type);
        setInputValue("");
      } else {
        setLocalError(result.message || "رمز الخصم غير صالح");
      }
    } catch {
      setLocalError("حدث خطأ أثناء التحقق من رمز الخصم");
    } finally {
      setIsApplying(false);
    }
  }, [inputValue, applyCoupon]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleApply();
      }
    },
    [handleApply]
  );

  return (
    <div className="space-y-3">
      {/* Coupon Header */}
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-text-secondary" />
        <h4 className="text-sm font-medium text-text-primary">رمز الخصم</h4>
      </div>

      {/* Active Coupon Display */}
      <AnimatePresence mode="wait">
        {isCouponValid && couponCode ? (
          <motion.div
            key="active-coupon"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between bg-success/5 border border-success/20 rounded-sm px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span className="text-sm text-text-primary font-medium">
                {couponCode}
              </span>
              <span className="text-xs text-success">
                {couponType === "percentage"
                  ? `خصم ${couponDiscount}%`
                  : `خصم ${couponDiscount} ج.م`}
              </span>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 text-text-secondary hover:text-error transition-colors"
              aria-label="إزالة رمز الخصم"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="input-coupon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-2"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value.toUpperCase());
                  setLocalError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="أدخلي رمز الخصم"
                className={`w-full px-4 py-3 text-sm bg-soft-pearl border rounded-sm text-text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-150 ${
                  localError ? "border-error" : "border-border"
                }`}
                dir="ltr"
                aria-label="رمز الخصم"
                aria-invalid={!!localError}
                disabled={isApplying}
              />
            </div>
            <button
              onClick={handleApply}
              disabled={isApplying || !inputValue.trim()}
              className="px-5 py-3 text-sm font-medium bg-text-primary text-white rounded-sm hover:bg-text-primary/90 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              aria-label="تطبيق رمز الخصم"
            >
              {isApplying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "تطبيق"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {localError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-error"
            role="alert"
          >
            {localError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
