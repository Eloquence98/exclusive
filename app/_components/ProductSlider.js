"use client";
import Countdown from "@/app/_components/CountDown";
import { tempProducts } from "@/app/_lib/tempData";
import { Inter } from "next/font/google";
import Button from "./Button";
import LayoutPadding from "./LayoutPadding";
import ProductCard from "./ProductCard";
import Swiper from "./Swiper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const OverflowStyles = `.swiper {
  overflow: visible !important;
}`;

function ProductSlider() {
  return (
    <LayoutPadding>
      <section className="mb-15 mt-35">
        <div className="section-stats mb-10 flex min-h-25 gap-22">
          <div className="headings flex flex-col justify-between">
            <h3 className="text-regular relative pl-9 font-semibold leading-9 text-primary">
              <span className="absolute left-0 top-0 inline-block h-full w-5 rounded bg-primary"></span>
              Today&apos;s
            </h3>
            <h2
              className={`${inter.className} text-nowrap text-4xl font-semibold`}
            >
              Flash Sales
            </h2>
          </div>
          <div className="mt-auto">
            <Countdown hours={25} />
          </div>
          <div className="ml-auto mt-auto flex items-center justify-center gap-2">
            <Swiper.Prev />
            <Swiper.Next />
          </div>
        </div>

        <div className="section-slider flex gap-7 overflow-x-visible">
          <Swiper
            injectStyles={[OverflowStyles]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
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
            }}
            className="h-full max-h-full w-full max-w-full"
          >
            {tempProducts.map((product) => (
              <Swiper.Slide key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Swiper.Slide>
            ))}
          </Swiper>
        </div>

        <div className="mt-14 inline-flex w-full items-center justify-center">
          {/* change href */}
          <Button as="link" href="/">
            View All Products
          </Button>
        </div>
      </section>
    </LayoutPadding>
  );
}

export default ProductSlider;
