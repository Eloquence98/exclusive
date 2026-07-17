"use client";

import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productListOptions } from "@/domains/catalog/products.query";
import type { ShopParams } from "@/hooks/useShopParams";
import { cn } from "@/utils/utility";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Star, User } from "lucide-react";
import { ProductCard } from "./product-card";

interface ProductDetailsTabsProps {
  productId: string;
  category: string;
}

// Mock Reviews Data — TODO: Replace with reviews domain
const mockReviews = [
  {
    id: "1",
    user: "Elena V.",
    date: "October 12, 2023",
    rating: 5,
    text: "The quality of the cashmere is unparalleled. It's rare to find pieces that feel this luxurious yet remain so effortlessly wearable for everyday life. The fit is exactly as described.",
  },
  {
    id: "2",
    user: "Marcus T.",
    date: "September 28, 2023",
    rating: 4,
    text: "Beautiful sweater and incredibly soft. I took off one star only because the shipping took a day longer than expected, but the product itself is flawless. Will definitely buy another color.",
  },
  {
    id: "3",
    user: "Sarah J.",
    date: "August 15, 2023",
    rating: 5,
    text: "Finally, a brand that understands quiet luxury. No loud logos, just exceptional materials. This crewneck has become my go-to for both office and weekend wear.",
  },
];

export function ProductDetailsTabs({
  productId,
  category,
}: ProductDetailsTabsProps) {
  // Fetch related products from same category
  // Exclude current product from results
  const relatedParams: ShopParams = {
    page: 1,
    limit: 4,
    category,
  };

  const { data, isLoading } = useQuery(productListOptions(relatedParams));

  // Filter out current product from related products
  const relatedProducts =
    data?.products.filter((p) => p.id !== productId) ?? [];

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="mb-8 h-auto w-full justify-start rounded-none border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="reviews"
          className="mr-8 rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Reviews ({mockReviews.length})
        </TabsTrigger>
        <TabsTrigger
          value="related"
          className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium data-[state=active]:border-primary data-[state=active]:shadow-none"
        >
          Related Products
        </TabsTrigger>
      </TabsList>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-0">
        <div className="max-w-3xl space-y-8">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col space-y-3 border-b border-border pb-8 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.user}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating
                          ? "fill-amber-500 text-amber-500"
                          : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Related Products Tab */}
      <TabsContent value="related" className="mt-0">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
            <ProductGridSkeleton count={4} />
          </div>
        ) : relatedProducts.length === 0 ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No related products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
            {relatedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
