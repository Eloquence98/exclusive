"use client";
import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";

register();

const screen = {
  height: "100%",
  width: "100%",
  cursor: "pointer",
};

export default function Swiper(props) {
  const swiperElRef = useRef(null);
  const [ismounted, setIsMounted] = useState(false);
  const { children, ...rest } = props;

  useEffect(() => {
    const swiperEl = swiperElRef.current;

    // const handleSwiperProgress = (e) => {
    //   const [swiper, progress] = e.detail;
    //   // console.log(progress);
    // };

    // const handleSwiperSlideChange = (e) => {
    //   console.log("slide changed");
    // };

    // swiperEl.addEventListener("swiperprogress", handleSwiperProgress);
    // swiperEl.addEventListener("swiperslidechange", handleSwiperSlideChange);

    // return () => {
    //   swiperEl.removeEventListener("swiperprogress", handleSwiperProgress);
    //   swiperEl.removeEventListener(
    //     "swiperslidechange",
    //     handleSwiperSlideChange
    //   );
    // };

    const params = {
      injectStyles: [
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
      ],
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + index + "</span>";
        },
      },
    };

    // can not assign undefined to object
    if (swiperEl) Object?.assign(swiperEl, params);

    swiperEl?.initialize();
  }, [rest]);

  useEffect(function () {
    setIsMounted(true);
  }, []);

  if (!ismounted) return null;

  return (
    <swiper-container
      init="false"
      ref={swiperElRef}
      {...rest}
      style={{
        height: "100%",
        width: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      {children}
    </swiper-container>
  );
}

function Slide(props) {
  const { children, ...rest } = props;

  return (
    <swiper-slide
      {...rest}
      style={{
        height: "100%",
        width: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      {children}
    </swiper-slide>
  );
}

Swiper.Slide = Slide;
