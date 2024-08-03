"use client";
import BestSellingProductSlider from "@/app/_components/BestSellingProductSlider";
import CategorySlider from "@/app/_components/CategorySlider";
import ExploreOurProducts from "@/app/_components/ExploreOurProducts";
import ProductSlider from "@/app/_components/ProductSlider";
import Showcase from "@/app/_components/Showcase";
import Hr from "@/app/_components/Hr";
import NewArival from "@/app/_components/NewArival";

export default function Home() {
  return (
    <>
      <Showcase />
      <section className="today's-sale mt-35">
        <ProductSlider />
      </section>
      <Hr />
      <section className="category">
        <CategorySlider />
      </section>
      <Hr />
      <section className="best-selling-product">
        <BestSellingProductSlider />
      </section>
      <section className="explore-our-products mt-15">
        <ExploreOurProducts />
      </section>
      <section className="new-arival mt-15">
        <NewArival />
      </section>
    </>
  );
}
