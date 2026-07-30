"use client";

/**
 * Input — Text input with floating label, focus/error states.
 * Per spec: 1px Warm Taupe border, 4px radius, Rose Gold focus, Muted Burgundy error.
 */

import React, { useId, useState } from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

// ============================================
// COMPONENT
// ============================================

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, rightIcon, leftIcon, id: externalId, className, ...props }, ref) => {
    const autoId = useId();
    const id = externalId || autoId;
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value !== undefined && props.value !== "";

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            className={cn(
              "w-full h-12 px-4 text-base bg-transparent border rounded-sm transition-colors duration-150 peer",
              "placeholder:text-placeholder placeholder:text-base",
              "focus:outline-none focus:ring-0",
              error
                ? "border-error text-error"
                : isFocused || hasValue
                ? "border-accent text-text-primary"
                : "border-border text-text-primary",
              rightIcon && "pl-10",
              leftIcon && "pr-10",
              label && "pt-4 pb-1",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Floating Label */}
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute right-4 transition-all duration-150 pointer-events-none",
                isFocused || hasValue || props.value
                  ? "top-1 text-xs"
                  : "top-3.5 text-base",
                error
                  ? "text-error"
                  : isFocused
                  ? "text-accent"
                  : "text-placeholder"
              )}
            >
              {label}
            </label>
          )}

          {/* Left Icon (RTL: right side of input) */}
          {leftIcon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-placeholder">
              {leftIcon}
            </span>
          )}

          {/* Right Icon */}
          {rightIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-placeholder">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${id}-error`}
            className="mt-1 text-sm text-error"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Hint Text */}
        {hint && !error && (
          <p id={`${id}-hint`} className="mt-1 text-sm text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
