# Active Context — Exclusive

## Current Focus

**Account domain** is in progress — profile page and order history are built:

- Profile page (`/me`) — read-only display of name, email, avatar from Google
- Order history (`/me/orders`) — authenticated list of past orders with status timeline, pagination
- Account sidebar with navigation links (Profile, My Orders) and sign-out button
- Order history uses TanStack Query with proxy route for authenticated backend requests

## Recent Work

- **Brand rename** (commit `584648f`): Changed "ATELIER" to "EXCLUSIVE" across all UI text, metadata, SEO titles, and localStorage keys
- **Account domain** (uncommitted):
  - `me/page.tsx` — Profile page with avatar, name, email display
  - `me/orders/page.tsx` — Order history page with `OrderHistoryClient`
  - `me/orders/order-history-client.tsx` — Client component with TanStack Query, pagination, loading/error/empty states
  - `components/account/account-nav-links.tsx` — Extracted nav links component (Profile, My Orders)
  - `components/account/account-sidebar.tsx` — Refactored to use `AccountNavLinks` and `SignOut` components
  - `components/account/order-history-list.tsx` — Accordion-based order list with product details and status timeline
  - `components/account/order-history-skeleton.tsx` — Loading skeleton for order history
  - `components/signout-button.tsx` — Updated styling to match sidebar design
  - `domains/order/order.api.ts` — Added `getMyOrders()` using proxy route
  - `domains/order/order.query.ts` — Added `myOrdersOptions` query options
  - `domains/order/order.types.ts` — Added `MyOrdersParams`, `MyOrdersResponse` types
- **Removed redundant redirect guard** in `me/page.tsx` — middleware `authorized` callback already protects `/me` routes

## Known Issues

1. `domains/search/search-autocomplete.tsx` is misplaced — should live in `components/search/`. Needs relocation.

## Next Steps

1. **Complete Account domain** (if anything remaining):
   - Verify order history pagination works end-to-end
   - Add any missing edge cases

## Active Patterns

**Component ownership:**

- Components own their UI state (forms own fields, not parents)
- Pass domain objects, not many individual props
- Mutation side effects defined at call site, not in `mutationOptions`

**State management tiers:**

- Zustand for global client state: cart, wishlist, UI toggles (drawers, theme)
- TanStack Query for server state: products, orders, search results
- `useState` for component-local UI state: form fields, modals, tabs

**Auth architecture (simplified):**

- Auth.js v5 with Google OAuth only (no credentials/password)
- JWT session strategy
- `signIn` callback: backend handshake via `POST /users/google`, stores backend token in JWT
- `authorized` callback: checks Auth.js session for route protection
- `getBackendToken()`: server-only helper that decodes Auth.js JWT and returns the backend token
- API proxy route: uses `getBackendToken()` for `Authorization: Bearer` header
- Middleware: thin proxy `export { auth as middleware }`
- Logout: just `signOut({ redirectTo: "/login" })` — no backend call, no cookie cleanup

**AbortController:**

- Used in search only — cancels stale requests via `signal` in queryFn

**Empty states:**

- Always provide next action
- Use `components/ui/empty-state.tsx` variants
- Contextual variants: `EmptyCartEmptyState`, `EmptyWishlistEmptyState`, `NoSearchResultsEmptyState`, `NoOrdersEmptyState`, etc.

## Project Insights

- Server prefetch only where it provides clear UX/SEO benefit
- Guest-first removes friction — account is optional convenience
- Order token 404 after delivery is deliberate security — not a bug
- Client-only features (cart, wishlist) use same architecture as server-synced domains — no special cases
- Auth is convenience, not requirement — Google OAuth removes password management burden, backend owns identity handshake
- One session, one cookie (Auth.js), one place storing the backend token (Auth.js JWT) — no duplicate authentication state
- Backend token never reaches the browser — retrieved server-side via `getBackendToken()`
