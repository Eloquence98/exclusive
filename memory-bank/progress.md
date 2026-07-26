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

- Client-only (Zustand + localStorage, key: `exclusive-wishlist`)
- Heart icon toggle on product cards (always visible, top-right)
- Add/remove products
- Wishlist drawer with "Move to Cart" action
- Empty state with contextual CTA
- Navbar + mobile menu integration with badge count

**Auth** — Complete (simplified architecture)

- Auth.js v5 with Google OAuth only
- JWT session strategy
- Login page with Google sign-in only (no credentials)
- Backend sync: `POST /users/google` handshake on sign-in via `signIn` callback
- Backend token stored only inside Auth.js JWT — never exposed to browser
- `getBackendToken()` helper decodes Auth.js JWT server-side to retrieve backend token
- API proxy route (`/api/proxy`) uses `getBackendToken()` for `Authorization: Bearer`
- Route protection via `authorized` callback checking Auth.js session
- Middleware: thin proxy `export { auth as middleware }`
- Logout: just `signOut({ redirectTo: "/login" })` — no backend call, no cookie cleanup
- No custom cookies, no duplicate authentication state

**Account** — In Progress

- Profile page (`/me`) — read-only display of name, email, avatar from Google
- Order history (`/me/orders`) — authenticated list of past orders with accordion details, status timeline, pagination
- Account sidebar with navigation links (Profile, My Orders) and sign-out button
- Order history uses TanStack Query with proxy route for authenticated backend requests
- Loading skeleton, error state, and empty state for order history

## What's Left

**Account** — Polish

- Verify order history pagination works end-to-end
- Add any missing edge cases

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
- Auth evolved through multiple iterations: legacy credentials → Google OAuth with custom cookie → **simplified single-session architecture** where Auth.js is the only session manager, backend token lives only in the Auth.js JWT, and `getBackendToken()` is the sole server-side access point
- Account domain follows established patterns: domain API → query → client component, with proxy route for authenticated requests
