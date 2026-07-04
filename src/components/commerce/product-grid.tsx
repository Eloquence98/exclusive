import { ProductCard } from "./product-card";
import { getProducts } from "@/lib/api";
import {
  NoFilterResultsEmptyState,
  NoSearchResultsEmptyState,
} from "@/components/ui/empty-state";
import { PaginationControls } from "./pagination-controls";

interface ProductGridProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export async function ProductGrid({ searchParams }: ProductGridProps) {
  // Fetch data from our API layer (which handles filtering, sorting, and pagination)
  const { products, totalProducts, totalPages, currentPage } =
    await getProducts(searchParams);

  // Handle Empty States
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
        Showing {products.length} of {totalProducts} products
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </>
  );
}
