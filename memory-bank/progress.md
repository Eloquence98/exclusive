# Progress — Exclusive

## What Works

**Catalog** — Complete

- Product listing with filters (category, brand, price, on sale)
- Product detail pages
- Featured/trending/top-rated product queries
- Dynamic catalog stats (categories, brands, price range)

**Cart** — Complete

- Add/remove/update items
- Persistent client state (Zustand + localStorage)
- Cart drawer UI

**Checkout** — Complete

- Guest checkout flow (no auth required)
- Shipping address form
- Order creation
- Order confirmation page (server prefetch + polling)

**Order Tracking** — Complete

- Track by token (from email link)
- Track by order number + email (manual lookup)
- Status timeline with live updates
- Order details display

**Search** — Complete

- Instant autocomplete suggestions (debounced, AbortController cancellation)
- Full search results page with filters
- Navbar search integration

**Wishlist** — Complete

- Client-only (Zustand + localStorage, key: `atelier-wishlist`)
- Heart icon toggle on product cards (always visible, top-right)
- Add/remove products
- Wishlist drawer with "Move to Cart" action
- Empty state with contextual CTA
- Navbar + mobile menu integration with badge count

**Auth** — Complete

- Auth.js v5 configured with Google OAuth provider
- JWT session strategy
- Login page with Google sign-in only (no credentials)
- Backend sync implemented: `POST /users/google` handshake on sign-in
- Backend token flows through JWT → session → HttpOnly cookie via `SyncToken` component
- API proxy route (`/api/proxy`) for authenticated backend requests with `Authorization: Bearer`
- Middleware protecting `/me` routes, redirecting logged-in users from `/login`
- Customer domain with types and API for backend handshake
- NextAuth type declarations extended

## What's Left

**Account** — Not started

- Profile page (read-only: name, email, avatar from Google)
- Order history (authenticated "my orders" endpoint)
- No Settings page (nothing user-configurable in this scope)

## Known Issues

1. `domains/search/search-autocomplete.tsx` in wrong folder — should be in `components/search/`

## Architecture Evolution

Started with mixed legacy code (JSX, scattered logic). Migrated to strict domain-driven architecture:

- One domain at a time (catalog first, then cart, checkout, order, search, wishlist)
- Established patterns: domain API → query → component, mutation at call site, query key factories
- AbortController introduced for search only (not needed elsewhere)
- Server prefetch used selectively (checkout success, order tracking, search results)
- Component composition refined: reusable primitives (SearchInput) composed by features (SearchAutocomplete)
- Wishlist mirrors cart pattern (client state only, no backend sync) — domain-driven architecture scales to non-API features
- Auth migrated from legacy credentials flow to Google OAuth-only via Auth.js v5 — backend sync includes customer domain, token cookie management, and API proxy route for authenticated requests
