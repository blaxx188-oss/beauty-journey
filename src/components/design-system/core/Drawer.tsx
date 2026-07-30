"use client";

/**
 * Drawer — Slide-in panel from the side (end = right in LTR, left in RTL).
 * Used for cart, filters, navigation panels.
 * Phase 13: Enhanced with focus trap and ARIA improvements.
 */

import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { focusTrap } from "@/components/design-system/foundations/accessibility";

// ============================================
// TYPES
// ============================================

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: "start" | "end";
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  className?: string;
}

// ============================================
// SIZE CLASSES
// ============================================

const sizeClasses: Record<string, string> = {
  sm: "w-80",
  md: "w-96",
  lg: "w-[480px]",
  xl: "w-[600px]",
};

// ============================================
// COMPONENT
// ============================================

function Drawer({
  open,
  onClose,
  children,
  title,
  side = "end",
  size = "md",
  showCloseButton = true,
  className,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    let cleanupFocusTrap: (() => void) | undefined;

    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      
      // Delay focus trap slightly to allow animation to start
      const timer = setTimeout(() => {
        cleanupFocusTrap = focusTrap(drawerRef.current);
      }, 100);

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
        if (cleanupFocusTrap) cleanupFocusTrap();
        clearTimeout(timer);
      };
    }
  }, [open, handleKeyDown]);

  const isStart = side === "start";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-drawer bg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            className={cn(
              "fixed top-0 h-full z-drawer bg-surface shadow-float overflow-y-auto focus:outline-none",
              isStart ? "start-0" : "end-0",
              sizeClasses[size],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ x: isStart ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isStart ? "-100%" : "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                {title && (
                  <h2 className="text-lg font-semibold text-text-primary font-heading">{title}</h2>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-sm hover:bg-neutral-secondary transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label="إغلاق"
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

Drawer.displayName = "Drawer";

export { Drawer };
export default Drawer;
