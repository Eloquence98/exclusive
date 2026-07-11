"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }, // Smooth ease-out
  },
};

export function HeroSection() {
  return (
    <section className="relative h-[calc(100dvh-6rem)] w-full overflow-hidden bg-zinc-100">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
        alt="Premium lifestyle collection"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient Overlay for text readability and bottom blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-24 text-center md:pb-32">
        <motion.div
          className="mx-auto max-w-3xl space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Overline */}
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
          >
            New Season Collection
          </motion.p>

          {/* H1 Display */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-medium tracking-tight text-zinc-950 md:text-7xl"
          >
            The Art of Quiet Luxury
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg"
          >
            Timeless essentials crafted for the modern wardrobe. Discover pieces
            designed to elevate your everyday.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
          >
            <Button asChild size="lg" variant="default">
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/shop?category=lookbook">Lookbook</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
