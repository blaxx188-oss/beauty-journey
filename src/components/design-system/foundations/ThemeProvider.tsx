"use client";

/**
 * ThemeProvider — Manages locale, direction, and theme mode.
 * Supports RTL/LTR switching and Light/Dark mode architecture.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

// ============================================
// TYPES
// ============================================

export type Locale = "ar" | "en";
export type Direction = "rtl" | "ltr";
export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  locale: Locale;
  direction: Direction;
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

// ============================================
// CONSTANTS
// ============================================

const LOCALE_STORAGE_KEY = "beauty-journey-locale";
const THEME_STORAGE_KEY = "beauty-journey-theme";

// ============================================
// CONTEXT
// ============================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function ThemeProvider({
  children,
  initialLocale = "ar",
  initialThemeMode = "light",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  initialThemeMode?: ThemeMode;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === "ar" || stored === "en") return stored;
    }
    return initialLocale;
  });

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") return stored;
    }
    return initialThemeMode;
  });

  const direction: Direction = locale === "ar" ? "rtl" : "ltr";

  // Compute actual dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (themeMode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      setIsDarkMode(themeMode === "dark");
    }
  }, [themeMode]);

  // Apply theme to DOM
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("dir", direction);
      document.documentElement.setAttribute("lang", locale);
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light"
      );
    }
  }, [direction, locale, isDarkMode]);

  // Apply locale class for font switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("locale-ar", locale === "ar");
      document.documentElement.classList.toggle("locale-en", locale === "en");
    }
  }, [locale]);

  // Apply reduced-motion class
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      document.documentElement.classList.toggle(
        "motion-reduce",
        mq.matches
      );
      const handler = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle(
          "motion-reduce",
          e.matches
        );
      };
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  }, [themeMode, setThemeMode]);

  const value = useMemo(
    () => ({
      locale,
      direction,
      themeMode,
      isDarkMode,
      toggleLocale,
      setLocale,
      setThemeMode,
      toggleThemeMode,
    }),
    [locale, direction, themeMode, isDarkMode, toggleLocale, setLocale, setThemeMode, toggleThemeMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
