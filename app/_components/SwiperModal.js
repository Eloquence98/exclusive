"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import SliderNavigationButton from "./SliderNavigationButton";

register();

const commonStyles = `
.swiper-pagination-bullet {
    height: 8px;
    text-align: center;
    line-height: 8px;
    font-size: 0px !important;
    color: #000;
    opacity: 1;
    background: rgba(128, 128, 128, 1);
    width: 8px;
}
.swiper-pagination-bullet-active {
    background: #db4444;
    border: 2px solid #fff;
    color: #fff;
}
`;

const overflowStyles = `
.swiper {
    overflow: visible !important;
}
`;

function Swiper(props) {
  const [isMounted, setIsMounted] = useState(false);
  const swiperElRef = useRef(null);
  const { children, pagination, breakProp, navigation, overflow, ...rest } =
    props;

  const styles = [commonStyles + (overflow ? overflowStyles : "")];

  useEffect(() => {
    const swiperElement = swiperElRef.current;
    const params = {
      injectStyles: styles,
      navigation,
      ...(pagination && {
        pagination: {
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">${index}</span>`,
        },
      }),
      ...(breakProp && {
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
      }),
    };

    if (swiperElement) Object.assign(swiperElement, params);

    swiperElement?.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, breakProp, swiperElRef, rest]);

  useEffect(
    function () {
      setIsMounted(true);
    },
    [setIsMounted],
  );

  if (!isMounted) return null;

  return (
    <swiper-container
      init="false"
      ref={swiperElRef}
      {...rest}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {children}
    </swiper-container>
  );
}

function Slide({ children, ...rest }) {
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

function PrevButton() {
  return <SliderNavigationButton classes="swiper-button-prev" />;
}

function NextButton() {
  return <SliderNavigationButton next classes="swiper-button-next" />;
}

Swiper.Slide = Slide;
Swiper.Prev = PrevButton;
Swiper.Next = NextButton;

export default Swiper;
