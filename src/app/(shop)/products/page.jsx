import LayoutPadding from "@/components/LayoutPadding";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import { getProductList } from "@/domains/catalog/api/products.api";
import { productCategories } from "@/lib/productCategories";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Products | Exclusive",
  description: "Browse our collection of premium products",
};

async function ProductGrid({ category, onSale }) {
  const filters = {};

  if (category) {
    filters.category = category;
  }
  if (onSale) {
    filters.onSale = true;
  }

  const { products } = await getProductList(filters);

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-default-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function SideNavigation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Categories</h3>
        <ul className="mt-4 space-y-3">
          {productCategories.map(({ name, pathname, query, icon }) => (
            <li key={name} className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <Link
                href={{
                  pathname,
                  query: { category: query },
                }}
                className="text-sm transition-colors hover:text-primary"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <Link
              href="/products?onSale=true"
              className="text-sm transition-colors hover:text-primary"
            >
              On Sale
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-sm transition-colors hover:text-primary"
            >
              All Products
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category;
  const onSale = searchParams?.onSale === "true";

  return (
    <LayoutPadding>
      <div className="mt-15">
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <h1 className="text-2xl font-bold text-foreground">
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : onSale
                ? "Sale Products"
                : "All Products"}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-[240px,1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <SideNavigation />
          </aside>

          {/* Product Grid */}
          <main>
            <Suspense fallback={<Spinner />}>
              <ProductGrid category={category} onSale={onSale} />
            </Suspense>
          </main>
        </div>
      </div>
    </LayoutPadding>
  );
}
