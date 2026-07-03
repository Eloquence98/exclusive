"use client";

import { ProductCard, type Product } from "@/components/commerce/product-card";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

// Distinct mock data for Trending products
const mockTrendingProducts: Product[] = [
  {
    id: "5",
    slug: "merino-wool-turtleneck",
    name: "Merino Wool Turtleneck",
    brand: "Atelier Knitwear",
    price: 195.0,
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "6",
    slug: "relaxed-linen-blazer",
    name: "Relaxed Linen Blazer",
    brand: "Atelier Tailoring",
    price: 320.0,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "7",
    slug: "minimalist-leather-watch",
    name: "Minimalist Leather Watch",
    brand: "Atelier Accessories",
    price: 275.0,
    imageUrl:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "8",
    slug: "cotton-canvas-tote",
    name: "Heavyweight Cotton Canvas Tote",
    brand: "Atelier Essentials",
    price: 85.0,
    salePrice: 65.0,
    discountPercentage: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    inStock: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function TrendingProducts() {
  return (
    // Blueprint: bg-zinc-50 for subtle section breaks
    <section className="bg-zinc-50 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Popular Right Now"
          title="Trending Products"
          actionHref="/shop?sort=trending"
        />

        <motion.div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:-mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {mockTrendingProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="min-w-[80vw] snap-start md:min-w-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
