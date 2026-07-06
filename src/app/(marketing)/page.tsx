// import { CategoryBentoGrid } from "@/src/components/marketing/category-bento-grid";
// import { FeaturedProducts } from "@/src/components/marketing/featured-products";
// import { HeroSection } from "@/src/components/marketing/hero-section";
// import { NewsletterSection } from "@/src/components/marketing/newsletter-section";
// import { Testimonials } from "@/src/components/marketing/testimonials";
// import { TopRatedProducts } from "@/src/components/marketing/top-rated-products";
// import { TrendingProducts } from "@/src/components/marketing/trending-products";
// import { WhyChooseUs } from "@/src/components/marketing/why-choose-us";

// export default function Home() {
//   return (
//     <div className="flex flex-col">
//       <HeroSection />
//       <FeaturedProducts />
//       <TrendingProducts />
//       <TopRatedProducts />
//       <CategoryBentoGrid />
//       <WhyChooseUs />
//       <Testimonials />
//       <NewsletterSection />
//     </div>
//   );
// }

/**
 * Homepage (Server Component)
 * Prefetches all product queries server-side
 * Passes dehydrated state to client via HydrationBoundary
 */

import {
  featuredProductsOptions,
  topRatedProductsOptions,
  trendingProductsOptions,
} from "@/domains/catalog/queries/products.query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { CategoryBentoGrid } from "@/components/marketing/category-bento-grid";
import { FeaturedProducts } from "@/components/marketing/featured-products";
import { HeroSection } from "@/components/marketing/hero-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";
import { Testimonials } from "@/components/marketing/testimonials";
import { TopRatedProducts } from "@/components/marketing/top-rated-products";
import { TrendingProducts } from "@/components/marketing/trending-products";
import { WhyChooseUs } from "@/components/marketing/why-choose-us";
import { getQueryClient } from "@/src/lib/get-query-client";

export default async function Home() {
  const queryClient = getQueryClient();

  // Non-blocking prefetch
  void queryClient.prefetchQuery(featuredProductsOptions);
  void queryClient.prefetchQuery(trendingProductsOptions);
  void queryClient.prefetchQuery(topRatedProductsOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col">
        <HeroSection />
        <FeaturedProducts />
        <TrendingProducts />
        <TopRatedProducts />
        <CategoryBentoGrid />
        <WhyChooseUs />
        <Testimonials />
        <NewsletterSection />
      </div>
    </HydrationBoundary>
  );
}
