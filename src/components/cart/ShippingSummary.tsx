"use client";

/**
 * ShippingSummary — Estimated shipping information with
 * free shipping progress bar.
 */

import React from "react";
import { motion } from "framer-motion";
import { Truck, Gift } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/utils/format";

// ============================================
// COMPONENT
// ============================================

export default function ShippingSummary() {
  const { getSubtotal, getFreeShippingProgress } = useCartStore();
  const subtotal = getSubtotal();
  const progress = getFreeShippingProgress();
  const isEligible = subtotal >= 500;
  const remaining = Math.max(0, 500 - subtotal);

  return (
    <div className="space-y-3">
      {/* Shipping Header */}
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-text-secondary" />
        <h4 className="text-sm font-medium text-text-primary">
          معلومات الشحن
        </h4>
      </div>

      {/* Free Shipping Progress */}
      <div className="bg-neutral-secondary/50 rounded-sm p-4 space-y-3">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-neutral-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.5, 1] }}
          />
        </div>

        {/* Progress Message */}
        <div className="flex items-center gap-2">
          {isEligible ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 text-success"
            >
              <Gift className="w-4 h-4" />
              <span className="text-xs font-medium">
                🎉 حصلتِ على شحن مجاني!
              </span>
            </motion.div>
          ) : (
            <p className="text-xs text-text-secondary">
              أضيفي{" "}
              <span className="font-semibold text-accent">
                {formatPrice(remaining)}
              </span>{" "}
              للحصول على شحن مجاني
            </p>
          )}
        </div>

        {/* Shipping Estimate */}
        <div className="text-xs text-text-secondary/80">
          <p>
            • الشحن خلال {isEligible ? "2-3" : "3-5"} أيام عمل
          </p>
          <p>
            • التكلفة:{" "}
            {isEligible ? (
              <span className="text-success font-medium">مجاني</span>
            ) : (
              <span className="font-medium">{formatPrice(60)}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
