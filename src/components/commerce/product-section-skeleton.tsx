import { ProductCardSkeleton } from "@/components/ui/skeleton";

export function ProductSectionSkeleton() {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:-mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="min-w-[80vw] snap-start md:min-w-0">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
