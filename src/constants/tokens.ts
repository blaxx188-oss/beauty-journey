/**
 * Beauty Journey — Design Token Constants
 * TypeScript-safe access to all design tokens.
 */

// ============================================
// COLORS
// ============================================
export const COLORS = {
  primary: {
    midnightOnyx: "#0A0A0A",
    softPearl: "#F9F9F9",
    warmTaupe: "#E8E4E1",
    roseGold: "#B76E79",
    roseGoldHover: "#A5606B",
  },
  semantic: {
    success: "#4A7C59",
    error: "#8A3324",
    warning: "#D4A373",
    info: "#5A7D9A",
  },
  surface: {
    background: "#F9F9F9",
    surface: "#FFFFFF",
    surfaceAlt: "#E8E4E1",
    border: "#E8E4E1",
    divider: "#E8E4E1",
    overlay: "rgba(10, 10, 10, 0.4)",
    glass: "rgba(255, 255, 255, 0.7)",
  },
  text: {
    primary: "#0A0A0A",
    secondary: "#4A4A4A",
    placeholder: "#A0A0A0",
    disabled: "#D1D1D1",
  },
} as const;

// ============================================
// SPACING
// ============================================
export const SPACING = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  64: 64,
  80: 80,
  96: 96,
  128: 128,
} as const;

// ============================================
// RADIUS
// ============================================
export const RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  full: 999,
} as const;

// ============================================
// SHADOWS
// ============================================
export const SHADOWS = {
  sm: "0 2px 8px rgba(0, 0, 0, 0.03)",
  md: "0 4px 20px rgba(0, 0, 0, 0.05)",
  lg: "0 8px 30px rgba(0, 0, 0, 0.08)",
  float: "0 12px 40px rgba(0, 0, 0, 0.12)",
} as const;

// ============================================
// TRANSITIONS
// ============================================
export const TRANSITIONS = {
  fast: "150ms cubic-bezier(0.25, 0.8, 0.5, 1)",
  medium: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "500ms cubic-bezier(0.25, 0.8, 0.5, 1)",
  easeInOut: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// ============================================
// Z-INDEX
// ============================================
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  drawer: 40,
  modal: 50,
  toast: 60,
  tooltip: 70,
} as const;

// ============================================
// BREAKPOINTS
// ============================================
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

// ============================================
// FONTS
// ============================================
export const FONTS = {
  heading: {
    en: "Playfair Display",
    ar: "Amiri",
  },
  body: {
    en: "Inter",
    ar: "Tajawal",
  },
} as const;

// ============================================
// ANIMATION EASING
// ============================================
export const EASING = {
  out: "cubic-bezier(0.25, 0.8, 0.5, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// ============================================
// CONTAINER
// ============================================
export const CONTAINER = {
  maxWidth: 1280,
  paddingDesktop: 40,
  paddingMobile: 16,
} as const;
