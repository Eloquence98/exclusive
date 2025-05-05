import BestSellingProductSlider from "@/components/BestSellingProductSlider";
import CategorySlider from "@/components/CategorySlider";
import ExploreOurProducts from "@/components/ExploreOurProducts";
import Hr from "@/components/Hr";
import InformationPanel from "@/components/InformationPanel";
import NewArival from "@/components/NewArival";
import ProductSlider from "@/components/ProductSlider";
import Showcase from "@/components/Showcase";

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
      <section className="our-services mt-15">
        <InformationPanel />
      </section>
    </>
  );
}
