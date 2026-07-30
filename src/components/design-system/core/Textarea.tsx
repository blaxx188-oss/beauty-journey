"use client";

/**
 * Textarea — Multi-line text input with floating label, character count, resize control.
 */

import React, { useId, useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCharCount?: boolean;
  autoResize?: boolean;
}

// ============================================
// COMPONENT
// ============================================

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      maxLength,
      showCharCount = false,
      autoResize = false,
      id: externalId,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = externalId || autoId;
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || innerRef;

    // Auto-resize logic
    const resizeTextarea = useCallback(() => {
      const el = textareaRef.current;
      if (el && autoResize) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [autoResize, textareaRef]);

    useEffect(() => {
      resizeTextarea();
    }, [props.defaultValue, resizeTextarea]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
      if (autoResize) resizeTextarea();
    };

    const hasValue = props.value !== undefined && props.value !== "" && props.value !== null;

    return (
      <div className="w-full">
        <div className="relative">
          <textarea
            ref={textareaRef}
            id={id}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${id}-error`
                : hint
                ? `${id}-hint`
                : undefined
            }
            className={cn(
              "w-full text-base bg-transparent border rounded-sm transition-colors duration-150 peer",
              "placeholder:text-placeholder",
              "focus:outline-none focus:ring-0",
              autoResize ? "resize-none overflow-hidden" : "resize-y",
              label ? "pt-4 pb-1 min-h-[80px]" : "min-h-[80px] p-4",
              error
                ? "border-error text-error"
                : isFocused
                ? "border-accent text-text-primary"
                : "border-border text-text-primary",
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
            onChange={handleChange}
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
        </div>

        {/* Character Count & Hint/Error */}
        <div className="flex items-center justify-between mt-1">
          <div>
            {error && (
              <p id={`${id}-error`} className="text-sm text-error" role="alert">
                {error}
              </p>
            )}
            {hint && !error && (
              <p id={`${id}-hint`} className="text-sm text-text-secondary">
                {hint}
              </p>
            )}
          </div>

          {showCharCount && maxLength && (
            <span
              className={cn(
                "text-xs",
                charCount >= maxLength ? "text-error" : "text-text-secondary"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
