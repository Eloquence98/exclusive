"use client";
import ProductCard from "@/components/ProductCard";
import SliderSection from "@/components/SliderSection";
import Swiper from "@/components/Swiper";
import { getBestSellingProducts } from "@/lib/data-service";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

function BestSellingProductSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBestSellingProducts(4)
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
      subHeading="this month"
      heading="best selling products"
      href="/products?sort=-ratingsQuantity"
      countDown={{ isNeeded: false, props: null }}
      category={false}
      navigateButtons={false}
      data={products}
      sliderProps={{
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

export default BestSellingProductSlider;