> **This document defines architectural principles, not implementation details. Folder names, internal organization, and implementation may evolve over time, but the responsibilities and boundaries described here are considered stable.**

# Frontend Architecture Blueprint v1

## Vision

The application is a **headless ecommerce frontend** built with **Next.js App Router**.

Next.js is responsible for application composition and SEO.

TanStack Query is responsible for all server state.

The backend is the single source of truth for business data.

The frontend consumes backend APIs and focuses on rendering UI and managing client interactions.

---

# Core Principles

### 1. Single Source of Truth

Business data is owned by the backend.

The frontend never duplicates business logic or attempts to become another source of truth.

---

### 2. Clear Ownership

Every responsibility has exactly one owner.

| Responsibility        | Owner              |
| --------------------- | ------------------ |
| Routing               | Next.js App Router |
| Layouts               | Next.js            |
| Metadata / SEO        | Next.js            |
| Error Boundaries      | Next.js            |
| Loading UI            | Next.js            |
| Server State          | TanStack Query     |
| HTTP Communication    | API Layer          |
| UI Rendering          | React Components   |
| Local Component State | useState           |
| Global Client State   | Zustand            |
| Business Data         | Backend            |

---

### 3. Layered Architecture

Every request follows the same pipeline.

```text
Browser
    │
    ▼
Next.js Route
    │
    ▼
Page
    │
    ▼
UI Components
    │
    ▼
TanStack Query
    │
    ▼
API Layer
    │
    ▼
Backend
```

Mutations follow the reverse path.

```text
User Action
    │
    ▼
Mutation
    │
    ▼
API Layer
    │
    ▼
Backend
    │
    ▼
Query Invalidation
    │
    ▼
Updated UI
```

---

# Business Domains

The application is organized around business domains rather than pages.

Current domains include:

- Authentication
- Catalog (Products, Categories, Collections)
- Search
- Cart
- Checkout
- Orders
- Wishlist
- Account
- Marketing

Every new feature belongs to one business domain.

---

# Application Layers

## Route Layer

Responsibilities:

- Routes
- Layouts
- Metadata
- SEO
- Error pages
- Loading pages
- Route composition

Does **not** contain business logic.

---

## Presentation Layer

Responsibilities:

- React components
- Rendering
- Styling
- User interaction

Components should not communicate directly with the backend.

---

## Query Layer

Responsibilities:

- Server state
- Queries
- Mutations
- Cache management
- Invalidations
- Optimistic updates
- Background synchronization

Only TanStack Query manages server state.

---

## API Layer

Responsibilities:

- HTTP client
- Authentication headers
- Endpoint functions
- Error normalization
- Request/response transformation

No React or UI concerns exist here.

---

## Backend

Responsibilities:

- Business rules
- Validation
- Persistence
- Authorization
- Business data

The backend is the only source of truth.

---

# State Management Strategy

## Server State

Managed exclusively by TanStack Query.

Examples:

- Products
- Categories
- Product Details
- Search Results
- Cart (if backend-owned)
- Orders
- User Profile
- Wishlist
- Inventory
- Coupons

---

## Global Client State

Managed by Zustand.

Examples:

- Mobile Drawer
- Sidebar State
- Theme
- Client Preferences
- Other application-wide UI state

---

## Local Component State

Managed with React state.

Examples:

- Selected Tab
- Form Inputs
- Image Gallery
- Hover State
- Modal Visibility
- Accordion State

---

# Rendering Philosophy

Every route renders an application shell first.

The shell consists of:

- Layout
- Navigation
- Footer
- Metadata
- Static UI
- Skeletons
- Error Boundaries

Dynamic business data is fetched by TanStack Query after hydration unless server prefetching provides a measurable benefit.

---

# Server Prefetching Philosophy

Server prefetching is an optimization.

It is **not** the default architecture.

Each route decides independently whether it benefits from:

- `prefetchQuery`
- `dehydrate`
- `HydrationBoundary`

If not required, the route renders the shell and lets the client fetch data.

---

# Design Principles

### Single Responsibility

Every module should answer one question.

Examples:

- ProductCard → How is a product displayed?
- Product Query → How is product data cached?
- Products API → How are products requested?
- Product Page → How is the route composed?

---

### No Layer Skipping

Components never communicate directly with the backend.

All business data flows through:

```text
Backend
    ↓
API Layer
    ↓
TanStack Query
    ↓
React Components
```

---

### Reusable Infrastructure

Infrastructure should be shared.

Examples:

- Query Client
- API Client
- Authentication
- Query Keys
- Error Handling

Business domains consume infrastructure rather than reimplementing it.

---

# Migration Strategy

1. Finalize frontend architecture.
2. Design project structure.
3. Build shared infrastructure.
4. Replace mock APIs with backend APIs.
5. Migrate one business domain at a time.
6. Apply server prefetching only where beneficial.

---
