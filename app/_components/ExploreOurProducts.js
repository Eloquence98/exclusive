"use client";
import React from "react";
import ProductCard from "@/app/_components/ProductCard";
import SliderSection from "@/app/_components/SliderSection";
import Swiper from "@/app/_components/Swiper";
import { tempProducts } from "@/app/_lib/tempData";

const increaseTempProducts = [...tempProducts, ...tempProducts];
const exploreProductStyles = `.swiper {
    height: 50rem;
  }`;

function ExploreOurProducts() {
  // Split the data into two arrays
  const half = Math.ceil(increaseTempProducts.length / 2);
  const firstHalf = increaseTempProducts.slice(0, half);
  const secondHalf = increaseTempProducts.slice(half);

  return (
    <SliderSection
      subHeading="our products"
      heading="explore our products"
      href={`/products?section=${encodeURIComponent("explore our products")}`}
      countDown={{ isNeeded: false, props: null }}
      category={false}
      navigateButtons={true}
      data={firstHalf} // Pass the first array to the SliderSection
      sliderProps={{
        injectStyles: [exploreProductStyles],
        navigation: {
          nextEl: ".explore-products-button-next",
          prevEl: ".explore-products-button-prev",
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
      render={(product, i) => (
        <Swiper.Slide key={product.id}>
          <div className="grid h-full grid-cols-1">
            <ProductCard product={product} />
            {secondHalf[i] ? <ProductCard product={secondHalf[i]} /> : null}
          </div>
        </Swiper.Slide>
      )}
    />
  );
}

export default ExploreOurProducts;
