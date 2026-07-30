"use client";

/**
 * CouponInput — Coupon code entry with validation and feedback.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/design-system/core";
import type { AppliedCoupon } from "@/types";

// ============================================
// TYPES
// ============================================

interface CouponInputProps {
  onApply: (code: string) => Promise<AppliedCoupon | null>;
  onRemove: () => void;
  appliedCoupon: AppliedCoupon | null;
}

// ============================================
// COMPONENT
// ============================================

export default function CouponInput({
  onApply,
  onRemove,
  appliedCoupon,
}: CouponInputProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await onApply(code.trim().toUpperCase());
      if (!result) {
        setError("كود الخصم غير صالح أو منتهي الصلاحية");
      }
    } catch {
      setError("حدث خطأ في التحقق من كود الخصم");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
        <Tag className="w-4 h-4 text-accent" />
        كود الخصم
      </h3>

      <AnimatePresence mode="wait">
        {appliedCoupon ? (
          <motion.div
            key="applied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-sm"
          >
            <Check className="w-4 h-4 text-success flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-success">
                {appliedCoupon.message}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                كود: {appliedCoupon.code}
              </p>
            </div>
            <button
              onClick={onRemove}
              className="text-error hover:text-error-hover transition-colors"
              aria-label="إزالة كود الخصم"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-2"
          >
            <div className="flex-1">
              <Input
                placeholder="أدخل كود الخصم"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                error={error ?? undefined}
                disabled={isLoading}
                aria-label="كود الخصم"
              />
            </div>
            <button
              onClick={handleApply}
              disabled={!code.trim() || isLoading}
              className={`
                flex-shrink-0 px-4 py-3 text-sm font-medium rounded-sm transition-all duration-150
                ${
                  !code.trim() || isLoading
                    ? "bg-disabled text-white cursor-not-allowed"
                    : "bg-accent text-white hover:bg-accent-hover"
                }
              `}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "تطبيق"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
