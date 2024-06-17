"use client";

import Image from "next/image";
import Swiper from "./Swiper";
import image1 from "@/public/ksenia-chernaya.jpg";
import image2 from "@/public/clark-street-mercantile-unsplash.jpg";
import image3 from "@/public/alexander-kovacs-unsplash.jpg";
import image4 from "@/public/qin-fan-unsplash.jpg";
import martProduction from "@/public/mart-production.jpg";

const screen = {
  height: "100%",
  width: "100%",
  cursor: "pointer",
};

export default function SimpleSlider() {
  return (
    <Swiper slides-per-view="1" pagination="true" loop="true" initial-slide={2}>
      <Swiper.Slide>
        <Image
          src={image3}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-bottom"
          alt="A Product image"
        />
        {/* <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        /> */}
      </Swiper.Slide>
      <Swiper.Slide>
        <Image
          src={image2}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-bottom"
          alt="A Product image"
        />
      </Swiper.Slide>
      <Swiper.Slide>
        <Image
          src={image4}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-bottom"
          alt="A Product image"
        />
        {/* <img
          loading="lazy"
          src="https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        /> */}
      </Swiper.Slide>
      <Swiper.Slide>
        <Image
          src={martProduction}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-bottom"
          alt="A Product image"
        />
      </Swiper.Slide>
      <Swiper.Slide>
        <Image
          src={image1}
          fill
          placeholder="blur"
          quality={80}
          className="object-cover object-bottom"
          alt="A Product image"
        />
      </Swiper.Slide>
    </Swiper>
  );
}
