"use client";
import { tempProducts } from "@/app/_lib/tempData";
import Button from "./Button";
import ProductCard from "./ProductCard";

function WishlistSection() {
  return (
    <>
      <div className="wishlist-head mb-10 flex items-center justify-between">
        <h3 className="text-regular relative leading-9 text-black">
          Wishlist ({tempProducts.length})
        </h3>
        <Button
          as="link"
          href="/cart"
          variant="secondary"
          className="float-right capitalize"
        >
          Move all to bag
        </Button>
      </div>
      <div className="wishlist-body grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-start gap-4">
        {tempProducts.map((product) => (
          <ProductCard className="w-full" key={product?.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default WishlistSection;
