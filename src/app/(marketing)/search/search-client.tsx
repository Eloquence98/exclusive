"use client";

import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { NoSearchResultsEmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductCategory } from "@/domains/catalog/product.types";
import { trendingProductsOptions } from "@/domains/catalog/products.query";
import { searchResultsOptions } from "@/domains/search/search.query";
import type { SearchParams } from "@/domains/search/search.types";
import { useQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface SearchClientProps {
  initialQuery: string;
}

// ---
// Search results skeleton
// ---
function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
          <div className="space-y-2 px-1">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---
// Trending products fallback for no results
// ---
function TrendingFallback() {
  const { data, isLoading } = useQuery(trendingProductsOptions);

  if (isLoading) return <SearchResultsSkeleton />;
  if (!data?.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-foreground">
        Trending Right Now
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// ---
// Filters panel
// ---
interface FiltersPanelProps {
  params: SearchParams;
  onChange: (updates: Partial<SearchParams>) => void;
}

const CATEGORIES: ProductCategory[] = [
  "t-shirts",
  "shirts",
  "polos",
  "jeans",
  "shorts",
  "trousers",
  "activewear",
  "fragrances",
  "shoes",
  "underwear",
];

function FiltersPanel({ params, onChange }: FiltersPanelProps) {
  const hasActiveFilters =
    params.category ||
    params.brand ||
    params.minPrice !== undefined ||
    params.maxPrice !== undefined ||
    params.onSale;

  return (
    <Card className="border-border">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onChange({
                  category: undefined,
                  brand: undefined,
                  minPrice: undefined,
                  maxPrice: undefined,
                  onSale: undefined,
                })
              }
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3 w-3" />
              Clear all
            </Button>
          )}
        </div>

        {/* Category */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Category
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${cat}`}
                  checked={params.category === cat}
                  onCheckedChange={(checked) =>
                    onChange({ category: checked ? cat : undefined })
                  }
                />
                <Label
                  htmlFor={`cat-${cat}`}
                  className="cursor-pointer text-sm font-normal capitalize text-foreground"
                >
                  {cat.replace("-", " ")}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Price Range
          </h3>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={params.minPrice ?? ""}
              onChange={(e) =>
                onChange({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="h-9 text-sm"
            />
            <span className="text-muted-foreground">—</span>
            <Input
              type="number"
              placeholder="Max"
              value={params.maxPrice ?? ""}
              onChange={(e) =>
                onChange({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="h-9 text-sm"
            />
          </div>
        </div>

        {/* On Sale */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="onSale"
            checked={params.onSale ?? false}
            onCheckedChange={(checked) =>
              onChange({ onSale: checked ? true : undefined })
            }
          />
          <Label
            htmlFor="onSale"
            className="cursor-pointer text-sm font-normal text-foreground"
          >
            On Sale Only
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}

// ---
// Main client component
// ---
export function SearchClient({ initialQuery }: SearchClientProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: initialQuery,
    page: 1,
    limit: 20,
  });

  // ---
  // Search results query
  // signal from queryFn context cancels stale requests
  // ---
  const { data, isLoading, isFetching, isPlaceholderData } = useQuery(
    searchResultsOptions(searchParams),
  );

  const results = data?.results ?? [];
  const hasQuery = searchParams.q.trim().length >= 2;
  const hasResults = results.length > 0;

  // ---
  // Handle new search from input
  // Updates URL for shareability
  // ---
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue.trim().length < 2) return;

    const newParams = {
      ...searchParams,
      q: inputValue.trim(),
      page: 1,
    };

    setSearchParams(newParams);
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`, {
      scroll: false,
    });
  }

  // ---
  // Handle filter changes — reset page
  // ---
  function handleFilterChange(updates: Partial<SearchParams>) {
    setSearchParams((prev) => ({ ...prev, ...updates, page: 1 }));
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* ── Search Bar ── */}
          <div className="space-y-2">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search products..."
                  className="h-12 w-full pl-11 pr-4 text-sm"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 shrink-0 bg-primary px-6 text-primary-foreground"
              >
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 shrink-0"
                onClick={() => setShowFilters((prev) => !prev)}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </form>

            {/* Results count */}
            {hasQuery && !isLoading && (
              <p className="text-sm text-muted-foreground">
                {isFetching && isPlaceholderData ? (
                  "Searching..."
                ) : hasResults ? (
                  <>
                    {results.length} result
                    {results.length !== 1 ? "s" : ""} for{" "}
                    <span className="font-medium text-foreground">
                      &ldquo;{searchParams.q}&rdquo;
                    </span>
                  </>
                ) : (
                  <>
                    No results for{" "}
                    <span className="font-medium text-foreground">
                      &ldquo;{searchParams.q}&rdquo;
                    </span>
                  </>
                )}
              </p>
            )}
          </div>

          {/* ── Main Content ── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Filters — sidebar on desktop, collapsible on mobile */}
            {showFilters && (
              <aside className="w-full shrink-0 lg:w-64">
                <FiltersPanel
                  params={searchParams}
                  onChange={handleFilterChange}
                />
              </aside>
            )}

            {/* Results */}
            <div className="flex-1">
              {!hasQuery ? (
                // No query yet
                <div className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Start typing to search our collection.
                  </p>
                </div>
              ) : isLoading ? (
                <SearchResultsSkeleton />
              ) : !hasResults ? (
                // No results — show empty state + trending
                <div className="space-y-12">
                  <NoSearchResultsEmptyState query={searchParams.q} />
                  <TrendingFallback />
                </div>
              ) : (
                // Results grid
                <div
                  className={cn(
                    "grid grid-cols-2 gap-4 transition-opacity duration-200 md:grid-cols-3 lg:grid-cols-4",
                    isFetching && isPlaceholderData && "opacity-60",
                  )}
                >
                  {results.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        title: product.title,
                        slug: product.slug,
                        price: product.price,
                        salePrice: product.salePrice,
                        onSale: product.onSale,
                        discount: product.discount,
                        stock: product.stock,
                        imageCover: product.imageCover,
                        category: product.category,
                        isFeatured: product.isFeatured,
                        ratingsAverage: product.ratingsAverage,
                        ratingsQuantity: product.ratingsQuantity,
                        brand: product.brand,
                        currentPrice: product.salePrice ?? product.price,
                        discountPercentage: product.discount,
                        saleStatus: product.onSale ? "ACTIVE" : "NOT_ON_SALE",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Utility used inside this file only
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
