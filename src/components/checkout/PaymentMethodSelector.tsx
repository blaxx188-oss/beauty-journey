"use client";

/**
 * PaymentMethodSelector — Payment method selection with icons and descriptions.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Smartphone, Receipt, Check } from "lucide-react";
import type { PaymentMethodType } from "@/types";
import { PAYMENT_OPTIONS } from "@/services/payment";

// ============================================
// TYPES
// ============================================

interface PaymentMethodSelectorProps {
  selected: PaymentMethodType | null;
  onSelect: (method: PaymentMethodType) => void;
  codFee: number;
}

// ============================================
// METHOD ICONS
// ============================================

const METHOD_ICONS: Record<PaymentMethodType, React.ReactNode> = {
  card: <CreditCard className="w-5 h-5" />,
  fawry: <Receipt className="w-5 h-5" />,
  cod: <Banknote className="w-5 h-5" />,
  mobile_wallet: <Smartphone className="w-5 h-5" />,
};

// ============================================
// COMPONENT
// ============================================

export default function PaymentMethodSelector({
  selected,
  onSelect,
  codFee,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-text-primary" style={{ fontFamily: "var(--font-heading-ar)" }}>
          طريقة الدفع
        </h2>
        <p className="text-sm text-text-secondary">
          اختر طريقة الدفع المناسبة لك
        </p>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAYMENT_OPTIONS.filter((opt) => opt.available).map((option, index) => {
          const isSelected = selected === option.id;
          const displayFee = option.id === "cod" ? codFee : option.fee;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.2 }}
              className={`
                text-right p-4 border rounded-sm transition-all duration-200 relative
                ${
                  isSelected
                    ? "border-accent bg-accent/5 shadow-sm"
                    : "border-border hover:border-accent/50 hover:shadow-sm"
                }
              `}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.label} — ${option.description}`}
            >
              {/* Selection indicator */}
              <div
                className={`
                  absolute top-3 left-3 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200
                  ${
                    isSelected
                      ? "border-accent bg-accent"
                      : "border-border"
                  }
                `}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Option content */}
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 ${
                    isSelected ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  {METHOD_ICONS[option.id]}
                </span>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isSelected ? "text-accent" : "text-text-primary"
                    }`}
                  >
                    {option.label}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              {/* Fee indicator */}
              {displayFee > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-warning">
                    رسوم إضافية: {displayFee} ج.م
                  </span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Payment security note */}
      <div className="mt-4 p-3 bg-info/5 border border-info/20 rounded-sm">
        <p className="text-xs text-info">
          جميع المعاملات المالية مؤمنة ومشفرة بالكامل
        </p>
      </div>
    </div>
  );
}
