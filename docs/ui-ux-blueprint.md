Here is the finalized, updated design specification. It strictly adheres to your "Quiet Luxury" aesthetic, perfectly aligns with your existing backend capabilities, and integrates your specific product features without overcomplicating the UI.

This is the definitive blueprint for implementation.

---

# 1. The Design System: "Quiet Luxury"

To achieve an Apple/Nike/Zara aesthetic, we rely on **restraint**. The design uses generous whitespace, strict typographic hierarchy, and monochromatic tones, allowing your high-quality product imagery to do the heavy lifting.

### Color Palette (Tailwind Config)

- **Backgrounds:** `bg-white` (Pure White), `bg-zinc-50` (Off-White for subtle section breaks).
- **Typography:** `text-zinc-950` (Primary headings), `text-zinc-600` (Body text), `text-zinc-400` (Muted/Meta text).
- **Borders:** `border-zinc-200` (Standard), `border-zinc-100` (Subtle).
- **Accents:** `bg-zinc-900` (Primary Buttons), `text-white` (Primary Button Text).
- **Semantic:** `emerald-500` (Success/In Stock), `rose-500` (Error/Out of Stock/Sale Price), `amber-500` (Warning/Low Stock).

### Typography Scale (Geist or Inter Font)

- **Display (Hero):** `text-5xl md:text-7xl font-medium tracking-tight`
- **H1 (Page Titles):** `text-3xl md:text-4xl font-semibold tracking-tight`
- **H2 (Section Headers):** `text-2xl md:text-3xl font-medium`
- **H3 (Card Titles):** `text-base font-medium`
- **Body:** `text-sm md:text-base text-zinc-600 leading-relaxed`
- **Overline (Eyebrow text):** `text-xs font-semibold uppercase tracking-widest text-zinc-400`

### Spacing & Layout

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Padding:** `py-16 md:py-24 lg:py-32` (Breathable vertical rhythm).
- **Grid Gaps:** `gap-4 md:gap-6 lg:gap-8`

### Shadows & Radii

- **Cards:** `rounded-2xl` (16px) for modern, soft edges.
- **Buttons/Inputs:** `rounded-lg` (8px) or `rounded-full` (Pill shape for tags/sizes).
- **Shadows:** Avoid harsh drop shadows. Use ambient occlusion: `shadow-[0_8px_30px_rgba(0,0,0,0.04)]` and `hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]`.

---

# 2. Information Architecture & Customer Journey

The UX is designed to reduce friction from discovery to post-purchase.

1.  **Discovery:** User lands on Home -> Sees Hero -> Browses Featured/Trending -> Clicks Category.
2.  **Evaluation:** Lands on Shop Page -> Uses Sidebar Filters (Category, Brand, Price) -> Sorts by Top Rated -> Clicks Product.
3.  **Conversion:** Views PDP -> Selects Size -> Reads Reviews -> Adds to Cart (Frontend Managed) -> Opens Cart Drawer -> Proceeds to Checkout -> Creates Order (Backend).
4.  **Post-Purchase:** Guest is prompted to "Create account to track order" (Guest → Registered flow) -> User logs in -> Views "My Account" -> Tracks Order Timeline.

---

# 3. Component Hierarchy & UI Specifications

Using **shadcn/ui** as a base, customized heavily with Tailwind.

### Layout Components

- **Navbar:** Sticky, glassmorphism effect (`backdrop-blur-md bg-white/80`) on scroll. Left: Logo. Center: Links (Shop, Categories). Right: Search Icon, Profile, Cart.
- **Mobile Menu:** A premium, full-height slide-out Drawer from the right side. Clean typography, large tap targets, and an accordion for categories. No bottom navigation bar.
- **Announcement Bar:** Top banner, `bg-zinc-900 text-white text-xs text-center py-2`. E.g., "Free shipping on orders over $100."
- **Footer:** 4-column grid. Brand story, Quick Links, Customer Service, Newsletter. Bottom: Copyright & Payment Icons.
- **Breadcrumbs:** `text-xs text-zinc-400`. E.g., `Home / Shop / Apparel / Silk Shirt`.

### Commerce Components

- **Product Card:**
  - _Image:_ Aspect ratio 3/4. Overflow hidden. Image scales to `105%` on hover (`transition-transform duration-700 ease-out`).
  - _Badges:_ Top-left corner. Minimalist pill badges for "Featured" (`bg-zinc-900 text-white`) or "Sale" (`bg-rose-500 text-white`).
  - _Details:_ Brand Name (Overline), Title (font-medium), Price. If on a scheduled sale, show the discount cleanly: `<span class="line-through text-zinc-400">$120</span> <span class="text-rose-500 font-medium">$96</span>`.
  - _Quick Add:_ "Add to Cart" button slides up from the bottom of the image on hover (desktop only).
