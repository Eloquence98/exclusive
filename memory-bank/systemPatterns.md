# System Patterns — Exclusive

## Architecture Overview

Exclusive uses a domain-driven frontend architecture built with Next.js 15 App Router. Every responsibility has a single owner.

| Responsibility                              | Owner              |
| ------------------------------------------- | ------------------ |
| Routing, layouts, metadata, loading, errors | Next.js App Router |
| Server state                                | TanStack Query     |
| HTTP communication                          | Domain API layer   |
| UI rendering                                | React Components   |
| Local component state                       | useState           |
| Global client state                         | Zustand            |
| Business data                               | External backend   |

---

## Project Structure

The application is organized into:

- **app/** — routing, layouts, metadata, loading, and error boundaries
- **domains/** — business logic grouped by domain
- **components/** — reusable presentation components
- **lib/** — shared infrastructure
- **hooks/**, **types/**, **utils/** — shared application code

---

## Data Flow

### Reads

```text
Backend
    ↓
API layer
    ↓
TanStack Query
    ↓
React Component
    ↓
UI
```

### Writes

```text
UI
    ↓
Mutation
    ↓
API layer
    ↓
Backend
    ↓
Invalidate queries / update UI
```

---

## Layer Responsibilities

### app/

- Routing and layouts
- Metadata, loading, and error boundaries
- Server Components by default
- Server-side query prefetching where beneficial
- No business logic

### components/

- Pure presentation
- Consume domain query and mutation definitions
- No API calls or business rules

### domains/

- Own all business logic
- Manage API communication, queries, mutations, utilities, and optional client state
- Never render UI
- Remain independent of other domains

### lib/

- Shared infrastructure only

### hooks/, types/, utils/

- Shared reusable application code with no domain-specific business logic

---

## State Management

| State               | Owner          |
| ------------------- | -------------- |
| Server data         | TanStack Query |
| Global client state | Zustand        |
| Local UI state      | useState       |

Server state is never duplicated in Zustand.

---

## Component Patterns

- Pages compose features and coordinate mutations.
- Components own their internal UI state.
- Pass domain objects instead of many primitive props.
- Mutation side effects are defined where mutations are used.
- Components focus on presentation rather than business logic.

---

## Query Pattern

Each domain exposes consistent query and mutation definitions, enabling predictable caching, invalidation, and data synchronization across the application.

---

## Server Prefetching

Server Components prefetch queries only when it provides measurable UX or SEO benefits. Client components consume the hydrated cache through TanStack Query.

---

## Search Pattern

Search is split into two responsibilities:

- A reusable search input responsible for UI and interaction.
- A search feature responsible for debouncing, autocomplete, request cancellation, and search results.

---

## Empty State Pattern

Empty states use shared reusable components and always provide a meaningful next action instead of leaving the user at a dead end.
