import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* 2-Column Grid Skeleton */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
            <div className="flex gap-3">
              <Skeleton className="h-20 w-20 rounded-lg" />
              <Skeleton className="h-20 w-20 rounded-lg" />
              <Skeleton className="h-20 w-20 rounded-lg" />
            </div>
          </div>

          {/* Right Column: Info Skeleton */}
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-4 w-32" /> {/* Breadcrumb */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" /> {/* Brand */}
              <Skeleton className="h-10 w-3/4" /> {/* Title */}
              <Skeleton className="h-8 w-32" /> {/* Price */}
              <Skeleton className="h-5 w-40" /> {/* Rating */}
            </div>
            <Skeleton className="h-6 w-24" /> {/* Stock */}
            {/* Sizes */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-3">
                <Skeleton className="h-11 w-14 rounded-full" />
                <Skeleton className="h-11 w-14 rounded-full" />
                <Skeleton className="h-11 w-14 rounded-full" />
                <Skeleton className="h-11 w-14 rounded-full" />
              </div>
            </div>
            {/* Add to Cart */}
            <Skeleton className="mt-4 h-12 w-full rounded-lg" />
            {/* Accordions */}
            <div className="mt-8 space-y-4 border-t border-border pt-8">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
