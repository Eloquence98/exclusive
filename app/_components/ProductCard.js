import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import StarRating from "./StarRating";

function ProductCard({ product }) {
  const { image, name, price, discount, ratings } = product;
  const discountedPrice = price - discount;
  const percentOff = (discount / price) * 100;
  const isDiscount = percentOff > 0 ? true : false;

  return (
    <div className="card space-y-2">
      <div className="image relative flex h-[15.625rem] w-[16.875em] items-center justify-center rounded bg-secondary">
        <Image
          src={image}
          quality={90}
          height={180}
          width={190}
          className="object-cover object-center"
          alt={`${image} image`}
        />
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
      <p className="font-medium">{name}</p>
      <p className="font-medium text-primary">
        ${discountedPrice} {"   "}
        {isDiscount && (
          <>
            <span className="ml-2 text-discount line-through"> ${price} </span>{" "}
          </>
        )}
      </p>
      <StarRating totalStars={5} ratings={ratings} />
    </div>
  );
}

export default ProductCard;
