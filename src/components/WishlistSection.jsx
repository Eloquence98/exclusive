"use client";
import { useCart } from "@/hooks/CartProvider";
import { useWishlist } from "@/hooks/WishlistProvider";
import { Button } from "@heroui/button";
import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";

function WishlistSection() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach(item => {
      addToCart(item);
    });
  };

  if (!wishlist || wishlist.length === 0) {
    return <EmptyState type="wishlist" />;
  }

  return (
    <>
      <div className="wishlist-head mb-10 flex items-center justify-between">
        <h3 className="text-regular relative leading-9 text-black">
          Wishlist ({wishlist.length})
        </h3>
        <Button
          color="primary"
          variant="flat"
          className="float-right capitalize"
          onClick={handleMoveAllToBag}
        >
          Move all to bag
        </Button>
      </div>
      <div className="wishlist-body grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-items-start gap-4">
        {wishlist.map((product) => (
          <ProductCard className="w-full" key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default WishlistSection;
