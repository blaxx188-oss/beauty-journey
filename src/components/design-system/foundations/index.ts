export { ThemeProvider, useTheme } from "./ThemeProvider";
export type { Locale, Direction, ThemeMode } from "./ThemeProvider";

// Motion
export {
  transitionFast,
  transitionMedium,
  transitionSlow,
  transitionSpring,
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideInRight,
  slideInLeft,
  slideInFromRight,
  slideInFromBottom,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageTransition,
  modalOverlay,
  modalContent,
  drawerContent,
  tooltipContent,
  buttonHover,
} from "./motion";

// Accessibility
export {
  handleKeyboardActivation,
  handleEscapeKey,
  focusTrap,
  getAriaDescribedBy,
  getAriaLabel,
} from "./accessibility";
