import {
  NoFilterResultsEmptyState,
  NoSearchResultsEmptyState,
} from "@/components/ui/empty-state";
import { getProducts } from "@/lib/api";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const { products, totalProducts } = await getProducts(searchParams);

  // Handle Empty States
  if (products.length === 0) {
    if (searchParams.search) {
      return (
        <NoSearchResultsEmptyState query={searchParams.search as string} />
      );
    }
    // The clear filters action will be handled by the sidebar, so we just show the static message here
    return <NoFilterResultsEmptyState />;
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {products.length} of {totalProducts} products
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
