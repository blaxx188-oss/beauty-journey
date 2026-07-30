# Beauty Journey — Frontend Foundation

An elegant Arabic-first beauty e-commerce platform for skincare and haircare products in Egypt.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Supabase**
- **Zustand**
- **React Hook Form + Zod**
- **TanStack Query**
- **Lucide React**
- **next-intl** (i18n)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code
npm run format
npm run format:check
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/             # Public pages route group
│   └── (auth)/             # Auth pages route group
├── components/
│   ├── layout/             # Header, Footer, MobileBottomNav
│   ├── ui/                 # Reusable UI components
│   ├── product/            # ProductCard, CardCategory
│   ├── cart/               # CartDrawer
│   ├── search/             # SearchOverlay
│   ├── feedback/           # Toast, EmptyState, ErrorState
│   └── indicators/         # Skeleton, Spinner, StarRating, ProgressBar
├── hooks/                  # Custom React hooks
├── lib/                    # Theme context, providers, schemas, i18n
├── services/               # Supabase service layer
├── stores/                 # Zustand stores (cart, wishlist)
├── styles/                 # Design tokens, globals, Tailwind theme
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── constants/              # Design token constants
└── middleware.ts           # Locale detection & routing
```

## Design Tokens

All design tokens are defined in:
- `src/styles/tokens.css` — CSS custom properties
- `src/constants/tokens.ts` — TypeScript constants
- `src/styles/tailwind-theme.css` — Tailwind v4 theme config

## RTL Support

- Default locale: Arabic (RTL)
- Secondary locale: English (LTR)
- Automatic direction switching via ThemeProvider
- Arabic fonts: Amiri (headings), Tajawal (body)
- English fonts: Playfair Display (headings), Inter (body)

## Environment Variables

See `.env.example` for all required variables.
