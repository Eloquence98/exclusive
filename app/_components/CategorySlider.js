"use client";
import SliderSection from "@/app/_components/SliderSection";
import Swiper from "@/app/_components/Swiper";
import { sideNavigationItem } from "./Showcase";
import CategoryCard from "./CategoryCard";

function CategorySlider() {
  return (
    <SliderSection
      subHeading="Categories"
      heading="Browse By Category"
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
        <Swiper.Slide key={category}>
          <CategoryCard category={category} />
        </Swiper.Slide>
      )}
    />
  );
}

export default CategorySlider;
