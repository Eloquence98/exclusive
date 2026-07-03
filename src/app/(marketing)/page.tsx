import { CategoryBentoGrid } from "@/src/components/marketing/category-bento-grid";
import { FeaturedProducts } from "@/src/components/marketing/featured-products";
import { HeroSection } from "@/src/components/marketing/hero-section";
import { TopRatedProducts } from "@/src/components/marketing/top-rated-products";
import { TrendingProducts } from "@/src/components/marketing/trending-products";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProducts />
      <TrendingProducts />
      <TopRatedProducts />
      <CategoryBentoGrid />
    </div>
  );
}
