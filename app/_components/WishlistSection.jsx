"use client";
import { tempProducts } from "@/app/_lib/tempData";
import Button from "./Button";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function WishlistSection() {
  const [isMounted, setIsMounted] = useState(false);
  const randomInt = Math.floor(Math.random() * 3) + 2;
  const wishedItems = tempProducts.slice(0, randomInt);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <div className="wishlist-head mb-10 flex items-center justify-between">
        <h3 className="text-regular relative leading-9 text-black">
          Wishlist ({wishedItems.length})
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
        {wishedItems.map((product) => (
          <ProductCard className="w-full" key={product?.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default WishlistSection;
