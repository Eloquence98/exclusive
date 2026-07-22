# Active Context — Exclusive

## Current Focus

Building **Auth** domain next (Google OAuth only via Auth.js).

Scope: Sign in with Google → backend handshake → session management. No credentials, no password flows.

Account control is minimal: read-only profile (Google-sourced) + authenticated order history only.

## Recent Work

- Completed Wishlist domain (client-only store + drawer + product card integration)
- Wishlist follows cart pattern: Zustand + localStorage, no backend sync
- Heart icon toggle on all product cards with drawer access via navbar

## Known Issues

`domains/search/search-autocomplete.tsx` is misplaced — should live in `components/search/`. Needs relocation.

## Next Steps

1. Build Auth domain (Google OAuth only, Auth.js v5)
   - Sign in with Google button (no credentials flow)
   - Backend handshake (create account if first-time, else retrieve existing)
   - Session management (backend-issued token for authenticated requests)
   - Remove unused auth pages: signup, forgot-password, reset-password
2. Build Account domain (minimal scope)
   - Profile page (read-only: name, email, avatar from Google)
   - Order History page (authenticated "my orders" endpoint)
   - No Settings page (nothing user-configurable in this scope)

## Active Patterns

**Component ownership:**

- Components own their UI state (forms own fields, not parents)
- Pass domain objects, not many individual props
- Mutation side effects defined at call site, not in `mutationOptions`

**State management tiers:**

- Zustand for global client state: cart, wishlist, UI toggles (drawers, theme)
- TanStack Query for server state: products, orders, search results
- `useState` for component-local UI state: form fields, modals, tabs

**Search pattern established:**

- `SearchInput` — reusable UI (owns `query`, `isExpanded`)
- `SearchAutocomplete` — feature (debounce, query, navigation)

**Wishlist pattern (mirrors cart):**

- `WishlistStore` — Zustand with persist middleware (localStorage)
- `WishlistItem` component — mirrors `CartItem`, no quantity/size concept
- Heart icon on product cards — independent toggle (no drawer auto-open)
- Drawer state owned by navbar (not store) — matches cart precedent

**AbortController:**

- Used in search only — cancels stale requests via `signal` in queryFn

**Empty states:**

- Always provide next action
- Use `components/ui/empty-state.tsx` variants
- Contextual variants: `EmptyCartEmptyState`, `EmptyWishlistEmptyState`, `NoSearchResultsEmptyState`, etc.

## Project Insights

- Server prefetch only where it provides clear UX/SEO benefit
- Guest-first removes friction — account is optional convenience
- Order token 404 after delivery is deliberate security — not a bug
- Client-only features (cart, wishlist) use same architecture as server-synced domains — no special cases
- Auth is convenience, not requirement — Google OAuth removes password management burden, backend owns identity handshake
