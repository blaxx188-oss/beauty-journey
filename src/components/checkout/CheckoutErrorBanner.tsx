"use client";

/**
 * CheckoutErrorBanner — Error display banner for checkout steps.
 * Animated error notification with dismiss capability.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface CheckoutErrorBannerProps {
  message: string | null;
  onDismiss?: () => void;
}

export default function CheckoutErrorBanner({
  message,
  onDismiss,
}: CheckoutErrorBannerProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-error/5 border border-error/20 rounded-sm p-4 flex items-start gap-3 mb-4 overflow-hidden"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error flex-1">{message}</p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-error hover:text-error-hover transition-colors flex-shrink-0"
              aria-label="إغلاق رسالة الخطأ"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
