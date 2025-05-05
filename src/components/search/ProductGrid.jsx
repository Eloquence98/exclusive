"use client";

import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import Link from "next/link";

export default function ProductGrid({ products }) {
  return (
    <div className="md:col-span-3">
      {/* Sort controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-default-500">
          Showing <span className="font-medium">{products.length}</span> results
        </div>
        <Select
          label="Sort by"
          size="sm"
          className="w-40"
          defaultSelectedKeys={["featured"]}
        >
          <SelectItem key="featured" value="featured">
            Featured
          </SelectItem>
          <SelectItem key="newest" value="newest">
            Newest
          </SelectItem>
          <SelectItem key="price-low" value="price-low">
            Price: Low to High
          </SelectItem>
          <SelectItem key="price-high" value="price-high">
            Price: High to Low
          </SelectItem>
          <SelectItem key="rating" value="rating">
            Best Rating
          </SelectItem>
        </Select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg border border-default-200 transition-shadow hover:shadow-md"
          >
            <div className="relative h-60 bg-default-100">
              {/* Replace with actual product image */}
              <div className="absolute inset-0 flex items-center justify-center text-default-400">
                Product Image
              </div>

              {product.discount > 0 && (
                <div className="absolute left-2 top-2 rounded bg-danger-500 px-2 py-1 text-xs font-medium text-white">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="mb-1 font-medium text-default-900 transition-colors group-hover:text-primary-500">
                <Link href={`/products/${product.id}`} className="block">
                  {product.name}
                </Link>
              </h3>

              <div className="mb-2 flex items-center gap-1">
                <div className="flex text-warning-500">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-xs text-default-500">
                  {product.rating}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {product.discount > 0 ? (
                  <>
                    <span className="font-semibold">
                      $
                      {(
                        product.price -
                        (product.price * product.discount) / 100
                      ).toFixed(2)}
                    </span>
                    <span className="text-sm text-default-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination total={10} initialPage={1} />
      </div>
    </div>
  );
}
