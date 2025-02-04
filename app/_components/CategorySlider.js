"use client";
import SliderSection from "@/app/_components/SliderSection";
import Swiper from "@/app/_components/Swiper";
import { productCategories } from "../_lib/productCategories";
import CategoryCard from "./CategoryCard";

export const sideNavigationItem = productCategories || [];

function CategorySlider() {
  return (
    <SliderSection
      subHeading="categories"
      heading="browse by category"
      countDown={{ isNeeded: false, props: null }}
      category={true}
      navigateButtons={true}
      data={sideNavigationItem}
      sliderProps={{
        navigation: {
          nextEl: ".category-button-next",
          prevEl: ".category-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          540: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
          },
          880: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 30,
          },
        },
      }}
      render={(category) => (
        <Swiper.Slide key={category?.name}>
          <CategoryCard category={category} />
        </Swiper.Slide>
      )}
    />
  );
}

export default CategorySlider;
