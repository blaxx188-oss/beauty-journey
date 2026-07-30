/**
 * Formatting utilities for the Beauty Journey platform.
 */

/**
 * Format a price in Egyptian Pounds.
 * Uses Amiri font styling context and Arabic currency format.
 */
export function formatPrice(
  amount: number,
  currency: string = "EGP",
  locale: string = "ar-EG"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a price with strikethrough for discounted items.
 */
export function formatDiscountedPrice(
  originalPrice: number,
  discountedPrice: number,
  currency: string = "EGP",
  locale: string = "ar-EG"
): { original: string; discounted: string; discountPercentage: number } {
  const original = formatPrice(originalPrice, currency, locale);
  const discounted = formatPrice(discountedPrice, currency, locale);
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  return { original, discounted, discountPercentage };
}

/**
 * Format a date in Arabic.
 */
export function formatDate(date: Date | string, locale: string = "ar-EG"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Format a relative time (e.g., "منذ يومين").
 */
export function formatRelativeTime(
  date: Date | string,
  locale: string = "ar-EG"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) return formatDate(date, locale);
  if (diffDays > 0) return `منذ ${diffDays} يوم`;
  if (diffHours > 0) return `منذ ${diffHours} ساعة`;
  if (diffMinutes > 0) return `منذ ${diffMinutes} دقيقة`;
  return "الآن";
}

/**
 * Truncate text with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
