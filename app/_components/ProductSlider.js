"use client";
import { tempProducts } from "@/app/_lib/tempData";
import ProductCard from "@/app/_components/ProductCard";
import SliderSection from "@/app/_components/SliderSection";
import Swiper from "@/app/_components/Swiper";

const OverflowStyles = `.swiper {
  overflow: visible !important;
}`;

function ProductSlider() {
  return (
    <SliderSection
      subHeading="today's"
      heading="flash sales"
      href={`/products?section=${encodeURIComponent("flash sales")}`}
      countDown={{ isNeeded: true, props: { hours: 25 } }}
      category={false}
      navigateButtons={true}
      data={tempProducts}
      sliderProps={{
        injectStyles: [OverflowStyles],
        navigation: {
          nextEl: ".sale-button-next",
          prevEl: ".sale-button-prev",
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
          <ProductCard product={product} />
        </Swiper.Slide>
      )}
    />
  );
}

export default ProductSlider;
