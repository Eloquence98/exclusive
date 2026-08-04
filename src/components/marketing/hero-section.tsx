"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";

import { heroButtonVariants } from "@/components/marketing/hero-button";
import { cn } from "@/utils/utility";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.35, staggerChildren: 0.11 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

const line: Variants = {
  hidden: { y: "112%" },
  show: {
    y: "0%",
    transition: { duration: 1.25, ease: EASE },
  },
};

const HEADLINE_LINES = ["Refined", "by restraint."];

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "hero-theme relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-background text-foreground",
        className,
      )}
    >
      {/* ---------- Background image + overlays ---------- */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 1.09, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-fashion.webp"
            alt="Model wearing the Exclusive wool-cashmere overcoat from the Autumn Winter 2026 collection"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] md:object-[75%_center]"
          />
        </motion.div>

        {/* Mobile readability wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25 md:hidden" />

        {/* Desktop editorial wash */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/80 to-transparent md:block" />

        {/* Vertical framing for header & footer legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/80" />

        {/* Soft warm vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_35%,transparent_0%,transparent_45%,var(--background)_100%)] opacity-70" />

        {/* merge next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* ---------- Main content ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-14 pt-24 md:px-10 md:pb-28 md:pt-28 lg:px-16"
      >
        <div className="lg:max-w-184 max-w-xl">
          {/* Seasonal label */}
          <motion.div
            variants={rise}
            className="mb-8 flex items-center gap-4 md:mb-10"
          >
            <span className="h-px w-10 bg-foreground/40" />
            <span className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground md:text-[0.7rem]">
              Autumn / Winter 2026
            </span>
            <span className="hidden rounded-full border border-border/70 bg-background/40 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-foreground/80 backdrop-blur-md sm:inline">
              Collection No. 04
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-balance font-serif text-[clamp(3rem,13vw,8.5rem)] font-normal leading-[0.88] tracking-[-0.035em]">
            {HEADLINE_LINES.map((text, index) => (
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={line}
                  className={
                    index === 1
                      ? "block italic text-foreground/85"
                      : "block text-foreground"
                  }
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            variants={rise}
            className="mt-7 max-w-md text-pretty text-[0.95rem] leading-relaxed text-muted-foreground md:mt-9 md:max-w-lg md:text-[1.05rem]"
          >
            Sculpted outerwear and rare natural fibres, cut in limited runs and
            hand-finished in Florence — for a wardrobe that outlives the season.
          </motion.p>

          {/* Calls to action */}
          <motion.div
            variants={rise}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-12"
          >
            <a
              href="/shop"
              className={cn(
                heroButtonVariants({ size: "lg" }),
                "group h-12 rounded-full px-7 text-[0.72rem] font-medium uppercase tracking-[0.22em]",
                "pr-5! w-full sm:w-auto",
                "shadow-[0_12px_40px_-14px_hsl(var(--primary)/0.45)]",
                "transition-shadow duration-500 hover:shadow-[0_18px_55px_-16px_hsl(var(--primary)/0.5)]",
              )}
            >
              Shop Collection
              <ArrowRight
                data-icon="inline-end"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </a>

            <a
              href="/shop?sort=newest"
              className={cn(
                heroButtonVariants({ size: "lg", variant: "outline" }),
                "group h-12 rounded-full px-7 text-[0.72rem] font-medium uppercase tracking-[0.22em]",
                "pr-5! w-full sm:w-auto",
              )}
            >
              New Arrivals
              <ArrowUpRight
                data-icon="inline-end"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Fine print */}
          <motion.ul
            variants={rise}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground md:mt-11"
          >
            <li>Made in Italy</li>
            <li className="hidden h-3 w-px bg-border sm:block" />
            <li>Complimentary global delivery</li>
            <li className="hidden h-3 w-px bg-border sm:block" />
            <li>Limited runs</li>
          </motion.ul>
        </div>
      </motion.div>

      {/* ---------- Bottom detail row ---------- */}
      <div className="relative z-10 flex items-end justify-between gap-6 px-6 md:px-10 lg:px-16">
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
          className="flex items-center gap-4"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <span className="relative block h-px w-16 overflow-hidden bg-border">
            <motion.span
              className="absolute inset-y-0 left-0 w-6 bg-foreground"
              animate={{ x: ["-100%", "270%"] }}
              transition={{
                duration: 2.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            />
          </span>
        </motion.div>

        {/* Editorial caption card */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: EASE, delay: 1.25 }}
          className="hidden max-w-[19rem] rounded-lg border border-border/60 bg-background/45 p-5 shadow-[0_18px_60px_-30px_var(--foreground)] backdrop-blur-xl md:block"
        >
          <figcaption className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Look 04
          </figcaption>
          <p className="mt-3 font-serif text-lg leading-snug text-foreground">
            The Cashmere Overcoat
          </p>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">
            Double-faced wool and cashmere, raw-cut lapel, unlined shoulder.
            Ninety pieces only.
          </p>
        </motion.figure>
      </div>
    </section>
  );
}
