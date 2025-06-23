"use client";
import { useCart } from "@/hooks/CartProvider";
import { useWishlist } from "@/hooks/WishlistProvider";
import { formatCurrency } from "@/utils/utility";
import {
  EyeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";

function ProductCard({ className, product }) {
  const { image, title, price, discount, ratings, id } = product;
  const discountedPrice = price - discount;
  const percentOff = (discount / price) * 100;
  const isDiscount = percentOff > 0 ? true : false;

  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item.id === id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleViewProduct = () => {
    router.push(`/products/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={`${className} card group space-y-2`}>
      <div className="image relative flex h-[15.625rem] w-full items-center justify-center overflow-hidden rounded bg-secondary">
        <div className="image relative h-48 w-44">
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            alt={`${title} image`}
          />
        </div>
        {isDiscount && (
          <div className="absolute left-3 top-3 rounded bg-primary px-3 py-1 text-xs text-white">
            <p>-{percentOff.toFixed(2)}%</p>
          </div>
        )}
        <div className="absolute right-3 top-3 space-y-2">
          <button
            onClick={handleWishlistToggle}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors hover:text-primary"
          >
            {isInWishlist ? (
              <HeartIconSolid className="h-5 w-5 text-primary" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleViewProduct}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors hover:text-primary"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Add to Cart Button - Shows on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 flex w-full items-center justify-center bg-black bg-opacity-80 py-3 text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ShoppingCartIcon className="mr-2 h-5 w-5" />
          Add To Cart
        </button>
      </div>
      <p className="font-medium">{title}</p>
      <p className="font-medium text-primary">
        {formatCurrency(discountedPrice)} {"   "}
        {isDiscount && (
          <>
            <span className="ml-2 text-discount line-through">
              {" "}
              {formatCurrency(price)}{" "}
            </span>{" "}
          </>
        )}
      </p>
      <StarRating totalStars={5} ratings={ratings} />
    </div>
  );
}

export default ProductCard;
