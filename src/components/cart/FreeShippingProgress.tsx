"use client";

/**
 * FreeShippingProgress — Progress bar showing distance to free shipping.
 */

import React from "react";
import { motion } from "framer-motion";
import { Truck, Gift } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/utils/format";

export default function FreeShippingProgress() {
  const subtotal = useCartStore((state) => state.getSubtotal());
  const progress = useCartStore((state) => state.getFreeShippingProgress());
  const isEligible = subtotal >= 500;
  const remaining = Math.max(0, 500 - subtotal);

  return (
    <div className="space-y-2">
      {/* Progress Track */}
      <div className="w-full h-2 bg-neutral-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isEligible ? "bg-success" : "bg-accent"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.5, 1] }}
        />
      </div>

      {/* Message */}
      <div className="flex items-center gap-2">
        {isEligible ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-success text-sm"
          >
            <Gift className="w-4 h-4" />
            <span className="font-medium">
              🎉 حصلتِ على شحن مجاني!
            </span>
          </motion.div>
        ) : (
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Truck className="w-4 h-4" />
            <span>
              أضيفي{" "}
              <span className="font-semibold text-accent">
                {formatPrice(remaining)}
              </span>{" "}
              للحصول على شحن مجاني
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
