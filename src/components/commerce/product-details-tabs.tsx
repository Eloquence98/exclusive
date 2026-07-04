import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/src/utils/utility";
import { Calendar, Star, User } from "lucide-react";
import { ProductCard, type Product } from "./product-card";

// Mock Reviews Data
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

// Mock Related Products Data
const mockRelatedProducts: Product[] = [
  {
    id: "101",
    slug: "merino-turtleneck",
    name: "Merino Wool Turtleneck",
    brand: "Atelier Knitwear",
    price: 195,
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
  },
  {
    id: "102",
    slug: "ribbed-polo",
    name: "Ribbed Knit Polo Shirt",
    brand: "Atelier Essentials",
    price: 145,
    imageUrl:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.4,
    reviewCount: 51,
  },
  {
    id: "103",
    slug: "linen-blazer",
    name: "Relaxed Linen Blazer",
    brand: "Atelier Tailoring",
    price: 320,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.6,
    reviewCount: 33,
  },
  {
    id: "104",
    slug: "wool-trousers",
    name: "Tailored Wool Trousers",
    brand: "Atelier Studio",
    price: 185,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
  },
];

export function ProductDetailsTabs() {
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
          {mockRelatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
