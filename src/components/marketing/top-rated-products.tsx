"use client";

import { ProductCard, type Product } from "@/components/commerce/product-card";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

// Mock data specifically featuring high ratings
const mockTopRatedProducts: Product[] = [
  {
    id: "9",
    slug: "structured-wool-coat",
    name: "Structured Wool Overcoat",
    brand: "Atelier Outerwear",
    price: 595.0,
    imageUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: "10",
    slug: "suede-chelsea-boots",
    name: "Italian Suede Chelsea Boots",
    brand: "Atelier Footwear",
    price: 340.0,
    imageUrl:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "11",
    slug: "ribbed-knit-polo",
    name: "Ribbed Knit Polo Shirt",
    brand: "Atelier Essentials",
    price: 145.0,
    imageUrl:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 4.7,
    reviewCount: 215,
  },
  {
    id: "12",
    slug: "titanium-aviators",
    name: "Titanium Aviator Sunglasses",
    brand: "Atelier Eyewear",
    price: 220.0,
    imageUrl:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    rating: 5.0,
    reviewCount: 42,
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

export function TopRatedProducts() {
  return (
    // Alternating background: Pure white
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Customer Favorites"
          title="Top Rated Products"
          actionHref="/shop?sort=top-rated"
        />

        <motion.div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:-mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {mockTopRatedProducts.map((product) => (
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
