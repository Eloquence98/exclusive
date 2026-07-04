"use client";

import { FilterSidebar } from "@/components/commerce/filter-sidebar";
import { ProductCard, type Product } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

// Mock data
const mockProducts: Product[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `mock-${i}`,
  slug: `product-${i}`,
  name: `Premium Essential ${i + 1}`,
  brand: "Atelier Essentials",
  price: 120 + i * 10,
  imageUrl: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop`,
  inStock: true,
  rating: 4.5,
  reviewCount: 24 + i,
}));

export default function ShopPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Shop All
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing {mockProducts.length} products
            </p>
          </div>

          {/* Mobile Filter & Sort Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border text-foreground"
                >
                  <span>Filter & Sort</span>
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="flex h-[85vh] flex-col rounded-t-2xl bg-background p-6"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-foreground">
                    Refine Selection
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Sort */}
                <div className="mb-6 border-b border-border pb-6">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Sort By
                  </p>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full border-transparent bg-muted">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="top-rated">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                  <FilterSidebar />
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Show {mockProducts.length} Products
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Desktop Sidebar (Sticky) */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Desktop Controls Bar */}
            <div className="mb-8 hidden justify-end md:flex">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="top-rated">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <ProductGridSkeleton count={12} />
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Responsive Pagination */}
            <div className="mt-16">
              {/* Desktop: Numbered Pagination */}
              <Pagination className="hidden md:flex">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">12</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {/* Mobile: Load More Button */}
              <div className="flex justify-center md:hidden">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full max-w-xs border-border text-foreground"
                >
                  Load More Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
