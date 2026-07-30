"use client";

/**
 * ThemeContext — Manages locale, text direction, and font loading.
 * Provides RTL/LTR switching and Arabic/English font variables.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

type Locale = "ar" | "en";
type Direction = "rtl" | "ltr";

interface ThemeContextType {
  locale: Locale;
  direction: Direction;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "beauty-journey-locale";

export function ThemeProvider({
  children,
  initialLocale = "ar",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === "ar" || stored === "en") return stored;
    }
    return initialLocale;
  });

  const direction: Direction = locale === "ar" ? "rtl" : "ltr";

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", newLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("dir", direction);
      document.documentElement.setAttribute("lang", locale);
    }
  }, [direction, locale]);

  const value = useMemo(
    () => ({ locale, direction, toggleLocale, setLocale }),
    [locale, direction, toggleLocale, setLocale]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
