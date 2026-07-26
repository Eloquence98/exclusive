# Active Context — Exclusive

## Current Focus

**Theme audit complete** — all hardcoded Tailwind color utilities (zinc, white, black, gray, slate, neutral) have been replaced with semantic CSS variable classes throughout the entire frontend.

## Recent Work

- **Theme color audit** (uncommitted): Replaced all hardcoded color utilities with semantic theme classes across 32 files:
  - Core UI components: `input.tsx`, `label.tsx`, `button.tsx`, `dialog.tsx`, `sheet.tsx`, `accordion.tsx`, `card.tsx`, `empty-state.tsx`, `search-input.tsx`, `sonner.tsx`
  - Layout: `footer.tsx`, `portfolio-banner.tsx`, `announcement-bar.tsx`, `marketing/layout.tsx`, `me/layout.tsx`
  - Marketing: `hero-section.tsx`, `section-header.tsx`, `category-bento-grid.tsx`, `why-choose-us.tsx`, `trending-products.tsx`, `testimonials.tsx`, `newsletter-section.tsx`, `featured-products.tsx`, `top-rated-products.tsx`
  - Pages: `(auth)/layout.tsx`, `(marketing)/page.tsx`, `loading.jsx`, `not-found.jsx`
  - Account: `order-status-badge.tsx`, `order-timeline.tsx`
- **Brand rename** (commit `584648f`): Changed "ATELIER" to "EXCLUSIVE" across all UI text, metadata, SEO titles, and localStorage keys
- **Account domain** (commit pending): Profile page, order history, sidebar navigation

## Known Issues

1. `domains/search/search-autocomplete.tsx` is misplaced — should live in `components/search/`. Needs relocation.

## Next Steps

1. **Verify dark mode** — ensure all semantic classes render correctly when a dark theme is applied
2. **Complete Account domain** — verify order history pagination works end-to-end

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
- **Theme system**: All colors derive from semantic CSS variables (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--ring`, `--destructive`, etc.) — no hardcoded Tailwind color utilities for theme-equivalent colors. This ensures consistent dark mode support and theming.
