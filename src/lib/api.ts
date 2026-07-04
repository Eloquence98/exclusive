// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// class APIError extends Error {
//   constructor(message, status, details) {
//     super(message);
//     this.status = status;
//     this.details = details;
//   }
// }

// export async function fetchAPI(endpoint, options = {}) {
//   const url = `${API_URL}${endpoint}`;

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   };

//   try {
//     const res = await fetch(url, config);
//     const data = await res.json();

//     if (!res.ok) {
//       throw new APIError(
//         data.message || "API request failed",
//         res.status,
//         data,
//       );
//     }

//     return data;
//   } catch (error) {
//     if (error instanceof APIError) {
//       throw error;
//     }
//     throw new APIError("Network error", 500, { originalError: error.message });
//   }
// }

// // Authenticated API call
// export async function fetchAuthAPI(endpoint, token, options = {}) {
//   return fetchAPI(endpoint, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

import { type Product } from "@/components/commerce/product-card";
import { type ProductInfoData } from "@/components/commerce/product-info";
import { type CartItem } from "./store";

// Extensive mock database to simulate backend responses
const MOCK_DATABASE: Product[] = [
  {
    id: "1",
    slug: "cashmere-crewneck",
    name: "Cashmere Crewneck Sweater",
    brand: "Atelier Essentials",
    price: 245,
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "tailored-wool-trousers",
    name: "Tailored Wool Trousers",
    brand: "Atelier Studio",
    price: 185,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "3",
    slug: "silk-blend-shirt",
    name: "Silk Blend Relaxed Shirt",
    brand: "Atelier Essentials",
    price: 160,
    salePrice: 120,
    discountPercentage: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.2,
    reviewCount: 45,
  },
  {
    id: "4",
    slug: "leather-weekend-bag",
    name: "Full Grain Leather Weekend Bag",
    brand: "Atelier Accessories",
    price: 450,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    inStock: false,
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: "5",
    slug: "merino-wool-turtleneck",
    name: "Merino Wool Turtleneck",
    brand: "Atelier Knitwear",
    price: 195,
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "6",
    slug: "relaxed-linen-blazer",
    name: "Relaxed Linen Blazer",
    brand: "Atelier Tailoring",
    price: 320,
    imageUrl:
      "https://images.unsplash.com/photo-1637110276019-df15ad496674?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inStock: true,
    rating: 4.6,
    reviewCount: 33,
  },
  {
    id: "7",
    slug: "minimalist-leather-watch",
    name: "Minimalist Leather Watch",
    brand: "Atelier Accessories",
    price: 275,
    imageUrl:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 5.0,
    reviewCount: 156,
  },
  {
    id: "8",
    slug: "cotton-canvas-tote",
    name: "Heavyweight Cotton Canvas Tote",
    brand: "Atelier Essentials",
    price: 85,
    salePrice: 65,
    discountPercentage: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.1,
    reviewCount: 12,
  },
  {
    id: "9",
    slug: "structured-wool-coat",
    name: "Structured Wool Overcoat",
    brand: "Atelier Outerwear",
    price: 595,
    imageUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: "10",
    slug: "suede-chelsea-boots",
    name: "Italian Suede Chelsea Boots",
    brand: "Atelier Footwear",
    price: 340,
    imageUrl:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.8,
    reviewCount: 74,
  },
  {
    id: "11",
    slug: "ribbed-knit-polo",
    name: "Ribbed Knit Polo Shirt",
    brand: "Atelier Essentials",
    price: 145,
    imageUrl:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.4,
    reviewCount: 51,
  },
  {
    id: "12",
    slug: "titanium-aviators",
    name: "Titanium Aviator Sunglasses",
    brand: "Atelier Eyewear",
    price: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.7,
    reviewCount: 88,
  },
  {
    id: "13",
    slug: "cashmere-crewneck",
    name: "Cashmere Crewneck Sweater",
    brand: "Atelier Essentials",
    price: 245,
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
  },
  {
    id: "14",
    slug: "tailored-wool-trousers",
    name: "Tailored Wool Trousers",
    brand: "Atelier Studio",
    price: 185,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "15",
    slug: "silk-blend-shirt",
    name: "Silk Blend Relaxed Shirt",
    brand: "Atelier Essentials",
    price: 160,
    salePrice: 120,
    discountPercentage: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.2,
    reviewCount: 45,
  },
  {
    id: "16",
    slug: "leather-weekend-bag",
    name: "Full Grain Leather Weekend Bag",
    brand: "Atelier Accessories",
    price: 450,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    inStock: false,
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: "17",
    slug: "merino-wool-turtleneck",
    name: "Merino Wool Turtleneck",
    brand: "Atelier Knitwear",
    price: 195,
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "18",
    slug: "relaxed-linen-blazer",
    name: "Relaxed Linen Blazer",
    brand: "Atelier Tailoring",
    price: 320,
    imageUrl:
      "https://images.unsplash.com/photo-1637110276019-df15ad496674?q=80&w=717&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inStock: true,
    rating: 4.6,
    reviewCount: 33,
  },
  {
    id: "19",
    slug: "minimalist-leather-watch",
    name: "Minimalist Leather Watch",
    brand: "Atelier Accessories",
    price: 275,
    imageUrl:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 5.0,
    reviewCount: 156,
  },
  {
    id: "20",
    slug: "cotton-canvas-tote",
    name: "Heavyweight Cotton Canvas Tote",
    brand: "Atelier Essentials",
    price: 85,
    salePrice: 65,
    discountPercentage: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.1,
    reviewCount: 12,
  },
  {
    id: "21",
    slug: "structured-wool-coat",
    name: "Structured Wool Overcoat",
    brand: "Atelier Outerwear",
    price: 595,
    imageUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.9,
    reviewCount: 98,
  },
  {
    id: "22",
    slug: "suede-chelsea-boots",
    name: "Italian Suede Chelsea Boots",
    brand: "Atelier Footwear",
    price: 340,
    imageUrl:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.8,
    reviewCount: 74,
  },
  {
    id: "23",
    slug: "ribbed-knit-polo",
    name: "Ribbed Knit Polo Shirt",
    brand: "Atelier Essentials",
    price: 145,
    imageUrl:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.4,
    reviewCount: 51,
  },
  {
    id: "24",
    slug: "titanium-aviators",
    name: "Titanium Aviator Sunglasses",
    brand: "Atelier Eyewear",
    price: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.7,
    reviewCount: 88,
  },
];

