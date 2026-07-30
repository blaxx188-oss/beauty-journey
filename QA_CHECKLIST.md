# Production-Ready QA Checklist

Use this checklist to verify the quality of the Beauty Journey platform before deployment.

## 1. Functional Testing
- [ ] **Auth Flow**: Register, Login, Logout, Forgot Password.
- [ ] **Shopping Cart**: Add/Remove items, update quantity, persistent state.
- [ ] **Checkout**: Shipping address validation, payment method selection, order summary accuracy.
- [ ] **Search**: Real-time filtering, empty state handling.
- [ ] **Account**: Profile editing, order history, wishlist management.

## 2. Arabic & RTL Support
- [ ] **Direction**: `dir="rtl"` applied to HTML tag.
- [ ] **Fonts**: Amiri and Tajawal loading correctly.
- [ ] **Layout**: Icons and text alignment mirrored correctly.
- [ ] **Forms**: Input labels and error messages aligned to the right.

## 3. Performance & SEO
- [ ] **LCP**: Hero image has `priority` attribute.
- [ ] **Image Formats**: Images served in WebP/AVIF.
- [ ] **Metadata**: Dynamic titles and OG tags for all routes.
- [ ] **Sitemap**: `sitemap.xml` includes all products and categories.
- [ ] **Robots**: `robots.txt` disallows sensitive paths.

## 4. Accessibility (A11y)
- [ ] **Keyboard**: All interactive elements reachable via Tab.
- [ ] **Focus**: Drawers and Modals trap focus correctly.
- [ ] **Labels**: All icon buttons have `aria-label`.
- [ ] **Semantic**: Correct use of `<main>`, `<nav>`, `<header>`, `<footer>`.

## 5. Error Handling
- [ ] **Runtime**: Global Error Boundary catches crashes.
- [ ] **Network**: API failures show user-friendly error messages.
- [ ] **Empty States**: "No products found" and "Empty cart" states are styled.
- [ ] **Validation**: Zod schemas catch invalid form data.

## 6. Developer Experience
- [ ] **Types**: No `any` types used in critical paths.
- [ ] **Logging**: Logger used instead of raw `console.log`.
- [ ] **Tests**: Unit tests pass with >80% coverage on core utilities.
```
