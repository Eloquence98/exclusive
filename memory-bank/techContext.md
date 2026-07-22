# Tech Context — Exclusive

## Stack

**Frontend:**

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS
- TanStack Query v5 (server state)
- Zustand (client state)
- Framer Motion (animations)
- shadcn/ui + Radix primitives
- Lucide icons, Sonner toasts

**Backend:**

- External API — separate repo
- Node.js + Express + MongoDB (Mongoose)
- MongoDB Atlas Search (search/autocomplete)
- Base URL: `NEXT_PUBLIC_API_URL`

## Setup

npm install
npm run dev

Requires backend running at `http://localhost:8000/api/v1` or set via `NEXT_PUBLIC_API_URL`.

## Constraints

- Backend is external — never modify it from this repo
- API responses return `data` directly (not nested `data.data`)
- `id` is used instead of `_id` in all API responses
- Search uses AbortController for request cancellation
