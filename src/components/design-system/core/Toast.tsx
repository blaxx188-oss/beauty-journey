"use client";

/**
 * Toast — Auto-dismissing notification with variants.
 * Includes a simple toast queue system via React Context.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

// ============================================
// TYPES
// ============================================

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastData {
  id: string;
  message: string;
  title?: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastData[];
  toast: (toast: Omit<ToastData, "id">) => void;
  dismiss: (id: string) => void;
  clear: () => void;
}

// ============================================
// CONTEXT
// ============================================

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, clear }}>
      {children}
    </ToastContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// ============================================
// TOAST ITEM
// ============================================

const iconMap: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-success" />,
  error: <AlertCircle className="w-5 h-5 text-error" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning" />,
  info: <Info className="w-5 h-5 text-info" />,
};

function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [duration, toast.id, onDismiss]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 p-4 bg-surface rounded-sm shadow-md border border-border min-w-[300px] max-w-[480px]",
        toast.variant === "success" && "border-success/20",
        toast.variant === "error" && "border-error/20",
        toast.variant === "warning" && "border-warning/20",
      )}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon */}
      <span className="flex-shrink-0 mt-0.5">{iconMap[toast.variant]}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-medium text-sm text-text-primary mb-0.5">{toast.title}</p>
        )}
        <p className="text-sm text-text-secondary">{toast.message}</p>
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 p-1 rounded-sm hover:bg-neutral-secondary transition-colors"
        aria-label="إغلاق"
      >
        <X className="w-4 h-4 text-text-secondary" />
      </button>
    </motion.div>
  );
}

// ============================================
// TOAST CONTAINER
// ============================================

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="fixed top-4 start-4 z-toast flex flex-col gap-3"
      aria-label="الإشعارات"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
