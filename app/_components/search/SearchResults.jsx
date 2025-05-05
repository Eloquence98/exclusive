"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchHeader from "./SearchHeader";
import SearchFilters from "./SearchFilters";
import ProductGrid from "./ProductGrid";

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Summer Casual Dress",
    price: 49.99,
    discount: 20,
    image: "/placeholder.jpg",
    rating: 4.5,
    category: "Dresses",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    discount: 0,
    image: "/placeholder.jpg",
    rating: 4.2,
    category: "Jeans",
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    price: 29.99,
    discount: 10,
    image: "/placeholder.jpg",
    rating: 4.7,
    category: "Tops",
  },
  {
    id: 4,
    name: "Winter Jacket",
    price: 89.99,
    discount: 15,
    image: "/placeholder.jpg",
    rating: 4.3,
    category: "Outerwear",
  },
  {
    id: 5,
    name: "Floral Print Skirt",
    price: 39.99,
    discount: 0,
    image: "/placeholder.jpg",
    rating: 4.1,
    category: "Skirts",
  },
  {
    id: 6,
    name: "Leather Handbag",
    price: 79.99,
    discount: 5,
    image: "/placeholder.jpg",
    rating: 4.8,
    category: "Accessories",
  },
];

export default function SearchResults({ initialQuery }) {
  const router = useRouter();
  const [refinedQuery, setRefinedQuery] = useState(initialQuery);
  const results = MOCK_PRODUCTS;

  const handleRefinedSearch = (query) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8">
      <SearchHeader initialQuery={initialQuery} resultsCount={results.length} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <SearchFilters
          initialQuery={initialQuery}
          refinedQuery={refinedQuery}
          setRefinedQuery={setRefinedQuery}
          onSearch={handleRefinedSearch}
        />

        <ProductGrid products={results} />
      </div>
    </main>
  );
}
