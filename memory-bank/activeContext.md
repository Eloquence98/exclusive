# Active Context — Exclusive

## Current Focus

Authentication architecture has been **simplified to a single session manager**:

- **Auth.js is the only session manager** — one cookie, one source of truth
- Backend JWT is stored **only inside the Auth.js JWT** (via `jwt` callback)
- Backend token is **never exposed to the browser** — not in `session` callback, not in a custom cookie
- `getBackendToken()` helper (in `get-backend-token.ts`) is the only way server-side code retrieves the backend token
- Route protection uses Auth.js `authorized` callback checking `auth` session
- Logout is just Auth.js `signOut()` — no backend logout call, no cookie cleanup

## Recent Work

- **Removed custom `jwt` cookie** — no more `cookies().set("jwt", ...)` in `signIn` callback
- **Updated proxy route** — uses `getBackendToken()` instead of reading a custom cookie
- **Simplified logout** — just `signOut({ redirectTo: "/login" })`, no `handleSignOut` or backend logout
- **Deleted `lib/actions.ts`** — `setBackendTokenCookie`, `clearBackendTokenCookie`, `handleSignOut` all removed
- **Removed `logoutUser()`** from `customer.api.ts` — no longer called
- **Cleaned up `layout.tsx`** — removed leftover `auth()` call and `console.log`
- **Cleaned up `me/page.tsx`** — removed debug `<pre>` tags exposing session and token

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
- Contextual variants: `EmptyCartEmptyState`, `EmptyWishlistEmptyState`, `NoSearchResultsEmptyState`, etc.

## Project Insights

- Server prefetch only where it provides clear UX/SEO benefit
- Guest-first removes friction — account is optional convenience
- Order token 404 after delivery is deliberate security — not a bug
- Client-only features (cart, wishlist) use same architecture as server-synced domains — no special cases
- Auth is convenience, not requirement — Google OAuth removes password management burden, backend owns identity handshake
- One session, one cookie (Auth.js), one place storing the backend token (Auth.js JWT) — no duplicate authentication state
- Backend token never reaches the browser — retrieved server-side via `getBackendToken()`
