import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { getProducts } from "@/lib/data-service";
import { productCategories } from "@/lib/productCategories";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Products | Exclusive",
  description: "Browse our collection of premium products",
};

async function ProductGrid({ products }) {
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
        <h3 className="text-lg font-semibold text-foreground">Price Range</h3>
        <div className="mt-4 space-y-2">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="From"
              className="w-full rounded border border-border px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="To"
              className="w-full rounded border border-border px-3 py-2 text-sm"
            />
          </div>
          <button className="w-full rounded bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90">
            Apply Filter
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">Rating</h3>
        <div className="mt-4 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary" />
              <span className="flex text-sm text-warning-500">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </span>
              <span className="text-sm text-foreground">& Up</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

async function Page({ searchParams }) {
  const category = searchParams?.category;
  const section = searchParams?.section;
  const products = await getProducts(section);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Products"}
        </h1>
        <div className="flex items-center gap-4">
          <select className="rounded border border-border px-3 py-2 text-sm">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
          <button className="rounded bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/90">
            Filter
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-8 lg:grid-cols-[240px,1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <SideNavigation />
        </aside>

        {/* Product Grid */}
        <main>
          <Suspense fallback={<Spinner />}>
            <ProductGrid products={products} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default Page;
