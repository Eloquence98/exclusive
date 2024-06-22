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
  const { children, pagination, breakProp, overflow, ...rest } = props;

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

  const styles = [commonStyles + (overflow ? overflowStyles : "")];

  useEffect(() => {
    const swiperElement = swiperElRef.current;
    const params = {
      injectStyles: styles,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
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
  const { swiperElRef } = useContext(SwiperModalContext);

  return (
    <SliderNavigationButton
      classes="swiper-button-prev"
      // onClick={() => {
      //   swiperElRef.current.swiper.slidePrev();
      // }}
    >
      <ArrowLeftIcon />
    </SliderNavigationButton>
  );
}

function NextButton() {
  const { swiperElRef } = useContext(SwiperModalContext);
  return (
    <SliderNavigationButton
      classes="swiper-button-next"
      // onClick={() => {
      //   swiperElRef.current.swiper.slideNext();
      // }}
    >
      <ArrowRightIcon />
    </SliderNavigationButton>
  );
}

function SliderNavigationButton({ classes, children, onClick }) {
  return (
    <button
      className={`${classes} flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black focus:ring-2 focus:ring-secondary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
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
