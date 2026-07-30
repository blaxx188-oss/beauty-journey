"use client";

/**
 * ProductTags — Display product attribute tags (ingredients, benefits, etc.).
 */

import React from "react";
import { cn } from "@/utils/cn";

// ============================================
// TYPES
// ============================================

export interface ProductTagsProps {
  tags: string[];
  maxVisible?: number;
  showMoreLabel?: string;
  className?: string;
  onTagClick?: (tag: string) => void;
}

// ============================================
// COMPONENT
// ============================================

function ProductTags({
  tags,
  maxVisible = 5,
  showMoreLabel = "...",
  className,
  onTagClick,
}: ProductTagsProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const hiddenCount = tags.length - maxVisible;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {visibleTags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onTagClick?.(tag)}
          className={cn(
            "px-2.5 py-1 text-xs bg-neutral-secondary rounded-full transition-colors duration-150",
            "hover:bg-accent/10 hover:text-accent",
            "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          )}
        >
          {tag}
        </button>
      ))}

      {hiddenCount > 0 && (
        <span className="px-2 py-1 text-xs text-text-secondary">
          {showMoreLabel} +{hiddenCount}
        </span>
      )}
    </div>
  );
}

ProductTags.displayName = "ProductTags";

export { ProductTags };
export default ProductTags;
