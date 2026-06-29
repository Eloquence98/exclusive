import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-bone relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-12 pt-8 md:grid-cols-12 md:pb-20 md:pt-14">
        <div className="fade-up z-10 md:col-span-6 lg:col-span-5">
          <div className="text-ink/60 mb-5 text-[11px] uppercase tracking-[0.25em]">
            Spring / Summer 26 Collection
          </div>
          <h1 className="font-display text-[52px] leading-[0.95] tracking-tight sm:text-6xl md:text-[82px]">
            Everyday,
            <br />
            <span className="font-light italic">refined.</span>
          </h1>
          <p className="text-ink/70 mt-6 max-w-md text-base leading-relaxed md:text-lg">
            Premium essentials — weighted tees, Japanese selvedge, considered
            activewear. Designed in New York, made to last a decade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-ink text-cream hover:bg-charcoal inline-block px-7 py-3.5 text-sm uppercase tracking-[0.15em] transition-colors"
            >
              Shop the collection
            </Link>
            <Link
              href="/shop?category=denim"
              className="border-ink hover:bg-ink hover:text-cream inline-block border px-7 py-3.5 text-sm uppercase tracking-[0.15em] transition-colors"
            >
              Explore Denim
            </Link>
          </div>
        </div>

        <div className="relative md:col-span-6 lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85&auto=format&fit=crop"
              alt="Novva Spring/Summer editorial"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 90vw"
            />
            <div className="bg-cream/95 absolute bottom-5 left-5 max-w-[200px] px-3.5 py-2.5 text-xs leading-snug backdrop-blur">
              <div className="text-ink/50 mb-1 text-[10px] uppercase tracking-[0.2em]">
                Featured
              </div>
              <div className="font-medium">Heritage Crew Tee — $58</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
