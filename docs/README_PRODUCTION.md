# Beauty Journey - Production Documentation

Welcome to the production-ready version of **Beauty Journey**, a premium e-commerce platform for skincare and haircare in Egypt.

## Project Overview
Beauty Journey is built with the latest web technologies to ensure high performance, security, and a seamless user experience. The platform is fully optimized for Arabic (RTL) as the primary language, with built-in support for English (LTR).

## Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database & Auth:** Supabase (PostgreSQL)
- **Payment Gateway:** Paymob
- **Animations:** Framer Motion
- **State Management:** Zustand & React Query

## Production Readiness Checklist
- [x] **Routing:** Fixed middleware to handle non-prefixed routes and consistent auth redirects.
- [x] **Security:** Implemented security headers (X-Frame-Options, CSP, etc.) in `next.config.ts`.
- [x] **SEO:** Configured `robots.txt` and dynamic `sitemap.xml`.
- [x] **Performance:** Enabled image optimization (AVIF/WebP) and package import optimization.
- [x] **Environment:** Comprehensive validation of required variables.
- [x] **Accessibility:** ARIA labels, focus states, and RTL/LTR semantic handling.

## Deployment
This project is designed to be deployed on **Vercel** with a **Supabase** backend.

For detailed instructions, see the [Deployment Guide](./DEPLOYMENT_GUIDE.md).

## Project Structure
A detailed overview of the project structure can be found in the [Project Structure Documentation](./PROJECT_STRUCTURE.md).

---
© 2026 Beauty Journey. All rights reserved.
