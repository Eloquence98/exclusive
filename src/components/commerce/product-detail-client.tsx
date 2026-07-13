"use client";

import { ProductAccordions } from "@/components/commerce/product-accordions";
import { ProductDetailsTabs } from "@/components/commerce/product-details-tabs";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { ProductInfo } from "@/components/commerce/product-info";
import { productDetailOptions } from "@/src/domains/catalog/products.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface ProductDetailClientProps {
  slug: string;
}

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const { data: product } = useSuspenseQuery(productDetailOptions(slug));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Gallery */}
          <ProductGallery
            images={
              product.images.length > 0 ? product.images : [product.imageCover]
            }
            productName={product.title}
          />

          {/* Right Column: Info & Accordions */}
          <div className="flex flex-col">
            <ProductInfo product={product} />
            <ProductAccordions description={product.description} />
          </div>
        </div>

        {/* Bottom Section: Reviews + Related Products */}
        <section className="mt-24 border-t border-border pt-16">
          <ProductDetailsTabs
            productId={product.id}
            category={product.category}
          />
        </section>
      </div>
    </div>
  );
}
