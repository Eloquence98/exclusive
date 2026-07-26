import { ProductSectionSkeleton } from "@/components/commerce/product-section-skeleton";
import { CategoryBentoGrid } from "@/components/marketing/category-bento-grid";
import { FeaturedProducts } from "@/components/marketing/featured-products";
import { HeroSection } from "@/components/marketing/hero-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";
import { Testimonials } from "@/components/marketing/testimonials";
import { TopRatedProducts } from "@/components/marketing/top-rated-products";
import { TrendingProducts } from "@/components/marketing/trending-products";
import { WhyChooseUs } from "@/components/marketing/why-choose-us";
import {
  featuredProductsOptions,
  topRatedProductsOptions,
  trendingProductsOptions,
} from "@/domains/catalog/products.query";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Home() {
  const queryClient = getQueryClient();

  // Non-blocking prefetch — optimization only
  void queryClient.prefetchQuery(featuredProductsOptions);
  void queryClient.prefetchQuery(trendingProductsOptions);
  void queryClient.prefetchQuery(topRatedProductsOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col">
        <HeroSection />

        {/* Each product section has independent loading state */}
        <Suspense fallback={<ProductSectionSkeletonWrapper />}>
          <FeaturedProducts />
        </Suspense>

        <Suspense fallback={<ProductSectionSkeletonWrapper bg="zinc" />}>
          <TrendingProducts />
        </Suspense>

        <Suspense fallback={<ProductSectionSkeletonWrapper />}>
          <TopRatedProducts />
        </Suspense>

        <CategoryBentoGrid />
        <WhyChooseUs />
        <Testimonials />
        <NewsletterSection />
      </div>
    </HydrationBoundary>
  );
}

/**
 * this is just silly
 * Wrapper to match section padding and background
 */
function ProductSectionSkeletonWrapper({
  bg = "white",
}: {
  bg?: "white" | "zinc";
}) {
  return (
    <section
      className={`py-16 md:py-24 lg:py-32 ${bg === "zinc" ? "bg-muted" : "bg-background"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductSectionSkeleton />
      </div>
    </section>
  );
}
