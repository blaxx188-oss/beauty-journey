# Project Structure Documentation

Beauty Journey follows a modern Next.js project structure with a focus on modularity and separation of concerns.

## Directory Overview

### `/src/app`
Contains the application routes using the Next.js App Router.
- `(main)`: Public-facing pages (Home, Products, Cart, etc.).
- `(auth)`: Authentication pages (Login, Register, etc.).
- `(admin)`: Administrative dashboard pages.
- `api`: Server-side API routes and webhooks.

### `/src/components`
Reusable UI components organized by domain.
- `design-system`: Core UI components (Buttons, Inputs, etc.) and ecommerce-specific elements.
- `layout`: Global layout components like Header and Footer.
- `product`: Product-specific components (Cards, Grids, etc.).
- `checkout`: Checkout process components.
- `admin`: Components exclusive to the admin dashboard.

### `/src/services`
Server-side logic for interacting with external APIs and databases.
- `auth-service.ts`: Supabase Auth integration.
- `product-service.ts`: Product data fetching.
- `payment-service.ts`: Paymob integration.
- `order-service.ts`: Order management.

### `/src/lib`
Shared utilities, contexts, and configurations.
- `supabase.ts`: Supabase client configuration.
- `auth-context.tsx`: Authentication state provider.
- `theme-context.tsx`: RTL/LTR and locale management.
- `schemas.ts`: Zod validation schemas.

### `/src/stores`
Client-side state management using Zustand.
- `cart-store.tsx`: Shopping cart state.
- `wishlist-store.tsx`: User wishlist state.

### `/src/styles`
Global CSS and Tailwind theme configurations.
- `globals.css`: Main entry point for styles.
- `tokens.css`: Design tokens (colors, spacing, etc.).

### `/src/utils`
Helper functions and utilities.
- `seo.ts`: SEO-related helpers.
- `env-validation.ts`: Environment variable checking.
- `format.ts`: Currency and date formatting.

## Key Files
- `next.config.ts`: Next.js configuration and security headers.
- `middleware.ts`: Authentication guards and path analysis.
- `tailwind.config.ts`: Tailwind CSS theme extension.
- `tsconfig.json`: TypeScript configuration.
