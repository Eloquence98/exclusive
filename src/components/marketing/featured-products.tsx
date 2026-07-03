"use client";

import { ProductCard, type Product } from "@/components/commerce/product-card";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

// Mock data matching the Product interface from Task 1.8
const mockFeaturedProducts: Product[] = [
  {
    id: "1",
    slug: "cashmere-crewneck-sweater",
    name: "Cashmere Crewneck Sweater",
    brand: "Atelier Essentials",
    price: 245.0,
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
    inStock: true,
  },
  {
    id: "2",
    slug: "tailored-wool-trousers",
    name: "Tailored Wool Trousers",
    brand: "Atelier Studio",
    price: 185.0,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
    inStock: true,
  },
  {
    id: "3",
    slug: "silk-blend-shirt",
    name: "Silk Blend Relaxed Shirt",
    brand: "Atelier Essentials",
    price: 160.0,
    salePrice: 120.0,
    discountPercentage: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
    inStock: true,
  },
  {
    id: "4",
    slug: "leather-weekend-bag",
    name: "Full Grain Leather Weekend Bag",
    brand: "Atelier Accessories",
    price: 450.0,
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    isFeatured: true,
    inStock: false, // Testing out of stock UI
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Blueprint: staggered card animations
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

export function FeaturedProducts() {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          overline="Curated Selection"
          title="Featured Products"
          actionHref="/shop?featured=true"
        />

        {/* 
          Responsive Layout:
          Mobile: Horizontal scroll with snap-x.
          Desktop: 4-column CSS Grid.
        */}
        <motion.div
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:-mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {mockFeaturedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              // min-w-[80vw] ensures cards take up most of the screen on mobile for the horizontal scroll
              // md:min-w-0 allows the grid to control the width on desktop
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
