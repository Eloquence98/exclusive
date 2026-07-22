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

## What's Left

**Wishlist** — Not started

- Decide: localStorage only or backend-synced
- Add/remove products
- Wishlist page

**Auth** — Pages exist, no logic

- Login, signup, password reset flows
- Token management
- Protected routes

**Account** — Not started

- Profile page
- Order history (authenticated)
- Settings page

## Known Issues

1. `domains/search/search-autocomplete.tsx` in wrong folder — should be in `components/search/`

## Architecture Evolution

Started with mixed legacy code (JSX, scattered logic). Migrated to strict domain-driven architecture:

- One domain at a time (catalog first, then cart, checkout, order, search)
- Established patterns: domain API → query → component, mutation at call site, query key factories
- AbortController introduced for search only (not needed elsewhere)
- Server prefetch used selectively (checkout success, order tracking, search results)
- Component composition refined: reusable primitives (SearchInput) composed by features (SearchAutocomplete)
