"use client";

/**
 * Input — Text input with floating label, focus/error states.
 * Supports: label, error, hint, left/right icons, password toggle.
 */

import React, { useId, useState } from "react";
import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

// ============================================
// COMPONENT
// ============================================

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      rightIcon,
      leftIcon,
      showPasswordToggle = false,
      id: externalId,
      type,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId || autoId;
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    const hasValue = props.value !== undefined && props.value !== "" && props.value !== null;
    const isFloating = isFocused || hasValue || !!props.defaultValue;

    const inputClasses = cn(
      "w-full text-base bg-transparent border rounded-sm transition-colors duration-150 peer",
      "placeholder:text-placeholder",
      "focus:outline-none focus:ring-0",
      // Height varies with label
      label ? "h-12 pt-4 pb-1" : "h-12",
      // Padding with icons
      leftIcon && label ? "pl-10 pr-4" : leftIcon ? "pl-10 pr-4" : rightIcon ? "pl-4 pr-10" : "px-4",
      // Border color
      error
        ? "border-error text-error"
        : isFocused
        ? "border-accent text-text-primary"
        : "border-border text-text-primary",
      className
    );

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={inputType}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${id}-error`
                : hint
                ? `${id}-hint`
                : undefined
            }
            className={inputClasses}
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
                "absolute transition-all duration-150 pointer-events-none",
                // RTL-aware positioning
                leftIcon ? "right-10" : "right-4",
                isFloating ? "top-1 text-xs" : "top-3.5 text-base",
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

          {/* Left Icon (RTL: visually on right) */}
          {leftIcon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-placeholder pointer-events-none">
              {leftIcon}
            </span>
          )}

          {/* Right Icon / Password Toggle */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {showPasswordToggle ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pointer-events-auto p-0 hover:text-text-primary transition-colors"
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-placeholder" />
                ) : (
                  <Eye className="w-4 h-4 text-placeholder" />
                )}
              </button>
            ) : (
              rightIcon && <span className="text-placeholder">{rightIcon}</span>
            )}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-error" role="alert">
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
