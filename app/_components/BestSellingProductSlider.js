"use client";
import ProductCard from "@/app/_components/ProductCard";
import SliderSection from "@/app/_components/SliderSection";
import Swiper from "@/app/_components/Swiper";
import { tempProducts } from "@/app/_lib/tempData";

function BestSellingProductSlider() {
  return (
    <SliderSection
      subHeading="this month"
      heading="best selling products"
      href={`/products?section=${encodeURIComponent("best selling products")}`}
      countDown={{ isNeeded: false, props: null }}
      category={false}
      navigateButtons={false}
      data={tempProducts}
      sliderProps={{
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          540: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 2,
          },
          880: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
          },
        },
      }}
      render={(product) => (
        <Swiper.Slide key={product.id}>
          <ProductCard product={product} />
        </Swiper.Slide>
      )}
    />
  );
}

export default BestSellingProductSlider;
