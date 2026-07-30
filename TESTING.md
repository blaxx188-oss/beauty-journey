# Testing & Quality Assurance Architecture

This document outlines the testing strategy and quality assurance layer for the Beauty Journey platform.

## 🧪 Testing Stack

- **Unit & Component Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End (E2E) Testing**: [Playwright](https://playwright.dev/)
- **API Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/)
- **Coverage**: [v8](https://v8.dev/)

## 📁 Folder Structure

```
__tests__/
├── unit/           # Logic, utilities, and helper tests
├── components/     # UI component tests
├── integration/    # Store and multi-component tests
├── e2e/           # Playwright end-to-end tests
├── mocks/         # API and data mocks
└── utils/         # Test utilities and custom renderers
```

## 🚀 Running Tests

### Unit & Component Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run in watch mode
npm run test:coverage # Generate coverage report
```

### E2E Tests
```bash
npx playwright test         # Run E2E tests
npx playwright test --ui    # Run with UI mode
```

## 🛡️ Quality Assurance Layer

### 1. Error Boundaries
Global and sectional error boundaries are implemented to catch runtime errors and provide graceful fallbacks.
- **File**: `src/components/shared/ErrorBoundary/ErrorBoundary.tsx`
- **Usage**: Wrapped around main layout and critical sections.

### 2. Logging Architecture
A centralized logging utility ensures consistent debugging and production monitoring.
- **File**: `src/utils/logger.ts`
- **Levels**: `info`, `warn`, `error`, `debug`

### 3. Environment Validation
Automatic validation of required environment variables during app initialization.
- **File**: `src/utils/env-validation.ts`

### 4. Form Validation
All forms use Zod for schema validation and provide real-time feedback in both Arabic and English (where applicable).

## 📋 QA Checklist

- [ ] **RTL Validation**: All layouts mirror correctly in Arabic.
- [ ] **Responsive Design**: Tested on Mobile (375px), Tablet (768px), and Desktop (1280px+).
- [ ] **Accessibility**: ARIA labels present, focus trap working in drawers, color contrast meets WCAG AA.
- [ ] **Performance**: LCP < 2.5s, Images optimized via next/image.
- [ ] **SEO**: Meta tags present, JSON-LD schemas validated.
- [ ] **Error Handling**: 404 and 500 pages styled and functional.
- [ ] **Route Protection**: Admin routes redirect unauthorized users.
```
