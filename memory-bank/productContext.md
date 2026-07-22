# Product Context — Exclusive

## What Exclusive Is

Exclusive is a fictional ecommerce storefront selling apparel and lifestyle products.

Categories: `t-shirts`, `shirts`, `polos`, `jeans`, `shorts`, `trousers`, `activewear`, `fragrances`, `shoes`, `underwear`.

## Core User Journey

```text
Browse catalog / search
        ↓
View product detail
        ↓
Add to cart (persists client-side via Zustand)
        ↓
Checkout as guest (no account required)
        ↓
Order confirmed (access token issued, confirmation email sent)
        ↓
Track order (via token link or order number + email lookup)
```

## Guest-First Checkout

Purchasing does not require an account.

- Orders are authenticated via a secure token issued at checkout
- Token is delivered to the customer via email
- Order tracking works via token (from email link) or order number + email as fallback
- Account creation is offered post-purchase as a convenience, never a requirement

## Order Lifecycle

```text
processing → confirmed → shipped → delivered
                                 ↘ cancelled
```

Once an order reaches `delivered` or `cancelled`, the backend invalidates the guest access token. The order confirmation endpoint returns `404` after this point. This is a deliberate backend security boundary.

## UX Principles

- Empty states always offer a next action — never a dead end
- Skeletons over blank loading screens
- Forms preserve entered values on error
- Previous data stays visible during refetches
- Core shopping actions are never gated behind a login wall
- Search autocomplete fires as the user types (debounced, with `AbortController` cancellation)
- Full search results page supports category, brand, price range, and on-sale filters
