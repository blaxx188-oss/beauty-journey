"use client";

/**
 * WishlistButton — Heart toggle button for wishlist functionality.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Heart } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface WishlistButtonProps {
  active?: boolean;
  onToggle?: (active: boolean) => void;
  size?: "sm" | "md";
  className?: string;
}

// ============================================
// COMPONENT
// ============================================

function WishlistButton({
  active: controlledActive,
  onToggle,
  size = "md",
  className,
}: WishlistButtonProps) {
  const [internalActive, setInternalActive] = useState(false);
  const isActive = controlledActive !== undefined ? controlledActive : internalActive;

  const handleClick = () => {
    const newState = !isActive;
    if (controlledActive === undefined) {
      setInternalActive(newState);
    }
    onToggle?.(newState);
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
  };

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center rounded-full bg-surface border border-border shadow-sm",
        "transition-colors duration-150",
        "hover:border-accent hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        sizeClasses[size],
        isActive && "text-accent border-accent",
        className
      )}
      aria-label={isActive ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      aria-pressed={isActive}
    >
      <motion.div
        animate={{ scale: isActive ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Heart
          className={cn(iconSize[size], isActive && "fill-accent")}
        />
      </motion.div>
    </button>
  );
}

WishlistButton.displayName = "WishlistButton";

export { WishlistButton };
export default WishlistButton;
