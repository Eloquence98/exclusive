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

const paginationBulletStyles = [
  `
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    text-align: center;
    line-height: 8px;
    font-size: 0px !important;
    color: #000;
    opacity: 1;
    background: rgba(128, 128, 128, 1);
  }

  .swiper-pagination-bullet-active {
    color: #fff;
    background: #DB4444;
    border: 2px solid #fff;
  }
  `,
];

export default function ShowcaseSlider() {
  return (
    <Swiper
      injectStyles={paginationBulletStyles}
      slidesPerView={1}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return '<span className="' + className + '">' + index + "</span>";
        },
      }}
      initialSlide={2}
      className="h-full max-h-full w-full max-w-full"
    >
      {sliderProducts.map((product) => (
        <Swiper.Slide key={product.name}>
          <Image
            src={product.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
