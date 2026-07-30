"use client";

/**
 * Modal — Accessible modal dialog with overlay, focus trap, and keyboard dismiss.
 */

import React, { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

// ============================================
// SIZE CLASSES
// ============================================

const sizeClasses: Record<string, string> = {
  sm: "max-w-sm w-full",
  md: "max-w-md w-full",
  lg: "max-w-lg w-full",
  xl: "max-w-2xl w-full",
  full: "w-full h-full max-w-none max-h-none",
};

// ============================================
// COMPONENT
// ============================================

function Modal({
  open,
  onClose,
  children,
  title,
  description,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save and restore focus
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        const elements = Array.from(focusable);
        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-modal bg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-modal flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            aria-describedby={description ? "modal-description" : undefined}
          >
            <motion.div
              ref={modalRef}
              className={cn(
                "relative bg-surface rounded-md shadow-float overflow-hidden",
                sizeClasses[size],
                size === "full" ? "rounded-none" : "",
                className
              )}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.8, 0.5, 1] }}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                  <div>
                    {title && (
                      <h2 className="text-lg font-semibold text-text-primary font-heading">{title}</h2>
                    )}
                    {description && (
                      <p id="modal-description" className="text-sm text-text-secondary mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-2 rounded-sm hover:bg-neutral-secondary transition-colors"
                      aria-label="إغلاق"
                    >
                      <X className="w-5 h-5 text-text-secondary" />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="px-6 py-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

Modal.displayName = "Modal";

export { Modal };
export default Modal;
