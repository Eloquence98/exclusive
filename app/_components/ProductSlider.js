"use client";
import ProductCard from "./ProductCard";
import Swiper from "./Swiper";

export default function ShowcaseSlider({ tempProducts }) {
  return (
    <Swiper
      space-between="30"
      slides-per-view="1"
      breakProp={true}
      className="max-h-full max-w-full"
    >
      {tempProducts.map((product) => (
        <Swiper.Slide key={product.id}>
          <ProductCard key={product.id} product={product} />
        </Swiper.Slide>
      ))}
    </Swiper>
  );
}
