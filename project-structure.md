# Project Structure

## Directory Structure Overview

```
luxe-clothing-store/
├── .next/                  # Next.js build output
├── src/                    # Source code directory
│   ├── app/                # Main application code (Next.js App Router)
│   │   ├── (auth)/         # Authentication route group
│   │   │   ├── login/      # Login page
│   │   │   └── signup/     # Signup page
│   │   ├── (main)/         # Main content route group
│   │   │   ├── about/      # About page
│   │   │   ├── account/    # User account pages
│   │   │   └── contact/    # Contact page
│   │   ├── (shop)/         # Shopping-related route group
│   │   │   ├── cart/       # Shopping cart
│   │   │   ├── checkout/   # Checkout process
│   │   │   ├── products/   # Product listings and details
│   │   │   ├── search/     # Search functionality
│   │   │   └── wishlist/   # User wishlist
│   │   ├── api/            # API route handlers
│   │   │   └── auth/       # Authentication endpoints
│   │   ├── error.jsx       # Error boundary
│   │   ├── layout.jsx      # Root layout
│   │   ├── loading.jsx     # Loading state
│   │   ├── not-found.jsx   # 404 page
│   │   ├── page.jsx        # Homepage
│   │   └── Providers.jsx   # App providers wrapper
│   ├── components/         # Reusable UI components
│   │   └── HeroUiComponents/ # HeroUI specific components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Data and service functions
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions and helpers
├── public/                 # Static assets
│   └── icons/              # Icon assets
├── node_modules/           # Dependencies
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier configuration
├── jsconfig.json           # JavaScript configuration
├── middleware.js           # Next.js middleware
├── next.config.mjs         # Next.js configuration
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Dependency lock file
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
└── tailwind.config.js      # Tailwind CSS configuration
```

## Key Components

### UI Components

- `src/components/` - Contains all reusable UI components
  - `Button.jsx` - Custom button component
  - `Header.jsx` - Site header with navigation
  - `Footer.jsx` - Site footer
  - `ProductCard.jsx` - Product display card
  - `CartTable.jsx` - Shopping cart table
  - `Form.jsx` - Reusable form component
  - And many more specialized components

### Pages

- `src/app/page.jsx` - Homepage
- `src/app/(shop)/products/` - Product listing and details pages
- `src/app/(shop)/cart/` - Shopping cart page
- `src/app/(shop)/checkout/` - Checkout process pages
- `src/app/(main)/account/` - User account management
- `src/app/(shop)/wishlist/` - User wishlist
- `src/app/(auth)/login/` and `src/app/(auth)/signup/` - Authentication pages
- `src/app/(main)/about/` and `src/app/(main)/contact/` - Informational pages

### Data and Services

- `src/lib/actions.js` - Server actions
- `src/lib/data-service.js` - Data fetching and manipulation
- `src/lib/auth.js` - Authentication utilities
- `src/lib/tempData.js` - Temporary mock data
- `src/lib/productCategories.js` - Product category definitions

### Utilities

- `src/utils/utility.js` - Common utility functions
- `src/utils/errorValidations.js` - Form validation functions
- `src/utils/useOutsideClick.js` - Hook for detecting clicks outside elements
- `src/utils/useError.js` - Error handling hook

## Routing Structure

The application follows Next.js App Router convention where:

- Each folder represents a route segment
- Folders wrapped in parentheses (e.g., `(auth)`, `(shop)`) create route groups with shared layouts
- `page.jsx` files define the UI for a route
- `layout.jsx` files define shared layouts
- `loading.jsx` files provide loading UI during transitions
- `error.jsx` files define error boundaries

## State Management

State management is handled through React context, hooks, and local component state. The application uses React's built-in state management capabilities without additional global state libraries.

## Styling

The project uses Tailwind CSS for styling, with HeroUI components providing an additional layer of UI components. Custom styling is applied through Tailwind classes and occasionally through CSS modules.
