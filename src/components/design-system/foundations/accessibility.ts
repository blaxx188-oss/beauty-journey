/**
 * Accessibility Utilities — Shared ARIA and keyboard patterns.
 */

// ============================================
// KEYBOARD HANDLERS
// ============================================

/**
 * Handle Enter and Space key presses on a button-like element.
 */
export function handleKeyboardActivation(
  event: React.KeyboardEvent,
  callback: () => void
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    callback();
  }
}

/**
 * Handle Escape key press to close modals/drawers.
 */
export function handleEscapeKey(
  event: KeyboardEvent,
  callback: () => void
) {
  if (event.key === "Escape") {
    event.preventDefault();
    callback();
  }
}

/**
 * Trap focus within a container element.
 * Returns a cleanup function.
 */
export function focusTrap(element: HTMLElement | null) {
  if (!element) return () => {};

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  const getFocusableElements = () =>
    Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors));

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  // Focus the first focusable element
  const focusable = getFocusableElements();
  if (focusable.length > 0) {
    focusable[0].focus();
  }

  document.addEventListener("keydown", handleTabKey);
  return () => document.removeEventListener("keydown", handleTabKey);
}

// ============================================
// ARIA HELPERS
// ============================================

export function getAriaDescribedBy(
  errorId: string | undefined,
  hintId: string | undefined,
  descriptionId: string | undefined
): string | undefined {
  const parts = [errorId, hintId, descriptionId].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : undefined;
}

export function getAriaLabel(
  label: string | undefined,
  id: string | undefined
): { "aria-label"?: string; "aria-labelledby"?: string } {
  if (label) return { "aria-label": label };
  if (id) return { "aria-labelledby": id };
  return {};
}
