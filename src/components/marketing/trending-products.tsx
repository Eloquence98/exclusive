"use client";

import { ProductCard } from "@/components/commerce/product-card";
import { trendingProductsOptions } from "@/domains/catalog/products.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, Variants } from "framer-motion";
import { SectionHeader } from "./section-header";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function TrendingProducts() {
  const { data: products } = useSuspenseQuery(trendingProductsOptions);

  return (
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
          {products.map((product) => (
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
