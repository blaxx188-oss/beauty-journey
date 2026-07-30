/**
 * Internationalization Configuration
 * Arabic (RTL) is the default, English as secondary.
 */

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeConfig = {
  ar: {
    name: "العربية",
    dir: "rtl" as const,
    fontFamily: {
      heading: "Amiri",
      body: "Tajawal",
    },
  },
  en: {
    name: "English",
    dir: "ltr" as const,
    fontFamily: {
      heading: "Playfair Display",
      body: "Inter",
    },
  },
} as const;

/**
 * Get the direction for a locale.
 */
export function getLocaleDirection(locale: Locale): "rtl" | "ltr" {
  return localeConfig[locale].dir;
}

/**
 * Get font families for a locale.
 */
export function getLocaleFonts(locale: Locale) {
  return localeConfig[locale].fontFamily;
}
