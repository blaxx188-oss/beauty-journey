/**
 * Motion Primitives — Shared Framer Motion presets for the design system.
 * Provides consistent animation behavior across all components.
 */

import type { Variants, Transition } from "framer-motion";

// ============================================
// TRANSITIONS
// ============================================

export const transitionFast: Transition = {
  duration: 0.15,
  ease: [0.25, 0.8, 0.5, 1],
};

export const transitionMedium: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

export const transitionSlow: Transition = {
  duration: 0.5,
  ease: [0.25, 0.8, 0.5, 1],
};

export const transitionSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// ============================================
// VARIANTS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionMedium },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitionMedium },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: transitionMedium },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: transitionMedium },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: transitionMedium },
};

export const slideInFromRight: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: transitionMedium },
  exit: { x: "100%", transition: transitionMedium },
};

export const slideInFromBottom: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: transitionMedium },
  exit: { y: "100%", transition: transitionMedium },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transitionFast },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: transitionMedium },
};

// ============================================
// LAYOUT VARIANTS
// ============================================

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transitionMedium },
};

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionFast },
  exit: { opacity: 0, transition: transitionFast },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transitionMedium },
  exit: { opacity: 0, scale: 0.95, transition: transitionFast },
};

export const drawerContent: Variants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: transitionMedium },
  exit: { x: "100%", transition: transitionMedium },
};

export const tooltipContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 4 },
  visible: { opacity: 1, scale: 1, y: 0, transition: transitionFast },
  exit: { opacity: 0, scale: 0.95, y: 4, transition: transitionFast },
};

// ============================================
// BUTTON VARIANTS
// ============================================

export const buttonHover: Variants = {
  hover: { scale: 1.02, transition: transitionFast },
  tap: { scale: 0.98, transition: transitionFast },
};
