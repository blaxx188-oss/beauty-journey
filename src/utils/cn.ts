/**
 * Utility to merge Tailwind class names.
 * Uses clsx + tailwind-merge for proper class deduplication.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
