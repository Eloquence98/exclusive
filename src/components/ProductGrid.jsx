import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Rating";
import { formatPrice } from "@/utils/utility";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product?.slug}`} className="group block">
      <div className="bg-bone relative aspect-[4/5] overflow-hidden">
        {product?.image && (
          <Image
            src={product?.image}
            alt={product?.name}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        )}
        {product?.badge && (
          <span className="bg-cream/95 absolute left-3 top-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] backdrop-blur">
            {product?.badge}
          </span>
        )}
        {!product?.badge && product?.isNew && (
          <span className="bg-ink text-cream absolute left-3 top-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em]">
            New
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="bg-cream/95 py-2.5 text-center text-xs uppercase tracking-[0.15em] backdrop-blur">
            View details
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div className="min-w-0">
          <div className="line-clamp-2 text-sm leading-snug">
            {product?.name}
          </div>
          {product?.reviewCount > 0 && (
            <div className="text-ink/60 mt-1.5 flex items-center gap-1.5 text-xs">
              <Rating value={product?.avgRating ?? 0} size={12} />
              <span>({product?.reviewCount})</span>
            </div>
          )}
        </div>
        <div className="shrink-0 text-sm">{formatPrice(product?.price)}</div>
      </div>
    </Link>
  );
}
