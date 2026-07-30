import type { Metadata } from "next";
import { Amiri, Tajawal, Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "@/lib/providers";
import Analytics from "@/components/shared/Analytics";

// ============================================
// ARABIC FONTS (Default)
// ============================================

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  display: "swap",
  preload: true,
});

const tajawal = Tajawal({
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
  preload: true,
});

// ============================================
// ENGLISH FONTS
// ============================================

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: {
    default: "Beauty Journey | رحلتك الجمالية",
    template: "%s | Beauty Journey",
  },
  description:
    "وجهتك الفاخرة للعناية بالبشرة والشعر في مصر. اكتشفي روتينك المثالي مع استشارات خبراء الجمال.",
  keywords: [
    "Beauty Journey",
    "skincare",
    "haircare",
    "Egypt",
    "مستحضرات تجميل",
    "عناية بالبشرة",
    "عناية بالشعر",
  ],
  authors: [{ name: "Beauty Journey Team" }],
  creator: "Beauty Journey",
  publisher: "Beauty Journey",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    siteName: "Beauty Journey",
    title: "Beauty Journey | رحلتك الجمالية",
    description:
      "وجهتك الفاخرة للعناية بالبشرة والشعر في مصر. اكتشفي روتينك المثالي.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beauty Journey | رحلتك الجمالية",
    description:
      "وجهتك الفاخرة للعناية بالبشرة والشعر في مصر.",
  },
};

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${tajawal.variable} ${playfairDisplay.variable} ${inter.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
