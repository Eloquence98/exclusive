Good. Now we move from **“what we believe” (architecture)** to **“where things live” (structure)**.

This is the document that will prevent your project from turning into a mixed “lib folder soup” later.

---

# 📄 `docs/project-structure.md` (v1)

## Purpose

This document defines the **physical structure of the frontend codebase**.

It translates the architectural principles into a maintainable folder system for a Next.js 15 + TanStack Query ecommerce application.

This structure is designed to:

- Scale with multiple ecommerce domains
- Keep backend, UI, and caching concerns separated
- Prevent coupling between components and data fetching
- Support incremental migration from the existing codebase

---

# 1. High-level structure

The project is divided into 5 main areas:

```text id="v0x9qp"
src/
├── app/              → Route layer (Next.js App Router)
├── components/      → Pure UI components
├── domains/         → Business logic (NEW)
├── lib/             → Shared infrastructure
├── hooks/           → Generic React hooks
```

---

# 2. App Layer (Next.js ownership)

```text id="q9x1ld"
src/app/
```

## Responsibility

This layer is ONLY responsible for:

- Routing
- Layouts
- Metadata / SEO
- Error boundaries
- Loading states
- Page composition

## Rules

- ❌ No API calls
- ❌ No TanStack Query definitions
- ❌ No business logic
- ❌ No fetch logic
- ❌ No stores

## Example structure

```text id="p3m8dd"
app/
├── (marketing)/
├── (shop)/
├── (auth)/
├── layout.tsx
├── page.tsx
├── error.tsx
└── not-found.tsx
```

---

# 3. Components Layer (UI only)

```text id="c7x2mn"
src/components/
```

## Responsibility

Pure presentational UI components.

- Buttons
- Cards
- Inputs
- Product display components
- Layout UI elements

## Rules

- ❌ No data fetching
- ❌ No API calls
- ❌ No TanStack Query
- ❌ No business logic

## Example structure

```text id="k2v8ss"
components/
├── ui/
├── layout/
├── product/
├── cart/
├── search/
```

## Key rule

A component should only answer:

> “How does this look and behave visually?”

Not:

> “Where does this data come from?”

---

# 4. Domains Layer (NEW - core of architecture)

```text id="d8q2aa"
src/domains/
```

## This is the MOST important layer

This is where all business logic lives.

Each domain is a **self-contained module**.

---

## Domains structure

```text id="f3k9zz"
domains/
├── catalog/
├── search/
├── cart/
├── checkout/
├── orders/
├── account/
├── auth/
├── marketing/
```

---

## Each domain contains:

```text id="m9x1aa"
catalog/
├── api/        → backend communication (domain-specific)
├── queries/    → TanStack Query definitions
├── mutations/  → write operations
├── types/      → domain types
├── utils/      → domain logic
```

---

## Example: catalog domain

```text id="p8q1xx"
catalog/
├── api/
│   ├── products.api.ts
│   ├── categories.api.ts
│
├── queries/
│   ├── products.query.ts
│   ├── product-detail.query.ts
│
├── mutations/
│   ├── product-review.mutation.ts
│
├── types/
│   ├── product.types.ts
│
└── utils/
    ├── product-filters.ts
```

---

## Domain rules

- ✅ Domain owns its business logic
- ✅ Domain owns its queries/mutations
- ❌ Domain cannot render UI
- ❌ Domain cannot depend on components
- ❌ Domain cannot access other domains directly

---

## Why this layer exists

This prevents:

- `lib/` becoming a dumping ground
- random API calls inside components
- duplicated query logic
- unstructured TanStack usage

---

# 5. Lib Layer (Infrastructure only)

```text id="x2k9vv"
src/lib/
```

## Responsibility

Shared infrastructure used by ALL domains.

---

## Contains:

```text id="a9q3ll"
lib/
├── api-client.ts     → fetch wrapper (base HTTP client)
├── query-client.ts   → TanStack Query client config
├── auth.ts           → auth helpers (token handling)
├── constants.ts      → app-wide constants
├── utils.ts          → generic utilities
```

---

## Rules

- ❌ No business logic
- ❌ No UI logic
- ❌ No domain-specific code
- ❌ No page-level logic

---

## Key principle

> lib = infrastructure only

Not features.

Not business logic.

Not UI.

---

# 6. Hooks Layer

```text id="h4k8pp"
src/hooks/
```

## Responsibility

Reusable React behavior that is NOT domain-specific.

---

## Examples

```text id="k8q2zz"
hooks/
├── useDebounce.ts
├── useOutsideClick.ts
├── useMediaQuery.ts
├── useLocalStorage.ts
```

---

## Rules

- ❌ No API calls
- ❌ No TanStack Query domain logic
- ❌ No business logic
- ❌ Must be reusable across domains

---

# 7. Data Flow Model

This structure enforces a strict one-way flow:

```text id="z9x2aa"
Backend
   ↓
lib/api-client
   ↓
domains/*/api
   ↓
domains/*/queries (TanStack)
   ↓
components
   ↓
UI
```

Mutations:

```text id="m2q9vv"
UI
   ↓
domains/*/mutations
   ↓
domains/*/api
   ↓
Backend
   ↓
invalidate queries
   ↓
UI update
```

---

# 8. What we are replacing from your current project

### ❌ To be removed / refactored

- `lib/api.ts` → becomes `lib/api-client.ts + domains/*/api`
- `lib/data-service.js` → moves into domains
- `store.ts` → split into:

  - Zustand (UI state only)
  - TanStack Query (server state)

- mixed `actions.js` → replaced by domain mutations

---

# 9. What stays mostly unchanged

- `app/` structure
- `components/` (with cleanup)
- `hooks/` (with refinement)
- `utils/` (slight cleanup)

---

# 10. Migration Strategy (important)

We DO NOT restructure everything at once.

We migrate incrementally:

## Step 1

Introduce new structure alongside old code

## Step 2

Migrate ONE domain first:

```text id="c8x1aa"
catalog (products)
```

## Step 3

Validate architecture in real usage

## Step 4

Move to next domain

---

# Final principle

> **We are not rewriting the app. We are reorganizing it into domains.**

---

## Where we are now

You now have:

1. `frontend-architecture.md` → WHY (rules & principles)
2. `project-structure.md` → WHERE (folder system)

---

## Next step (important)

If you're aligned with this structure, the next thing we do is:

> **Map your EXISTING code into this structure (real migration plan)**

That means:

- we take your current folders
- we classify every file
- we decide: move / refactor / delete / keep
- we pick the FIRST domain to migrate (usually `catalog`)

That is the point where we start turning this blueprint into actual engineering work.
