import { ProductAccordions } from "@/components/commerce/product-accordions";
import { ProductDetailsTabs } from "@/components/commerce/product-details-tabs";
import { ProductGallery } from "@/components/commerce/product-gallery";
import {
  ProductInfo,
  type ProductInfoData,
} from "@/components/commerce/product-info";

// Mock data
const mockProduct: ProductInfoData & { images: string[] } = {
  brand: "Atelier Essentials",
  name: "Cashmere Crewneck Sweater",
  category: "Knitwear",
  price: 245.0,
  salePrice: 196.0,
  discountPercentage: 20,
  rating: 4.8,
  reviewCount: 124,
  inStock: true,
  sizes: [
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: false },
    { name: "XL", inStock: true },
  ],
  images: [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop",
  ],
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = mockProduct;

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

            {/* Accordions placed directly below Add to Cart area */}
            <ProductAccordions />
          </div>
        </div>

        {/* Bottom Section: Tabs for Reviews and Related Products */}
        <section className="mt-10 border-border pt-16">
          <ProductDetailsTabs />
        </section>
      </div>
    </div>
  );
}
