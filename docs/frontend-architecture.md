# Frontend Architecture Blueprint v1

> This document defines architectural principles, not implementation details. Folder names, internal organization, and implementation may evolve over time, but the responsibilities and boundaries described here are considered stable.

# Vision

The application is a **headless ecommerce storefront** built with **Next.js App Router**.

Next.js is responsible for application composition, routing, and SEO.

TanStack Query manages backend data synchronization and server state.

Zustand manages client-side application state.

The backend is the single source of truth for business data.

The frontend consumes backend APIs and focuses on rendering UI and managing user interactions.

---

# Authentication Strategy

Authentication is not currently part of the storefront architecture.

Future authentication implementation should integrate with the existing architecture while keeping authentication concerns separate from UI components and business logic.

---

# State Management Strategy

## Server State

Managed exclusively by TanStack Query.

Server state represents backend-owned data.

Examples:

- Products
- Categories
- Product Details
- Search Results
- Orders
- User Data
- Inventory

---

## Global Client State

Managed by Zustand.

Global client state represents frontend-owned application state.

Examples:

- Cart
- Wishlist
- Mobile Drawer
- Sidebar State
- Theme
- Client Preferences

Cart and Wishlist are managed locally by the storefront and are not treated as backend server state.

---

## Local Component State

Managed with React state.

Examples:

- Selected Tabs
- Form Inputs
- Image Gallery State
- Hover State
- Modal Visibility
- Accordion State

---

# Business Domains

The application is organized around business domains rather than pages.

Current domains:

- Authentication
- Catalog
- Search
- Cart
- Checkout
- Orders
- Wishlist
- Account
- Marketing

Each feature belongs to a business domain.

---

# Application Flow

Backend data follows:

```
Browser
    │
    ▼
Next.js Route
    │
    ▼
Page Composition
    │
    ▼
React Components
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

Client-owned state follows:

```
User Interaction
    │
    ▼
React Components
    │
    ▼
Zustand Store
    │
    ▼
Updated UI
```

Checkout submission follows:

```
Cart State
    │
    ▼
Checkout
    │
    ▼
API Layer
    │
    ▼
Backend
    │
    ▼
Order Creation
```

---

# Backend Responsibilities

The backend owns:

- Business rules
- Validation
- Persistence
- Authorization
- Product data
- Order processing
- Business data

The backend remains the single source of truth for persistent business data.

---

# Architecture Rules

1. Business logic belongs to the backend.
2. Components never communicate directly with backend APIs.
3. TanStack Query manages backend server state.
4. Zustand manages global client-side application state.
5. Modules should have a single responsibility.
6. Shared infrastructure should be reused across domains.
7. Architecture boundaries remain stable even if implementation details change.
