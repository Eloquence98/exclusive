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
