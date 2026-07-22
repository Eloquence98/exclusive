# Active Context — Exclusive

## Current Focus

Building **Wishlist** domain next.

## Recent Work

- Completed Search domain (autocomplete + full results page with filters)
- Completed Order Tracking domain (lookup form + status timeline)
- Established search component pattern: `SearchInput` (reusable UI) + `SearchAutocomplete` (feature)

## Known Issues

`domains/search/search-autocomplete.tsx` is misplaced — should live in `components/search/`. Needs relocation.

## Next Steps

1. Decide: Wishlist as client-only (localStorage) or backend-synced
2. Build Wishlist domain
3. Build Auth domain (enables account features)
4. Build Account domain (profile, order history, settings)

## Active Patterns

**Component ownership:**

- Components own their UI state (forms own fields, not parents)
- Pass domain objects, not many individual props
- Mutation side effects defined at call site, not in `mutationOptions`

**Search pattern established:**

- `SearchInput` — reusable UI (owns `query`, `isExpanded`)
- `SearchAutocomplete` — feature (debounce, query, navigation)

**AbortController:**

- Used in search only — cancels stale requests via `signal` in queryFn

**Empty states:**

- Always provide next action
- Use `components/ui/empty-state.tsx` variants

## Project Insights

- Server prefetch only where it provides clear UX/SEO benefit
- Guest-first removes friction — account is optional convenience
- Order token 404 after delivery is deliberate security — not a bug
