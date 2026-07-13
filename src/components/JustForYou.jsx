"use client";
import Swiper from "@/components/Swiper";
import { useQuery } from "@tanstack/react-query";
import { productListOptions } from "../domains/catalog/products.query";
import Button from "./Button";
import ProductCard from "./ProductCard";
import SectionLabel from "./SectionLabel";
import Spinner from "./Spinner";

function JustForYou() {
  const relatedParams = {
    page: 1,
    limit: 4,
  };

  const { data, isLoading } = useQuery(productListOptions(relatedParams));

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (data?.products.length === 0) {
    return null;
  }

  return (
    <>
      <div className="for-you-head mb-10 flex items-center justify-between">
        <SectionLabel className="capitalize">just for you</SectionLabel>
        <Button
          as="link"
          href="/products"
          variant="secondary"
          className="float-right capitalize"
        >
          view all
        </Button>
      </div>
      <div className="section-slider for-you-body flex gap-7 overflow-x-visible">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
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
          }}
          className="h-full max-h-full w-full max-w-full"
        >
          {data?.products.map((product) => (
            <Swiper.Slide key={product.id}>
              <ProductCard product={product} />
            </Swiper.Slide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default JustForYou;
