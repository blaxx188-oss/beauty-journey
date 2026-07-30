"use client";

/**
 * Alert — Contextual feedback message with icon and close button.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";

// ============================================
// VARIANTS
// ============================================

const alertVariants = cva(
  "relative flex items-start gap-3 p-4 rounded-sm border text-sm",
  {
    variants: {
      variant: {
        info: "bg-info/5 border-info/20 text-text-primary",
        success: "bg-success/5 border-success/20 text-text-primary",
        warning: "bg-warning/5 border-warning/20 text-text-primary",
        error: "bg-error/5 border-error/20 text-text-primary",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// ============================================
// TYPES
// ============================================

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

// ============================================
// ICON MAP
// ============================================

const iconMap: Record<string, React.ReactNode> = {
  info: <Info className="w-5 h-5 text-info flex-shrink-0" />,
  success: <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />,
};

// ============================================
// COMPONENT
// ============================================

function Alert({ variant, title, children, onClose, icon, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
    >
      {/* Icon */}
      {icon || iconMap[variant || "info"]}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-medium mb-1">{title}</p>
        )}
        <div className="text-text-secondary">{children}</div>
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-sm hover:bg-black/5 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4 text-text-secondary" />
        </button>
      )}
    </div>
  );
}

Alert.displayName = "Alert";

export { Alert, alertVariants };
export default Alert;
