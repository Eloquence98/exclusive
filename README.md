# Exclusive

A headless e-commerce storefront for a fictional apparel and lifestyle brand. This repository contains the **frontend only**.

## Key Features

- **Catalog** — product listing with filters (category, brand, price, on-sale), product detail pages, and dynamic catalog stats
- **Search** — instant autocomplete with debouncing and request cancellation, plus a full search results page with filters
- **Cart** — add/remove/update items, persisted client-side via Zustand + localStorage
- **Wishlist** — client-only wishlist with "Move to Cart" action
- **Checkout** — guest checkout flow (no account required) with shipping address form and order confirmation
- **Order Tracking** — track by token (from email link) or order number + email, with live status timeline
- **Authentication** — Google OAuth via Auth.js v5, JWT session strategy, backend token stored server-side only
- **Account** — profile page and authenticated order history with pagination
- **Marketing** — hero, featured/trending/top-rated product sections, category bento grid, newsletter, testimonials

## Tech Stack

| Category         | Technology           | Version          |
| ---------------- | -------------------- | ---------------- |
| Framework        | Next.js (App Router) | `15.5.20`        |
| Language         | TypeScript           | `^6.0.3`         |
| UI               | React                | `19.0.0`         |
| Styling          | Tailwind CSS         | `^3.4.1`         |
| Server State     | TanStack Query       | `^5.101.2`       |
| Client State     | Zustand              | `^5.0.14`        |
| Authentication   | NextAuth (Auth.js)   | `^5.0.0-beta.32` |
| UI Primitives    | Radix UI             | `^1.x`           |
| Animations       | Motion               | `^12.43.0`       |
| Icons            | Lucide React         | `^1.23.0`        |
| Toasts           | Sonner               | `^2.0.7`         |
| Carousel         | Swiper               | `^11.1.4`        |
| Image Processing | Sharp                | `^0.33.4`        |

## Prerequisites

- Node.js (version compatible with Next.js 15)
- npm
- A running backend API (see [Environment Variables](#environment-variables))

## Installation & Running

```bash
# 1. Clone the repository
git clone git@github.com:Eloquence98/exclusive.git
cd exclusive

# 2. Install dependencies
npm install

# 3. Create the environment file
cp .env.example .env.local

# 4. Set the required environment variables (see below)

# 5. Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## Environment Variables

This application requires an external backend API. Create a `.env.local` file (or copy `.env.example`) and define the following variables:

| Variable              | Required | Description                                                                         |
| --------------------- | -------- | ----------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the backend API. Defaults to `http://localhost:8000/api/v1` if not set. |
| `AUTH_SECRET`         | Yes      | Secret used by Auth.js to sign session tokens. Required for authentication.         |
| `AUTH_GOOGLE_ID`      | Yes\*    | Google OAuth client ID (required for Google sign-in).                               |
| `AUTH_GOOGLE_SECRET`  | Yes\*    | Google OAuth client secret (required for Google sign-in).                           |

\* Required if Google OAuth authentication is used. Without these, sign-in will not work.

> **Note:** The backend is external and not part of this repository. This frontend consumes the API at `NEXT_PUBLIC_API_URL` and does not include backend setup instructions.

## Build & Deployment

```bash
# Production build
npm run build

# Start the production server
npm start
```

This is a standard Next.js application. Deploy to any host that supports Next.js (e.g., Vercel, a Node.js server, or a containerized environment).

## Project Structure

```
src/
├── app/                    # Routing, layouts, metadata, loading, error boundaries
│   ├── (auth)/             # Authentication pages (login)
│   ├── (marketing)/        # Public pages (home, shop, checkout, orders, search, static pages)
│   ├── (user)/             # Authenticated account pages (profile, order history)
│   └── api/                # API routes (auth handlers, proxy)
├── components/             # Reusable presentation components
│   ├── account/            # Account-related UI
│   ├── commerce/           # Commerce UI (cart, checkout, product cards)
│   ├── layout/             # Layout components (navbar, footer, drawers)
│   ├── marketing/          # Marketing/homepage sections
│   └── ui/                 # Core UI primitives (shadcn/ui style)
├── domains/                # Business logic grouped by domain
│   ├── auth/               # Authentication
│   ├── cart/               # Cart (client state)
│   ├── catalog/            # Products
│   ├── checkout/           # Checkout
│   ├── customer/           # Customer/user data
│   ├── order/              # Orders
│   ├── search/             # Search
│   └── wishlist/           # Wishlist (client state)
├── hooks/                  # Shared React hooks
├── lib/                    # Shared infrastructure
├── styles/                 # Global styles
├── types/                  # Shared TypeScript types
└── utils/                  # Shared utility functions
```

### Architecture

The application follows a layered, domain-driven architecture:

- **Next.js App Router** — routing, layouts, metadata, SEO, error/loading boundaries. No business logic in routes.
- **React Components** — UI rendering and styling only.
- **TanStack Query** — sole owner of all server state (products, categories, orders, user data, etc.).
- **Zustand** — global client state only (cart, wishlist, theme, drawers, preferences).
- **React state** — component-only UI state (modals, tabs, form inputs).
- **API Layer** — all HTTP communication, request/response handling, error normalization. No React or UI logic.

Components never call backend APIs directly. All server state flows through TanStack Query, which uses the API layer.

## License

This project is for demonstration purposes. No license is specified.
