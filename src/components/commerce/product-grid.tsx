"use client";

import {
  NoFilterResultsEmptyState,
  NoSearchResultsEmptyState,
} from "@/components/ui/empty-state";
import { productListOptions } from "@/domains/catalog/queries/products.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PaginationControls } from "./pagination-controls";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export function ProductGrid({ searchParams }: ProductGridProps) {
  const { data } = useSuspenseQuery(productListOptions(searchParams));

  const { products, pagination } = data;

  // Empty States
  if (products.length === 0) {
    if (searchParams.search) {
      return (
        <NoSearchResultsEmptyState query={searchParams.search as string} />
      );
    }
    return <NoFilterResultsEmptyState />;
  }

  return (
    <>
      {/* Results Count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {products.length} of {pagination.totalDocuments} products
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <PaginationControls
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        searchParams={searchParams}
      />
    </>
  );
}