export interface ProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Fetches products from the backend.
 * Currently uses a mock database to simulate filtering, sorting, and pagination.
 * Replace the internal logic with a real fetch() call to your Express backend when ready.
 */
export async function getProducts(
  searchParams: Record<string, string | string[] | undefined>,
): Promise<ProductsResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const queryString = new URLSearchParams(searchParams as Record<string, string>).toString()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?${queryString}`)
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  */

  let filteredProducts = [...MOCK_DATABASE];

  // 1. Search
  const search = searchParams.search as string;
  if (search) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query),
    );
  }

  // 2. Category Filter
  const category = searchParams.category as string;
  if (category) {
    // Mocking category logic based on brand for demonstration
    filteredProducts = filteredProducts.filter((p) =>
      p.brand?.toLowerCase().includes(category.toLowerCase()),
    );
  }

  // 3. Price Filter
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : 0;
  const maxPrice = searchParams.maxPrice
    ? Number(searchParams.maxPrice)
    : Infinity;
  filteredProducts = filteredProducts.filter((p) => {
    const price = p.salePrice || p.price;
    return price >= minPrice && price <= maxPrice;
  });

  // 4. Rating Filter
  const minRating = searchParams.rating ? Number(searchParams.rating) : 0;
  if (minRating > 0) {
    filteredProducts = filteredProducts.filter(
      (p) => (p.rating || 0) >= minRating,
    );
  }

  // 5. Sorting
  const sort = (searchParams.sort as string) || "featured";
  switch (sort) {
    case "price-asc":
      filteredProducts.sort(
        (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price),
      );
      break;
    case "price-desc":
      filteredProducts.sort(
        (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price),
      );
      break;
    case "newest":
      filteredProducts.sort((a, b) => Number(b.id) - Number(a.id)); // Mocking newest by ID
      break;
    case "top-rated":
      filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default: // featured
      filteredProducts.sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
      );
  }

  // 6. Pagination
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = 9; // Products per page
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + limit,
  );

  return {
    products: paginatedProducts,
    totalProducts,
    totalPages,
    currentPage: page,
  };
}

export interface FullProduct extends ProductInfoData {
  slug: string;
  description: string;
  images: string[];
}

// Extended mock database for PDP
const MOCK_PDP_DATABASE: Record<string, FullProduct> = {
  "cashmere-crewneck-sweater": {
    id: "1",
    slug: "cashmere-crewneck-sweater",
    brand: "Atelier Essentials",
    name: "Cashmere Crewneck Sweater",
    category: "Knitwear",
    description:
      "Crafted from the finest Grade-A Mongolian cashmere, this crewneck sweater offers unparalleled softness and warmth. The relaxed yet tailored silhouette ensures a perfect drape, making it an essential layering piece for transitional weather.",
    price: 245.0,
    salePrice: 196.0,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    sizes: [
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: false },
      { name: "XL", inStock: true },
    ],
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  // Add more products here as needed for testing
};

/**
 * Fetches a single product by its SEO slug.
 * Replace internal logic with real fetch() call to your Express backend.
 */
export async function getProductBySlug(
  slug: string,
): Promise<FullProduct | null> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Failed to fetch product')
    return res.json()
  */

  return MOCK_PDP_DATABASE[slug] || null;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderPayload {
  email: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  createAccount?: boolean;
  password?: string;
}

/**
 * Sends the order payload to the backend.
 * Handles both Guest checkout and Guest -> Registered User flows.
 */
export async function createOrder(
  payload: OrderPayload,
): Promise<{ orderId: string }> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to create order')
    }
    return res.json()
  */

  // Mock successful response
  return {
    orderId: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Authenticates a user and returns a JWT.
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Invalid credentials')
    }
    return res.json()
  */

  // Mock successful response
  if (payload.password.length < 6) {
    throw new Error("Invalid email or password");
  }

  return {
    token: "mock-jwt-token-12345",
    user: {
      id: "user-1",
      name: "Elena V.",
      email: payload.email,
    },
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  orderId?: string; // Used for Guest -> Registered flow
}

/**
 * Registers a new user.
 * If orderId is provided, links the guest order to the new account.
 */
export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Registration failed')
    }
    return res.json()
  */

  // Mock validation
  if (payload.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Mock successful response
  return {
    token: "mock-jwt-token-67890",
    user: {
      id: "user-2",
      name: payload.name,
      email: payload.email,
    },
  };
}

/**
 * Requests a password reset email.
 */
export async function requestPasswordReset(
  email: string,
): Promise<{ message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    if (!res.ok) throw new Error('Failed to send reset email')
    return res.json()
  */

  return { message: "Password reset email sent successfully." };
}

/**
 * Resets the password using a secure token.
 */
export async function resetPassword(
  token: string,
  password: string,
): Promise<{ message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })
    if (!res.ok) throw new Error('Invalid or expired token')
    return res.json()
  */

  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");

  return { message: "Password reset successfully." };
}

/**
 * Logs out the user and invalidates the token.
 */
export async function logoutUser(): Promise<{ message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    if (!res.ok) throw new Error('Failed to logout')
    return res.json()
  */

  return { message: "Logged out successfully." };
}

export interface UpdateProfilePayload {
  name: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

/**
 * Updates the user's profile information.
 */
export async function updateUserProfile(
  payload: UpdateProfilePayload,
): Promise<{ message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { message: "Profile updated successfully." };
}

/**
 * Updates the user's password.
 */
export async function updateUserPassword(
  payload: UpdatePasswordPayload,
): Promise<{ message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (payload.newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters");
  }
  if (payload.currentPassword === payload.newPassword) {
    throw new Error("New password must be different from the current password");
  }

  return { message: "Password updated successfully." };
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemsCount: number;
}

/**
 * Fetches all orders for the authenticated user.
 */
export async function getUserOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  /* 
    REAL BACKEND INTEGRATION EXAMPLE:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Failed to fetch orders')
    return res.json()
  */

  // Mock data
  return [
    {
      id: "ORD-7A9B2C",
      date: "2023-10-24T14:30:00Z",
      status: "Delivered",
      total: 430.0,
      itemsCount: 2,
    },
    {
      id: "ORD-8X3Y4Z",
      date: "2023-11-02T09:15:00Z",
      status: "Shipped",
      total: 195.0,
      itemsCount: 1,
    },
    {
      id: "ORD-1M2N3P",
      date: "2023-11-10T16:45:00Z",
      status: "Processing",
      total: 850.0,
      itemsCount: 4,
    },
    {
      id: "ORD-9Q8W7E",
      date: "2023-09-15T11:20:00Z",
      status: "Cancelled",
      total: 120.0,
      itemsCount: 1,
    },
  ];
}
