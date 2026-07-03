import { FeaturedProducts } from "@/src/components/marketing/featured-products";
import { HeroSection } from "@/src/components/marketing/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProducts />

      {/* Placeholder for upcoming Phase 2 sections */}
      <section className="bg-zinc-50 px-4 py-24 text-center">
        <p className="text-sm text-zinc-400">
          Phase 2: Trending Products coming next...
        </p>
      </section>
    </div>
  );
}
