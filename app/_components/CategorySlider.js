"use client";
import SliderSection from "@/app/_components/SliderSection";
import Swiper from "@/app/_components/Swiper";
import { sideNavigationItem } from "./Showcase";

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
      render={(category) => (
        <Swiper.Slide key={category}>
          <p> {category} </p>
        </Swiper.Slide>
      )}
    />
  );
}

export default CategorySlider;
