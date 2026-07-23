# Active Context — Exclusive

## Current Focus

Auth domain implementation is in progress — **Google OAuth via Auth.js v5** baseline is functional:

- Auth.js v5 configured with Google provider, JWT session strategy
- Login page simplified to only Google sign-in button (no credentials form)
- Removed legacy pages: signup, forgot-password, reset-password
- `/me` route created as placeholder authenticated page
- `middleware.ts` updated with auth protection for `/me` routes
- Backend sync (handshake for user creation/retrieval + token management) **still pending**

## Recent Work

- Completed **Auth domain initial setup** (3 commits):
  1. `0b21fd4` — Add initial Auth.js Google OAuth setup
  2. `e206135` — Update login flow UI with Google sign-in and sign out
  3. `ef33c8a` — Working Google Auth baseline (backend sync pending)
- Installed `next-auth@beta` dependency
- Deleted legacy auth pages (signup, forgot-password, reset-password)
- Created `signin.tsx` component (Google sign-in button with server action)
- Created `signout-button.tsx` component
- Created `src/app/api/auth/[...nextauth]/route.ts` route handler
- Created `src/domains/auth/auth.ts` — NextAuth config with Google provider + JWT strategy

## Known Issues

1. `domains/search/search-autocomplete.tsx` is misplaced — should live in `components/search/`. Needs relocation.
2. Auth backend sync not yet implemented — `jwt` and `session` callbacks are stubs (no backend token attached to JWT)

## Next Steps

1. **Complete Auth backend sync** — Auth.js callbacks need to:
   - On sign-in: handshake with backend API to create/retrieve user
   - Store backend-issued token in the JWT
   - Attach token to session for authenticated API requests
2. **Build Account domain** (minimal scope):
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

**Auth pattern (in progress):**

- Auth.js v5 with Google OAuth only (no credentials/password)
- JWT session strategy
- Server action for sign-in (`signin.tsx` form action)
- Middleware protects `/me` routes
- Backend token attachment in JWT callback — **not yet implemented**

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