- **Category Card (Bento Grid):** Large rounded rectangles with background images, dark gradient overlay at the bottom, and white typography.
- **Filter Sidebar:** Accordion style. Clean checkboxes for Categories and Brands. Dual-thumb slider for Price. Star selectors for Ratings.
- **Search Bar:** A clean, standard search input located in the navbar. Expands smoothly on click. Pressing 'Enter' submits the query and navigates to `/shop?search=query`. No live autocomplete or dropdown suggestions to ensure strict alignment with backend capabilities.
- **Cart Drawer:** A slide-out panel from the right side (`bg-white`). Displays cart items, quantities, subtotal, and a primary "Checkout" button. Entirely managed on the frontend (e.g., via Zustand or React Context) until the user clicks "Checkout", which triggers your backend order creation.

### Feedback & States

- **Loading Skeletons:** Exact structural matches of the UI with a subtle shimmer animation (`animate-pulse bg-zinc-100`).
- **Empty States:** Minimalist Lucide icon (`SearchX` or `PackageX`), clear heading, and a primary CTA button to reset filters or go home.
- **Toasts:** Top-right corner, sleek, minimal borders. Success (emerald icon), Error (rose icon).

---

# 4. Page Layouts & UX Blueprints

## A. Landing Page

- **Hero Section:** Full viewport height (`h-screen`). High-end lifestyle image. Centered typography: Overline, H1 Display, Subtitle, Two buttons (Primary: "Shop Collection", Secondary: "Lookbook").
- **Marquee:** Infinite horizontal scroll of brand logos or trust badges (Free Shipping, Secure Checkout).
- **Featured Products:** Highlighting products marked as "Featured" in your backend. Horizontal scroll on mobile, 4-column grid on desktop.
- **Shop by Category:** Asymmetrical Bento Grid. E.g., One large square (Men), two stacked rectangles (Women, Accessories).
- **Why Choose Us:** 3-column grid. Minimalist Lucide icons (`Truck`, `ShieldCheck`, `RefreshCw`). Short, punchy text.
- **Testimonials:** Horizontal slider. Large quotation mark icon, italicized review text, user avatar, and star rating.
- **Newsletter:** Dark section (`bg-zinc-900`). "Join the club." Single email input with an arrow button.

## B. Shop Page (Product Listing)

- **Header:** H1 Title, Product Count ("Showing 1-12 of 48 products").
- **Controls:** Right-aligned Sort Dropdown (Price Low-High, Top Rated, Newest). Mobile: "Filter & Sort" sticky bottom bar that opens a full-screen modal.
- **Layout:** `grid grid-cols-1 lg:grid-cols-4 gap-8`. Left column (hidden on mobile): Sticky Sidebar Filters (Categories, Brands, Price, Ratings). Right 3 columns: Product Grid.
- **Pagination:** Clean numbered pagination at the bottom. Active state is a solid black circle.

## C. Product Details Page (PDP)

- **Layout:** `grid grid-cols-1 lg:grid-cols-2 gap-12`.
- **Left Column (Gallery):** Main image (sticky on desktop). Below: Horizontal thumbnail strip for multiple product images. Active thumbnail has a 2px black border.
- **Right Column (Info):**
  - Breadcrumbs.
  - Brand Name (Overline, uppercase, zinc-400).
  - Title (H1).
  - **Pricing & Sales:** Clear display of scheduled sales. If active, show original price struck through, the new sale price, and a subtle badge indicating the discount percentage (e.g., "20% Off").
  - Rating summary (e.g., "4.8 (124 Reviews)").
  - _Stock Indicator:_ Small dot + text. `bg-emerald-500` "In Stock" or `bg-rose-500` "Out of Stock".
  - **Size Selection:** Pill-shaped buttons (`border border-zinc-200 rounded-full px-4 py-2`). Selected state: `bg-zinc-900 text-white border-zinc-900`. Disabled state for out-of-stock sizes: `line-through opacity-50 cursor-not-allowed`.
  - **Add to Cart Button:** Full width, `h-12`, `bg-zinc-900 text-white`. Micro-interaction: scales to `0.98` on click. Adds item to the frontend-managed cart state.
  - Accordion sections: Description, Shipping Info, Returns.
- **Bottom Section:** Tabs for "Reviews" and "Related Products". Review cards show user, date, stars, and text.

## D. Authentication Pages

- **Layout:** Split screen. Left side: High-quality brand imagery with a dark overlay and a quote. Right side: Centered, minimal form.
- **Forms:** Floating label inputs or clean standard inputs with `border-zinc-200` and `focus:ring-2 focus:ring-zinc-900`.
- **Guest to Registered Flow:** On the Signup page, add a subtle banner: _"Checking out as a guest? Link your email to track your order."_

## E. My Account (Customer Dashboard)

- **Layout:** Left sidebar navigation (Profile, My Orders, Settings, Logout). Main content area on the right.
- **My Orders:** Clean data table. Columns: Order ID, Date, Status (colored badges), Total, Action ("View Details").
- **Order Details & Tracking:**
  - Order summary card at the top.
  - **Modern Order Timeline:** A vertical line connecting steps.
    - _Completed:_ Solid black line, black filled circle, bold text.
    - _Current:_ Pulsing black circle, bold text.
    - _Pending:_ Dashed zinc-300 line, hollow zinc-300 circle, muted text.
    - _Statuses:_ Order Placed → Payment Confirmed → Packed → Shipped → Out for Delivery → Delivered.
