# Frontend Architecture

## Stack

Headless ecommerce storefront: Next.js + React + TanStack Query + Zustand + API Layer.

## Layer Flow

Browser → Next.js Route → Page → React Component → TanStack Query → API Layer → Backend

Do not skip layers. Components must never call backend APIs directly.

## Layer Responsibilities

**Next.js** — routing, layouts, metadata, SEO, error boundaries. No business logic in routes.

**React Components** — UI rendering, styling, user interaction only.

**TanStack Query** — sole owner of all server state (products, categories, orders, user data, etc.). Do not store server state in Zustand or React state.

**Zustand** — global client state only (cart, wishlist, theme, drawer/sidebar, preferences).

**React state** — component-only UI state (modals, tabs, form inputs).

**API Layer** — all HTTP communication, request/response handling, error normalization. No React or UI logic here.

## Organization

- Organize by business domain: auth, catalog, search, cart, checkout, orders, wishlist, account.
- One responsibility per module. Do not combine rendering, state, and API concerns.
- Backend is source of truth. Do not duplicate backend business logic in the frontend.
