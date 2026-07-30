"use client";

/**
 * Switch — Toggle switch with label and description.
 * RTL-aware, keyboard accessible, ARIA-compliant.
 */

import React, { useId } from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

// ============================================
// COMPONENT
// ============================================

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, error, id: externalId, className, ...props }, ref) => {
    const autoId = useId();
    const id = externalId || autoId;

    return (
      <div className="flex items-center justify-between gap-4">
        {/* Label & Description (on the visual start side) */}
        {(label || description) && (
          <div className="flex flex-col gap-0.5 flex-1">
            {label && (
              <label
                htmlFor={id}
                className="text-sm font-medium text-text-primary cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-text-secondary">{description}</p>
            )}
          </div>
        )}

        {/* Switch Control */}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className="sr-only peer"
            {...props}
          />

          <label
            htmlFor={id}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2",
              props.checked
                ? "bg-accent"
                : "bg-neutral-secondary",
              className
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                props.checked
                  ? "translate-x-5 rtl:-translate-x-5"
                  : "translate-x-0.5 rtl:-translate-x-0.5"
              )}
            />
          </label>
        </div>

        {/* Error */}
        {error && (
          <p id={`${id}-error`} className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
export default Switch;
