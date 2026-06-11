"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/data-service";
import ProductCard from "@/components/ProductCard";
import SliderSection from "@/components/SliderSection";
import Swiper from "@/components/Swiper";
import Spinner from "./Spinner";

const exploreProductStyles = `.swiper {
    height: 50rem;
  }`;

function ExploreOurProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ limit: 16 })
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

  // Split the data into two arrays for grid layout
  const half = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, half);
  const secondHalf = products.slice(half);

  return (
    <SliderSection
      subHeading="our products"
      heading="explore our products"
      href="/products"
      countDown={{ isNeeded: false, props: null }}
      category={false}
      navigateButtons={true}
      data={firstHalf}
      sliderProps={{
        injectStyles: [exploreProductStyles],
        navigation: {
          nextEl: ".explore-products-button-next",
          prevEl: ".explore-products-button-prev",
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
      render={(product, i) => (
        <Swiper.Slide key={product.id}>
          <div className="grid h-full grid-cols-1 gap-4">
            <ProductCard product={product} />
            {secondHalf[i] && <ProductCard product={secondHalf[i]} />}
          </div>
        </Swiper.Slide>
      )}
    />
  );
}

export default ExploreOurProducts;