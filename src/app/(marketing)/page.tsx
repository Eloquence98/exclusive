import { HeroSection } from "@/src/components/marketing/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Placeholder for upcoming Phase 2 sections */}
      <section className="px-4 py-24 text-center">
        <p className="text-sm text-zinc-400">
          Phase 2: Featured Products coming next...
        </p>
      </section>
    </div>
  );
}
