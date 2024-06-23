"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import SliderNavigationButton from "./SliderNavigationButton";

register();

function Swiper(props) {
  const swiperRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const { children, ...rest } = props;

  useEffect(
    function () {
      setIsMounted(true);
    },
    [setIsMounted],
  );

  useEffect(() => {
    if (!isMounted) return;
    const params = {
      ...rest,
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, [isMounted, rest]);

  if (!isMounted) return null;

  return (
    <swiper-container init="false" ref={swiperRef}>
      {children}
    </swiper-container>
  );
}
export function Slide(props) {
  const { children, ...rest } = props;

  return (
    <swiper-slide
      {...rest}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </swiper-slide>
  );
}

function PrevButton({ className }) {
  return <SliderNavigationButton classes={`swiper-button-prev ${className}`} />;
}

function NextButton({ className }) {
  return (
    <SliderNavigationButton next classes={`swiper-button-next ${className}`} />
  );
}

Swiper.Slide = Slide;
Swiper.Prev = PrevButton;
Swiper.Next = NextButton;

export default Swiper;
