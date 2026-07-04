import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { ProductInfo } from "@/components/commerce/product-info";
import { ProductAccordions } from "@/components/commerce/product-accordions";
import { ProductDetailsTabs } from "@/components/commerce/product-details-tabs";

// Dynamic SEO Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | ATELIER",
    };
  }

  return {
    title: `${product.name} | ATELIER`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ATELIER`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ATELIER`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch product data from backend
  const product = await getProductBySlug(params.slug);

  // Trigger 404 page if product doesn't exist
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Right Column: Info & Accordions */}
          <div className="flex flex-col">
            <ProductInfo product={product} />
            <ProductAccordions />
          </div>
        </div>

        {/* Bottom Section: Tabs for Reviews and Related Products */}
        <section className="mt-24 border-t border-border pt-16">
          <ProductDetailsTabs />
        </section>
      </div>
    </div>
  );
}
