// app/shop/page.tsx
"use client";

import { FilterSidebar } from "@/src/components/commerce/filter-sidebar";
import { ProductGrid } from "@/src/components/commerce/product-grid";
import PaginationControls from "@/src/components/commerce/product-pagination";
import { SortDropdown } from "@/src/components/commerce/sort-dropdown";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const queryParams = {
  page: Number,
  category: String,
  brand: String,
  sort: String,
  limit: Number,
};

export default function ShopClient({ initialParams: queryParams }) {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Shop All
              </h1>
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
                    <SortDropdown />
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                    <FilterSidebar />
                  </div>

                  <div className="mt-6 border-t border-border pt-6">
                    <SheetTrigger asChild>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Apply Filters
                      </Button>
                    </SheetTrigger>
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
                  <span className="text-sm text-muted-foreground">
                    Sort by:
                  </span>
                  <SortDropdown />
                </div>
              </div>

              <ProductGrid />
            </div>
          </div>
        </div>

        {/* Pagination */}
        {/* <PaginationControls
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        searchParams={searchParams}
        /> */}
      </div>
    </>
  );
}
