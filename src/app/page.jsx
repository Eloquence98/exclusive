import BestSellingProductSlider from "@/components/BestSellingProductSlider";
import CategorySlider from "@/components/CategorySlider";
import ExploreOurProducts from "@/components/ExploreOurProducts";
import Hero from "@/components/Hero";
import Hr from "@/components/Hr";
import InformationPanel from "@/components/InformationPanel";
import NewArival from "@/components/NewArival";
import ProductSlider from "@/components/ProductSlider";

export default function Home() {
  return (
    <>
      {/* <Showcase /> */}
      <Hero />
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
      <section className="our-services mt-15">
        <InformationPanel />
      </section>
    </>
  );
}
