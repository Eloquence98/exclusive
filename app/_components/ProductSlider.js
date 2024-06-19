"use client";
import { Inter } from "next/font/google";
import LayoutPadding from "./LayoutPadding";
import SwiperModal from "./SwiperModal";
import Countdown from "@/app/_components/CountDown";
import { tempProducts } from "@/app/_lib/tempData";
import ProductCard from "./ProductCard";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function ProductSlider() {
  return (
    <SwiperModal>
      <section className="mt-35">
        <LayoutPadding>
          <div className="test">
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
                <SwiperModal.Swiper.Prev />
                <SwiperModal.Swiper.Next />
              </div>
            </div>
            <div className="section-slider flex gap-7">
              <SwiperModal.Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakProp={true}
                className="max-h-full max-w-full"
              >
                {tempProducts.map((product) => (
                  <SwiperModal.Swiper.Slide key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </SwiperModal.Swiper.Slide>
                ))}
              </SwiperModal.Swiper>
            </div>
          </div>
        </LayoutPadding>
      </section>
    </SwiperModal>
  );
}

export default ProductSlider;
