"use client";

import {
  NoFilterResultsEmptyState,
  NoSearchResultsEmptyState,
} from "@/components/ui/empty-state";
import { productListOptions } from "@/domains/catalog/queries/products.query";
import { useShopParams } from "@/src/hooks/useShopParams";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ProductCardSkeleton } from "../ui/skeleton";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  // 1. Get state from URL
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { params, setParams } = useShopParams();
  console.log("HERE???");

  // 2. Configure Query
  // The queryKey CHANGES whenever params change, triggering a new fetch automatically.
  const { data, isLoading, isError } = useQuery(productListOptions(params));

  if (isLoading) return <ProductCardSkeleton />;
  if (isError) return <div>Failed to load products.</div>;

  // Empty States
  if (data?.products.length === 0) {
    return <NoFilterResultsEmptyState />;
  }

  // Empty States
  if (data?.products.length === 0) {
    if (search) {
      return <NoSearchResultsEmptyState query={search as string} />;
    }
    return <NoFilterResultsEmptyState />;
  }

  return (
    <>
      {/* Results Count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {data?.products.length} of {data?.pagination.totalDocuments}{" "}
        products
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {/* <PaginationControls
        currentPage={data?.pagination.page}
        totalPages={data?.pagination.totalPages}
        searchParams={searchParams}
      /> */}
    </>
  );
}
