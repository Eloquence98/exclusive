import { ProductDetailClient } from "@/components/commerce/product-detail-client";
import { getProductBySlug } from "@/domains/catalog/products.api";
import { productDetailOptions } from "@/domains/catalog/products.query";
import { getQueryClient } from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic SEO metadata
 * Direct API call is correct here — server only, not cached by TanStack Query
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | ATELIER",
    };
  }

  return {
    title: `${product.title} | ATELIER`,
    description: product.description,
    openGraph: {
      title: `${product.title} | ATELIER`,
      description: product.description,
      images: [
        {
          url: product.imageCover,
          width: 1200,
          height: 1600,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ATELIER`,
      description: product.description,
      images: [product.imageCover],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(productDetailOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailClient slug={slug} />
    </HydrationBoundary>
  );
}
