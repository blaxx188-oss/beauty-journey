"use client";

/**
 * EmptyState — Empty content placeholder with icon, message, and optional action.
 */

import React from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-neutral-secondary mb-4">
          <span className="text-text-secondary">{icon}</span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  );
}

EmptyState.displayName = "EmptyState";

export { EmptyState };
export default EmptyState;
