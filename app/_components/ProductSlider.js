"use client";
import { tempProducts } from "@/app/_lib/tempData";
import ProductCard from "./ProductCard";
import SliderSection from "./SliderSection";
import Swiper from "./Swiper";

const OverflowStyles = `.swiper {
  overflow: visible !important;
}`;

function ProductSlider() {
  return (
    <div>
      <SliderSection
        subHeading="Today's"
        heading="Flash Sales"
        countDown={{ isNeeded: true, props: { hours: 25 } }}
        navigateButtons={true}
        data={tempProducts}
        sliderProps={{
          injectStyles: [OverflowStyles],
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
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
            <ProductCard key={product.id} product={product} />
          </Swiper.Slide>
        )}
      />
    </div>
  );
}

export default ProductSlider;
