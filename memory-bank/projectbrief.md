# Project Brief — Exclusive

## What This Is

**Exclusive** is a fictional ecommerce brand created for demonstration purposes This repository contains the **frontend only** — a Next.js 15 (App Router) application built using a clean, domain-driven architecture.

This is a solo frontend project. The backend is a **separate, external repository** — Node.js + Express + MongoDB (Mongoose) — and is treated as a black-box API. The frontend never assumes backend implementation details beyond documented API contracts.

## Purpose

This project exists to demonstrate production-grade frontend engineering:

- Clean domain-driven architecture
- Proper separation of server state (TanStack Query) vs client state (Zustand) vs local state (`useState`)
- Real-world ecommerce UX patterns (checkout, order tracking, search, etc.)

There is no real business behind "Exclusive" — it is a fictional brand created for demonstration purposes selling apparel and lifestyle products (t-shirts, shirts, polos, jeans, shorts, trousers, activewear, fragrances, shoes, underwear).

## Core Requirements

1. **Domain-driven architecture** — business logic lives in `domains/`, never in components or pages
2. **TanStack Query owns all server state** — products, orders, search results, cart (if backend-owned)
3. **Next.js App Router owns routing only** — layouts, metadata, SEO, error/loading boundaries
4. **Zustand owns global client state only** — cart (client-owned), UI toggles, modals
5. **Backend is the single source of truth** — frontend never duplicates business logic

## Scope Boundaries

### In Scope

- Full ecommerce frontend: catalog, cart, checkout, order tracking, search
- Guest checkout flow (no auth required to purchase)

### Out of Scope

- Backend development (external repo, not touched here)
- Testing setup (not a current priority for this project)
- Deployment configuration (not a current priority for this project)
- Multi-brand or white-label support — this is a single fictional brand

## Source of Truth

This document is the foundation. All other memory bank files (`productContext.md`, `systemPatterns.md`, `techContext.md`, `activeContext.md`, `progress.md`) must remain consistent with what is defined here.
