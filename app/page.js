import BestSellingProductSlider from "@/app/_components/BestSellingProductSlider";
import CategorySlider from "@/app/_components/CategorySlider";
import LayoutPadding from "@/app/_components/LayoutPadding";
import ProductSlider from "@/app/_components/ProductSlider";
import Showcase from "@/app/_components/Showcase";

export default async function Home() {
  return (
    <main className="overflow-x-hidden">
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
    </main>
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