- **Profile/Settings:** Card-based layout. Avatar upload area (dashed border, drag-and-drop feel). Clean form for updating password.

---

# 5. Animations & Micro-Interactions (Framer Motion)

Premium feels _alive_ but never distracting.

- **Page Transitions:** Wrap pages in a layout transition. `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}`.
- **Staggered Grids:** When products load, they shouldn't appear all at once. Use `staggerChildren: 0.05` so cards fade up sequentially.
- **Image Hover:** `whileHover={{ scale: 1.03 }}` on product images. Transition duration `0.5s` for a luxurious, heavy feel.
- **Modals/Drawers (Cart & Mobile Menu):** Backdrop fades in (`bg-black/40 backdrop-blur-sm`), content slides in from the right with a spring animation (`type: "spring", stiffness: 300, damping: 30`).
- **Add to Cart:** When clicked, the button text changes to a loading spinner, then a checkmark, before sliding a toast notification in from the top right.

---

# 6. UX Improvements & Visual Hierarchy Suggestions

1.  **Premium Mobile Drawer:** Since we are avoiding bottom navigation, ensure the mobile slide-out menu feels like a native app. Use large typography, generous padding, and smooth Framer Motion transitions. Include the Cart and Profile links prominently here.
2.  **Contextual Empty States:** If a user filters by a specific Brand or "5 Stars" and no products exist, don't just say "No products." Say: _"We couldn't find any products matching your filters. Try broadening your search."_ Provide a button to clear filters.
3.  **Visual Weight in Typography:** Use font weight and color to guide the eye. Brand (Gray, Small, Uppercase) -> Product Title (Black, Medium) -> Price (Black, Regular) -> Sale Price (Rose, Medium).
4.  **Accessible Forms:** Ensure all inputs have associated labels (even if visually hidden using `sr-only`). Use `aria-invalid` and red borders for validation errors from your Express backend.
5.  **Pagination UX:** On mobile, replace numbered pagination with a "Load More" button to prevent tiny tap targets. On desktop, keep the numbered pagination.
6.  **Image Optimization:** Use Next.js `<Image>` with `priority` on the Hero and LCP (Largest Contentful Paint) elements. Use `loading="lazy"` on product grids. Ensure aspect ratios are strictly maintained to prevent Cumulative Layout Shift (CLS).

---

# 7. Implementation Strategy (Next.js App Router)

Structure your frontend to maximize performance and maintainability:

```text
/app
  /(marketing)         # Route group for public pages
    /page.tsx          # Landing Page
    /shop
      /page.tsx        # Product Listing (Handles standard search via ?search=)
      /[category]
        /page.tsx      # Category Listing
    /product
      /[slug]
        /page.tsx      # Product Details (Handles sizes, multiple images, sales)
  /(auth)              # Route group for auth (no navbar/footer)
    /login/page.tsx
    /signup/page.tsx
    /forgot-password/page.tsx
    /reset-password/page.tsx
  /(account)           # Protected Route group for customers
    /account
      /page.tsx        # Profile
      /orders
        /page.tsx      # Order History
        /[id]/page.tsx # Order Details & Tracking
  /layout.tsx          # Root layout (Fonts, Analytics, Providers, Cart Context)
/components
  /ui                  # shadcn/ui base components
  /commerce            # ProductCard, CartDrawer, FilterSidebar, SizeSelector
  /layout              # Navbar, MobileDrawer, Footer, AnnouncementBar
  /account             # OrderTimeline, AccountSidebar
/lib
  /utils.ts            # Tailwind cn() utility
  /types.ts            # TypeScript interfaces matching your MongoDB schemas
  /store.ts            # Frontend cart state management (Zustand/Context)
```

### Connecting to Your Backend (Conceptual)

- **Standard Search:** The navbar search input acts as a standard form. Submitting it routes the user to `/shop?search=keyword`. The Shop page reads this URL parameter and passes it to your existing backend filtering/pagination API.
- **Scheduled Sales & Discounts:** Your backend handles the logic of whether a sale is active. The frontend simply receives the product data (e.g., `price`, `salePrice`, `discountPercentage`) and conditionally renders the UI (strikethrough price, rose text, sale badge) if `salePrice` exists.
- **Frontend Cart to Backend Order:** The `CartDrawer` uses a client-side store to manage items, quantities, and selected sizes. When the user clicks "Checkout" and completes the auth flow (if necessary), the frontend formats this cart state into a payload and sends a single `POST` request to your existing "Create Order" endpoint.
- **SEO Slugs:** Your PDP will use the SEO slug from the backend (`/product/premium-leather-jacket`). Next.js `generateMetadata` will pull the product's title, description, and primary image from your API to create perfect OpenGraph tags.
- **Guest to Registered:** When a guest creates an order, your backend links it to a session or email. On the frontend, after order creation, show a modal: _"Want to track this order? Set a password to create an account."_ This triggers your "Guest → Registered" API endpoint.
