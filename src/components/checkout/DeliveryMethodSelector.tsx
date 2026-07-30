"use client";

/**
 * DeliveryMethodSelector — Shipping method selection with cost display.
 * Arabic RTL, mobile-first, responsive, accessible.
 */

import React from "react";
import { motion } from "framer-motion";
import { Clock, Truck, Zap, Check } from "lucide-react";
import type { ShippingMethod, ShippingAddress } from "@/types";
import { getShippingOptions } from "@/services/shipping";

// ============================================
// TYPES
// ============================================

interface DeliveryMethodSelectorProps {
  selected: ShippingMethod | null;
  onSelect: (method: ShippingMethod) => void;
  shippingAddress: ShippingAddress | null;
}

// ============================================
// METHOD ICONS
// ============================================

const METHOD_ICONS: Record<ShippingMethod, React.ReactNode> = {
  standard: <Truck className="w-5 h-5" />,
  express: <Zap className="w-5 h-5" />,
  same_day: <Clock className="w-5 h-5" />,
};

// ============================================
// COMPONENT
// ============================================

export default function DeliveryMethodSelector({
  selected,
  onSelect,
  shippingAddress,
}: DeliveryMethodSelectorProps) {
  const options = getShippingOptions(shippingAddress?.governorate);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-text-primary" style={{ fontFamily: "var(--font-heading-ar)" }}>
          طريقة الشحن
        </h2>
        <p className="text-sm text-text-secondary">
          اختر طريقة الشحن المناسبة لك
        </p>
      </div>

      {/* Shipping Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selected === option.id;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              className={`
                w-full text-right p-4 border rounded-sm transition-all duration-200
                ${
                  isSelected
                    ? "border-accent bg-accent/5 shadow-sm"
                    : "border-border hover:border-accent/50 hover:shadow-sm"
                }
              `}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.label} — ${option.cost} ج.م`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Selection indicator */}
                  <div
                    className={`
                      flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200
                      ${
                        isSelected
                          ? "border-accent bg-accent"
                          : "border-border"
                      }
                    `}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>

                  {/* Option details */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                        ${
                          isSelected ? "text-accent" : "text-text-secondary"
                        }
                      `}
                    >
                      {METHOD_ICONS[option.id]}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isSelected ? "text-accent" : "text-text-primary"
                        }`}
                      >
                        {option.label}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cost */}
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${
                      isSelected ? "text-accent" : "text-text-primary"
                    }`}
                  >
                    {option.cost} ج.م
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Free shipping info */}
      <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-sm">
        <p className="text-xs text-success font-medium">
          شحن مجاني للطلبات أكثر من 500 ج.م
        </p>
      </div>
    </div>
  );
}
