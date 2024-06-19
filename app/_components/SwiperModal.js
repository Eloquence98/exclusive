"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { register } from "swiper/element/bundle";

register();

const SwiperModalContext = createContext();

function SwiperModal({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const swiperElRef = useRef(null);

  const contextValue = useMemo(
    () => ({
      isMounted,
      setIsMounted,
      swiperElRef,
    }),
    [isMounted],
  );

  return (
    <SwiperModalContext.Provider value={contextValue}>
      {children}
    </SwiperModalContext.Provider>
  );
}

function Swiper(props) {
  const { isMounted, setIsMounted, swiperElRef } =
    useContext(SwiperModalContext);
  const { children, pagination, breakProp, ...rest } = props;

  useEffect(() => {
    const swiperElement = swiperElRef.current;
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
      ...(pagination && {
        pagination: {
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}">${index}</span>`,
        },
      }),
      ...(breakProp && {
        breakpoints: {
          570: { slidesPerView: 2 },
          970: { slidesPerView: 3 },
          1024: { slidesPerView: 2 },
          1140: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        },
      }),
    };

    if (swiperElement) Object.assign(swiperElement, params);

    swiperElement?.initialize();
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
        maxHeight: "100%",
        maxWidth: "100%",
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
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      {children}
    </swiper-slide>
  );
}

function PrevButton() {
  const { swiperElRef } = useContext(SwiperModalContext);

  return (
    <SliderNavigationButton
      onClick={() => swiperElRef.current.swiper.slidePrev()}
    >
      <ArrowLeftIcon />
    </SliderNavigationButton>
  );
}

function NextButton() {
  const { swiperElRef } = useContext(SwiperModalContext);
  return (
    <SliderNavigationButton
      onClick={() => {
        swiperElRef.current.swiper.slideNext();
      }}
    >
      <ArrowRightIcon />
    </SliderNavigationButton>
  );
}

function SliderNavigationButton({ children, onClick }) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black focus:ring-2 focus:ring-secondary focus:ring-offset-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Swiper.Slide = Slide;
Swiper.Prev = PrevButton;
Swiper.Next = NextButton;
SwiperModal.Swiper = Swiper;
export default SwiperModal;
