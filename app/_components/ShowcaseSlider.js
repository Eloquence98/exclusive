"use client";
import image3 from "@/public/alexander-kovacs-unsplash.jpg";
import image2 from "@/public/clark-street-mercantile-unsplash.jpg";
import image1 from "@/public/ksenia-chernaya.jpg";
import martProduction from "@/public/mart-production.jpg";
import image4 from "@/public/qin-fan-unsplash.jpg";
import Image from "next/image";
import Swiper from "./Swiper";

const sliderProducts = [
  { name: "image one", image: image3, alt: "A showcase product image" },
  { name: "image two", image: image2, alt: "A showcase product image" },
  { name: "image three", image: image1, alt: "A showcase product image" },
  { name: "image four", image: image4, alt: "A showcase product image" },
  {
    name: "image five",
    image: martProduction,
    alt: "A showcase product image",
  },
];

export default function ShowcaseSlider() {
  return (
    <Swiper
      slides-per-view="1"
      pagination="true"
      loop="true"
      initial-slide={2}
      className="max-h-full max-w-full"
    >
      {sliderProducts.map((product) => (
        <Swiper.Slide key={product.name}>
          <Image
            src={product.image}
            fill
            placeholder="blur"
            quality={80}
            className="object-cover object-center"
            alt={product.alt}
          />
        </Swiper.Slide>
      ))}
    </Swiper>
  );
}
