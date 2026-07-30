"use client";

/**
 * Pagination — Page navigation with ellipsis for large page counts.
 */

import React, { useMemo } from "react";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ============================================
// TYPES
// ============================================

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

// ============================================
// HELPERS
// ============================================

function generatePages(current: number, total: number, siblings: number): (number | "ellipsis")[] {
  const range = siblings * 2 + 1;
  const start = Math.max(2, current - siblings);
  const end = Math.min(total - 1, current + siblings);

  const pages: (number | "ellipsis")[] = [1];

  if (start > 2) pages.push("ellipsis");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) pages.push("ellipsis");

  if (total > 1) pages.push(total);

  return pages;
}

// ============================================
// COMPONENT
// ============================================

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => generatePages(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="التنقل بين الصفحات" className={cn("flex items-center gap-1", className)}>
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-sm transition-colors duration-150",
          "hover:bg-neutral-secondary",
          "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
          currentPage === 1 && "opacity-30 cursor-not-allowed"
        )}
        aria-label="الصفحة السابقة"
      >
        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-text-secondary">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-sm text-sm font-medium transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
              page === currentPage
                ? "bg-accent text-white"
                : "hover:bg-neutral-secondary text-text-primary"
            )}
            aria-label={`صفحة ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-sm transition-colors duration-150",
          "hover:bg-neutral-secondary",
          "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
          currentPage === totalPages && "opacity-30 cursor-not-allowed"
        )}
        aria-label="الصفحة التالية"
      >
        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
      </button>
    </nav>
  );
}

Pagination.displayName = "Pagination";

export { Pagination };
export default Pagination;
