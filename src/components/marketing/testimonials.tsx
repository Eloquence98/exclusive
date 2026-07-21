"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utility";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeader } from "./section-header";

interface Testimonial {
  id: string;
  quote: string;
  rating: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The quality of the cashmere is unparalleled. It's rare to find pieces that feel this luxurious yet remain so effortlessly wearable for everyday life.",
    rating: 5,
    author: {
      name: "Elena V.",
      role: "Verified Buyer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
  },
  {
    id: "2",
    quote:
      "Atelier has completely elevated my wardrobe. The tailoring on the wool trousers is impeccable, and the customer service experience was flawless from start to finish.",
    rating: 5,
    author: {
      name: "Marcus T.",
      role: "Verified Buyer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    },
  },
  {
    id: "3",
    quote:
      "Finally, a brand that understands quiet luxury. No loud logos, just exceptional materials and timeless silhouettes. I've already ordered three more pieces.",
    rating: 5,
    author: {
      name: "Sarah J.",
      role: "Verified Buyer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    },
  },
  {
    id: "4",
    quote:
      "The leather weekend bag exceeded my expectations. The craftsmanship is evident in every stitch. It's an investment piece I know I'll have for decades.",
    rating: 4,
    author: {
      name: "David L.",
      role: "Verified Buyer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    },
  },
];

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    // Alternating background: Off-white
    <section className="overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            overline="Client Stories"
            title="What Our Customers Say"
            className="mb-0"
          />

          {/* Desktop Navigation Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-zinc-200 hover:bg-primary hover:text-white"
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-zinc-200 hover:bg-primary hover:text-white"
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 scrollbar-hide md:-mx-0 md:px-0"
        >
          {mockTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // Mobile: 80vw width. Desktop: Fixed 400px width to show ~3 cards.
              className="min-w-[80vw] flex-shrink-0 snap-start md:min-w-[400px]"
            >
              <div className="flex h-full flex-col rounded-2xl border border-muted bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-8">
                {/* Large Quotation Mark */}
                <Quote
                  className="mb-6 h-10 w-10 text-zinc-200"
                  strokeWidth={1.5}
                />

                {/* Star Rating */}
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating
                          ? "fill-amber-500 text-amber-500"
                          : "fill-zinc-200 text-zinc-200",
                      )}
                    />
                  ))}
                </div>

                {/* Italicized Review Text */}
                <p className="mb-8 flex-1 text-base italic leading-relaxed text-zinc-600">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* User Avatar & Info */}
                <div className="flex items-center gap-4 border-t border-muted pt-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-950">
                      {testimonial.author.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
