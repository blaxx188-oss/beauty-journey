"use client";

/**
 * Checkbox — Custom styled checkbox with label, indeterminate state.
 * RTL-aware, keyboard accessible, ARIA-compliant.
 */

import React, { useId, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import { Check, Minus } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  indeterminate?: boolean;
  error?: string;
}

// ============================================
// COMPONENT
// ============================================

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, indeterminate = false, error, id: externalId, className, ...props },
    ref
  ) => {
    const autoId = useId();
    const id = externalId || autoId;
    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;

    useEffect(() => {
      if (mergedRef.current) {
        mergedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, mergedRef]);

    return (
      <div className="flex items-start gap-3">
        <input
          ref={mergedRef}
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="sr-only peer"
          {...props}
        />

        {/* Custom Checkbox Visual */}
        <label
          htmlFor={id}
          className={cn(
            "flex items-center justify-center w-5 h-5 border rounded-sm cursor-pointer transition-all duration-150 shrink-0",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2",
            indeterminate || props.checked
              ? "bg-accent border-accent"
              : "border-border bg-surface hover:border-accent",
            error && "border-error",
            className
          )}
        >
          {indeterminate ? (
            <Minus className="w-3.5 h-3.5 text-white" />
          ) : props.checked ? (
            <Check className="w-3.5 h-3.5 text-white" />
          ) : null}
        </label>

        {/* Label Text */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm text-text-primary cursor-pointer leading-5"
          >
            {label}
          </label>
        )}

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

Checkbox.displayName = "Checkbox";

export { Checkbox };
export default Checkbox;
