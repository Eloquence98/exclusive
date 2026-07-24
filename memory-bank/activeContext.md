# Active Context — Exclusive

## Current Focus

Auth domain implementation is **complete** — Google OAuth via Auth.js v5 with full backend sync:

- Auth.js v5 configured with Google provider, JWT session strategy
- `signIn` callback calls backend `POST /users/google` with Google `id_token` to create/retrieve user
- Backend-issued token stored in JWT and exposed via session
- `SyncToken` client component reads `backendToken` from session and sets it as HttpOnly cookie
- API proxy route (`/api/proxy`) reads `jwt` cookie and forwards authenticated requests with `Authorization: Bearer` header
- Customer domain created with types and API function for backend handshake
- Next-auth types extended (`id`, `role`, `backendToken` on Session/User/JWT)

## Recent Work

- **Completed Auth backend sync** (commit `c776e0c`):
  - Implemented `signIn` callback with backend handshake
  - Updated `jwt` and `session` callbacks to propagate backend token
  - Created `customer` domain (`customer.api.ts`, `customer.types.ts`)
  - Created `SyncToken` component for HttpOnly cookie management
  - Created server action `setBackendTokenCookie`
  - Created API proxy route for authenticated backend requests
  - Extended NextAuth type declarations
  - Wrapped app in `SessionProvider` with server-side session hydration
  - Added optional `token` field to `ApiResponse` interface

## Known Issues

1. `domains/search/search-autocomplete.tsx` is misplaced — should live in `components/search/`. Needs relocation.

## Next Steps

1. **Build Account domain** (minimal scope):
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

**Auth pattern (complete):**

- Auth.js v5 with Google OAuth only (no credentials/password)
- JWT session strategy
- `signIn` callback: backend handshake via `POST /users/google` with Google `id_token`
- Backend token flows: `signIn` → `jwt` callback → `session` callback → `SyncToken` component → HttpOnly cookie → API proxy
- API proxy route forwards authenticated requests with `Authorization: Bearer <token>`
- Middleware protects `/me` routes, redirects logged-in users from `/login`

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
- Backend token is stored in HttpOnly cookie via server action for security (not accessible to JS)
- API proxy pattern centralizes auth header injection for all authenticated requests
