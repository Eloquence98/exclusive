import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import StarRating from "./StarRating";
import { formatCurrency } from "@/app/_utills/utility";

function ProductCard({ product }) {
  const { image, title, price, discount, ratings } = product;
  const discountedPrice = price - discount;
  const percentOff = (discount / price) * 100;
  const isDiscount = percentOff > 0 ? true : false;

  return (
    // <div className="card space-y-2">
    <div className="card space-y-2">
      <div className="image relative flex h-[15.625rem] w-full items-center justify-center rounded bg-secondary">
        <div className="image relative h-48 w-44">
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            alt={`${image} image`}
          />
        </div>
        {isDiscount && (
          <div className="absolute left-3 top-3 rounded bg-primary px-3 py-1 text-xs text-white">
            <p>-{percentOff.toFixed(2)}%</p>
          </div>
        )}
        <div className="absolute right-3 top-3 space-y-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
            <HeartIcon className="h-5 w-5" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>
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
