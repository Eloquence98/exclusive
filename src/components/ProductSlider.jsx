"use client";
import ProductCard from "@/components/ProductCard";
import SliderSection from "@/components/SliderSection";
import Swiper from "@/components/Swiper";
import { getSaleProducts } from "@/lib/data-service";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const OverflowStyles = `.swiper {
  overflow: visible !important;
}`;

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSaleProducts(8)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <SliderSection
      className="!overflow-x-hidden"
      subHeading="today's"
      heading="flash sales"
      href="/products?onSale=true"
      countDown={{ isNeeded: true, props: { hours: 25 } }}
      category={false}
      navigateButtons={true}
      data={products}
      sliderProps={{
        injectStyles: [OverflowStyles],
        navigation: {
          nextEl: ".sale-button-next",
          prevEl: ".sale-button-prev",
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
      render={(product) => (
        <Swiper.Slide key={product.id}>
          <ProductCard product={product} />
        </Swiper.Slide>
      )}
    />
  );
}

export default ProductSlider;