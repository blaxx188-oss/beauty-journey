"use client";

/**
 * Radio — Custom styled radio button with label.
 * RTL-aware, keyboard accessible, ARIA-compliant.
 */

import React, { useId } from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

// ============================================
// COMPONENT
// ============================================

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, error, id: externalId, className, ...props }, ref) => {
    const autoId = useId();
    const id = externalId || autoId;

    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="radio"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="sr-only peer"
          {...props}
        />

        {/* Custom Radio Visual */}
        <label
          htmlFor={id}
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-150 shrink-0",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-accent peer-focus-visible:outline-offset-2",
            props.checked
              ? "border-accent"
              : "border-border bg-surface hover:border-accent",
            error && "border-error",
            className
          )}
        >
          {props.checked && (
            <span className="w-2.5 h-2.5 rounded-full bg-accent transition-transform duration-150" />
          )}
        </label>

        {/* Label & Description */}
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className="text-sm text-text-primary cursor-pointer leading-5"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-text-secondary">{description}</p>
            )}
          </div>
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

Radio.displayName = "Radio";

export { Radio };
export default Radio;
