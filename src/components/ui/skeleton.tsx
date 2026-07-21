import { cn } from "@/utils/utility";

/**
 * Base Skeleton Primitive
 * Blueprint: "subtle shimmer animation (animate-pulse bg-muted rounded-lg)"
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
}

/**
 * Text Line Skeleton
 * Used for generic paragraph or heading placeholders.
 */
function TextSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("h-4 w-full", className)} {...props} />;
}

/**
 * Product Card Skeleton
 * Blueprint: "Exact structural matches of the UI... Image placeholders (3/4 aspect ratio)"
 * This prevents Cumulative Layout Shift (CLS) when the actual product grid loads.
 */
function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Image Placeholder: 3/4 aspect ratio, rounded-2xl (16px) to match Card System */}
      <Skeleton className="aspect-[3/4] w-full rounded-2xl" />

      {/* Content Placeholders */}
      <div className="space-y-2 px-1">
        {/* Brand / Overline */}
        <Skeleton className="h-3 w-1/3" />
        {/* Product Title */}
        <Skeleton className="h-4 w-3/4" />
        {/* Price */}
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

/**
 * Product Grid Skeleton
 * Renders a grid of ProductCardSkeletons matching the responsive layout.
 * Blueprint: "Responsive product grid"
 */
function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export { Skeleton, TextSkeleton, ProductCardSkeleton, ProductGridSkeleton };
