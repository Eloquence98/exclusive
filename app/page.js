"use client";
import BestSellingProductSlider from "@/app/_components/BestSellingProductSlider";
import CategorySlider from "@/app/_components/CategorySlider";
import LayoutPadding from "@/app/_components/LayoutPadding";
import ProductSlider from "@/app/_components/ProductSlider";
import Showcase from "@/app/_components/Showcase";
import ExploreOurProducts from "@/app/_components/ExploreOurProducts";
import Swiper from "./_components/Swiper";
import NewArival from "./_components/NewArival";

export default function Home() {
  return (
    <>
      <Showcase />
      {/* Today's Sale */}
      <section className="sale mt-35">
        <ProductSlider />
      </section>
      <Hr />
      {/* Categories */}
      <section className="category">
        <CategorySlider />
      </section>
      <Hr />
      {/* Best Selling product */}
      <section className="best-selling-product">
        <BestSellingProductSlider />
      </section>
      {/* use this 15 for now */}
      <section className="explore-our-products mt-15">
        <ExploreOurProducts />
      </section>
      {/* new arival */}
      <section className="new-arival mt-15">
        <NewArival />
      </section>
    </>
  );
}

function Hr() {
  return (
    <LayoutPadding>
      <div className="hr">
        <hr className="my-15 h-[0.5px] border-0 bg-border" />
      </div>
    </LayoutPadding>
  );
}
