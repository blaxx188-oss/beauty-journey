"use client";

/**
 * Toast — Success (Elegant Green), Error (Muted Burgundy), Info (Muted Blue).
 * Per spec: appears with smooth animation, auto-dismiss after 5s.
 */

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

// ============================================
// TYPES
// ============================================

type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

// ============================================
// STYLES
// ============================================

const typeStyles: Record<ToastType, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-success text-white",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  error: {
    bg: "bg-error text-white",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  info: {
    bg: "bg-info text-white",
    icon: <Info className="w-5 h-5" />,
  },
};

// ============================================
// COMPONENT
// ============================================

export default function Toast({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const style = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-[60] ${style.bg} px-6 py-3 rounded-sm shadow-lg flex items-center gap-3 min-w-[280px] max-w-[420px]`}
          role="alert"
          aria-live="assertive"
        >
          <span className="flex-shrink-0">{style.icon}</span>
          <p className="text-sm font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
