"use client";

import {
  NoFilterResultsEmptyState,
  NoSearchResultsEmptyState,
} from "@/components/ui/empty-state";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { productListOptions } from "@/domains/catalog/products.query";
import { useShopParams } from "@/hooks/useShopParams";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import PaginationControls from "./product-pagination";

export function ProductGrid() {
  const searchParams = useSearchParams();
  const { params } = useShopParams();

  const { data, isLoading, isError, isFetching } = useQuery(
    productListOptions(params),
  );

  if (isLoading) {
    return <ProductGridSkeleton count={9} />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-border bg-muted/30 p-8">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Failed to load products
          </h3>
          <p className="text-sm text-muted-foreground">
            Something went wrong while fetching products. Please try again.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Empty state — no products match filters
  if (data?.products.length === 0) {
    const search = searchParams.get("search");
    if (search) {
      return <NoSearchResultsEmptyState query={search} />;
    }
    return <NoFilterResultsEmptyState />;
  }

  return (
    <div
      className={
        isFetching && !isLoading
          ? "pointer-events-none opacity-60 transition-opacity duration-200"
          : "transition-opacity duration-200"
      }
    >
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination && <PaginationControls pagination={data.pagination} />}
    </div>
  );
}
