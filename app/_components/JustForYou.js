"use client";
import Swiper from "@/app/_components/Swiper";
import { tempProducts } from "@/app/_lib/tempData";
import ProductCard from "./ProductCard";
import SectionLabel from "./SectionLabel";
import Button from "./Button";

const sliderProps = {
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
};

function JustForYou() {
  return (
    <div className="just-for-you-wrapper">
      <div className="for-you-head mb-10 flex items-center justify-between">
        <SectionLabel className="capitalize"> just for you </SectionLabel>
        <Button
          as="link"
          href="/cart"
          variant="secondary"
          className="float-right capitalize"
        >
          view all
        </Button>
      </div>
      <div className="section-slider flex gap-7 overflow-x-visible">
        <Swiper
          {...sliderProps}
          className="h-full max-h-full w-full max-w-full"
        >
          {tempProducts.map((product) => (
            <Swiper.Slide key={product?.id}>
              <ProductCard product={product} />
            </Swiper.Slide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default JustForYou;
