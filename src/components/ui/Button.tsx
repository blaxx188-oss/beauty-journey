"use client";

/**
 * Button — Primary, Secondary, Ghost, Icon variants.
 * BEM-inspired naming: BtnPrimary, BtnSecondary, BtnGhost, BtnIcon.
 * Per design spec: Primary=Rose Gold, Secondary=Outlined, Ghost=Underline hover, Icon=48px circles.
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

// ============================================
// VARIANT STYLES
// ============================================

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-md transition-all duration-150",
  secondary:
    "bg-transparent border border-text-primary text-text-primary hover:bg-text-primary hover:text-surface transition-all duration-150",
  ghost:
    "bg-transparent text-text-primary hover:text-accent border-b border-transparent hover:border-accent transition-all duration-150",
  icon:
    "bg-transparent text-text-primary hover:text-accent rounded-full hover:bg-neutral-secondary transition-all duration-150",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

// ============================================
// COMPONENT
// ============================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isIcon = variant === "icon";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]",
          variantStyles[variant],
          isIcon ? "w-12 h-12" : sizeStyles[size],
          fullWidth && !isIcon && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ============================================
// NAMED EXPORTS (BEM convention)
// ============================================

export function BtnPrimary(props: Omit<ButtonProps, "variant">) {
  return <Button variant="primary" {...props} />;
}

export function BtnSecondary(props: Omit<ButtonProps, "variant">) {
  return <Button variant="secondary" {...props} />;
}

export function BtnGhost(props: Omit<ButtonProps, "variant">) {
  return <Button variant="ghost" {...props} />;
}

export function BtnIcon(props: Omit<ButtonProps, "variant">) {
  return <Button variant="icon" {...props} />;
}

export { Button };
export default Button;
