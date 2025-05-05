"use client";
import Image from "next/image";
import Swiper from "./Swiper";

const sliderProducts = [
  {
    name: "image one",
    image: "/alexander-kovacs-unsplash.jpg",
    alt: "A showcase product image"
  },
  {
    name: "image two",
    image: "/clark-street-mercantile-unsplash.jpg",
    alt: "A showcase product image"
  },
  {
    name: "image three",
    image: "/ksenia-chernaya.jpg",
    alt: "A showcase product image"
  },
  {
    name: "image four",
    image: "/qin-fan-unsplash.jpg",
    alt: "A showcase product image"
  },
  {
    name: "image five",
    image: "/mart-production.jpg",
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
            priority
            className="object-cover object-center"
            alt={product.alt}
          />
        </Swiper.Slide>
      ))}
    </Swiper>
  );
}
