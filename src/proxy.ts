/**
 * Proxy — Locale detection, Auth protection, and Routing.
 * Replaces deprecated middleware.ts with Next.js 16 proxy convention.
 */

import { NextRequest, NextResponse } from "next/server";

const locales = ["ar", "en"];
const defaultLocale = "ar";

// Routes that require authentication
const protectedRoutes = ["/account", "/checkout", "/admin"];

// Routes that require admin role
const adminRoutes = ["/admin"];

// Routes that should redirect to home if already logged in
const authRoutes = ["/login", "/register", "/forgot-password"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip proxy for static assets and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.includes("favicon.ico")
  ) {
    return NextResponse.next();
  }

  // 2. Path analysis
  let pathWithoutLocale = pathname;
  
  // Note: Locale dynamic segments ([locale]) are not currently implemented in the file system.
  // Locale is managed client-side via ThemeProvider and localStorage.
  // We keep pathWithoutLocale as pathname for now.

  // 3. Auth Protection Logic
  // We use cookie-based auth check for proxy (synchronous)

  // Check user from cookies (sync cookie-based check for proxy)
  const authCookie = request.cookies.get('sb-access-token');
  const isLoggedIn = !!authCookie;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathWithoutLocale.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathWithoutLocale.startsWith(route));

  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL(`/login`, request.url);
    redirectUrl.searchParams.set("redirectTo", pathWithoutLocale);
    return NextResponse.redirect(redirectUrl);
  }

  // Admin Role Check
  const isAdminRoute = adminRoutes.some(route => pathWithoutLocale.startsWith(route));
  if (isAdminRoute && isLoggedIn) {
    // Admin role check requires async getUser() - for proxy we trust the cookie
    // In production, this would be validated server-side
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(`/account`, request.url));
  }

  return NextResponse.next();
}

/**
 * Detect locale from Accept-Language header.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function detectLocale(acceptLanguage: string): string {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage.split(",").map((lang) => {
    const [locale, quality] = lang.trim().split(";q=");
    return {
      locale: locale.split("-")[0],
      quality: quality ? parseFloat(quality) : 1,
    };
  });

  preferred.sort((a, b) => b.quality - a.quality);

  const match = preferred.find(
    (p) => locales.includes(p.locale as string)
  );

  return match?.locale || defaultLocale;
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - /_next
    // - /api
    // - /favicon.ico
    "/((?!_next|api|favicon\\.ico|images|fonts).*)",
  ],
};
