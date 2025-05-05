# Luxe Clothing Store

> 🚧 **Project Status:** Under Development

A modern e-commerce platform built with the latest web technologies, offering a premium shopping experience for fashion enthusiasts. This project implements cutting-edge features of Next.js 15 and the latest industry standards.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + HeroUI
- **State Management:** Zustand
- **Database:** MongoDB with Mongoose
- **Authentication:** Clerk
- **Payments:** Cash on Delivery + Stripe
- **Deployment:** Netlify

## 📂 Project Structure

The project follows the Next.js 15 App Router structure, organizing code by route segments and route groups.

```
luxe-clothing-store/
├── src/                    # Source code directory
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Authentication route group
│   │   ├── (main)/         # Main content route group
│   │   ├── (shop)/         # Shopping-related route group
│   │   └── api/            # API route handlers
│   ├── components/         # Reusable UI components
│   ├── lib/                # Data and service functions
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions and helpers
├── public/                 # Static assets
└── ...configuration files
```

For a detailed breakdown of the project structure, see [Project Structure](project-structure.md).

## ✨ Key Features

### Performance & Data Handling

- **Server Components:** Optimized rendering strategy using React Server Components
- **Streaming:** Implements streaming server-rendering and streaming SSR for enhanced performance
- **Route Handlers:** Leverages Next.js 15 route handlers for API endpoints
- **Caching Strategies:**
  - Implements React Cache and fetch Request Deduplication
  - Utilizes Next.js 15 cache() and revalidate() mechanisms
  - Segment-level caching for optimal performance
  - Dynamic caching with on-demand revalidation

### Shopping Experience

- **Real-time Inventory:** Live stock updates and availability tracking
- **Dynamic Product Filtering:** Client-side filtering with server-side validation
- **Responsive Image Gallery:** Using Next.js Image optimization
- **Smart Search:** Full-text search with MongoDB Atlas
- **Shopping Cart:** Persistent cart with real-time sync
- **Wishlist Management:** Save items for later
- **Flexible Payment Options:** Choose between online payment or cash on delivery

### User Experience

- **Parallel Routes:** Enhanced navigation with parallel route layouts
- **Instant Loading States:** Optimistic updates for better UX
- **Error Handling:** Graceful error boundaries and recovery
- **Form Validation:** Using React Hook Form with Zod
- **Animations:** Framer Motion for smooth transitions
- **Dark Mode:** System-preferred and manual theme switching
- **Modern UI Components:** Utilizing HeroUI's extensive component library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Eloquence98/exclusive.git

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start the development server
pnpm dev
```

## 🔧 Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

MONGODB_URI=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NETLIFY_SITE_ID=
NETLIFY_AUTH_TOKEN=
```

## 📱 Screenshots

> Coming soon...

## 🎯 Upcoming Features

- [ ] AI-powered size recommendations
- [ ] Virtual try-on using AR
- [ ] Social sharing integration
- [ ] Review and rating system
- [ ] Loyalty program implementation
- [ ] Multiple delivery partner integration
- [ ] Real-time delivery tracking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Netlify](https://netlify.com/)
- [HeroUI](https://heroicons.com/)
- All our contributors and supporters

---

<p align="center">Made with ❤️ by [Your Name]</p>
