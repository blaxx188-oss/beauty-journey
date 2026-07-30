"use client";

/**
 * Button — Primary, Secondary, Ghost, Outline, Destructive, Icon variants.
 * Variants: primary, secondary, ghost, outline, destructive, icon
 * Sizes: sm, md, lg
 * Full RTL, accessibility, keyboard nav, loading state support.
 */

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Spinner from "./Spinner";

// ============================================
// VARIANTS
// ============================================

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-md active:shadow-sm",
        secondary:
          "bg-transparent border border-text-primary text-text-primary hover:bg-text-primary hover:text-surface active:bg-accent active:border-accent active:text-white",
        ghost:
          "bg-transparent text-text-primary hover:text-accent border-b border-transparent hover:border-accent",
        outline:
          "bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent",
        destructive:
          "bg-error text-white hover:bg-error/90 shadow-md",
        icon:
          "bg-transparent text-text-primary hover:text-accent rounded-full hover:bg-neutral-secondary",
      },
      size: {
        sm: "h-9 px-4 text-xs gap-1.5",
        md: "h-11 px-6 text-sm gap-2",
        lg: "h-14 px-8 text-base gap-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ============================================
// TYPES
// ============================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ============================================
// COMPONENT
// ============================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className,
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
          buttonVariants({ variant, size }),
          isIcon ? "w-12 h-12" : "",
          fullWidth && !isIcon && "w-full",
          className
        )}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === "sm" ? "sm" : "md"} color="current" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ============================================
// BEM-NAMED EXPORTS
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

export function BtnOutline(props: Omit<ButtonProps, "variant">) {
  return <Button variant="outline" {...props} />;
}

export function BtnDestructive(props: Omit<ButtonProps, "variant">) {
  return <Button variant="destructive" {...props} />;
}

export function BtnIcon(props: Omit<ButtonProps, "variant">) {
  return <Button variant="icon" {...props} />;
}

export { Button, buttonVariants };
export default Button;
