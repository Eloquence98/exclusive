import BestSellingProductSlider from "@/src/components/BestSellingProductSlider";
import { FeaturedProducts } from "@/src/components/marketing/featured-products";
import { HeroSection } from "@/src/components/marketing/hero-section";
import { TrendingProducts } from "@/src/components/marketing/trending-products";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProducts />
      <TrendingProducts />
      <BestSellingProductSlider />
    </div>
  );
}
