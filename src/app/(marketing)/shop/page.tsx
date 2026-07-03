"use client";

import { FilterSidebar } from "@/components/commerce/filter-sidebar";
import { ProductCard, type Product } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
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

// Mock data for the grid (Will be replaced by backend fetch in next task)
const mockProducts: Product[] = Array.from({ length: 8 }).map((_, i) => ({
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
  const [isLoading, setIsLoading] = useState(false); // Simulating initial load

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

          {/* Mobile Filter Trigger */}
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
            {/* Controls Bar (Placeholder for Sort Dropdown in next task) */}
            <div className="mb-6 flex justify-end">
              {/* Sort Dropdown will go here */}
            </div>

            {/* Grid */}
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              {/* Pagination component will go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
