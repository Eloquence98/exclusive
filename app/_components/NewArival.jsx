"use client";
import sideImage from "@/public/side-image.png";
import imageTwo from "@/public/tembela-bohle.jpg";
import imageThree from "@/public/clark-street-mercantile-unsplash.jpg";
import imageFour from "@/public/qin-fan-unsplash.jpg";
import { Inter } from "next/font/google";
import LayoutPadding from "./LayoutPadding";
import ProductShowcaseCard from "./ProductShowcaseCard";
import SectionLabel from "./SectionLabel";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function NewArival() {
  const product1 = {
    title: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    id: 1,
    image: sideImage,
  };

  const product2 = {
    title: "Xbox Series X",
    description: "The latest Xbox console with 4K gaming capabilities.",
    id: 2,
    image: imageTwo,
  };

  const product3 = {
    title: "Nintendo Switch OLED",
    description: "Enhanced OLED screen for the portable Nintendo Switch.",
    id: 3,
    image: imageThree,
  };

  const product4 = {
    title: "Apple iPad Pro",
    description: "The new iPad Pro with M2 chip and improved display.",
    id: 4,
    image: imageFour,
  };

  const product5 = {
    title: "Samsung Galaxy S23",
    description: "The newest Galaxy phone with cutting-edge features and design.",
    id: 5,
    image: imageFour,
  };

  return (
    <LayoutPadding>
      <div className="section-wrapper">
        <div className="section-stats mb-10 flex min-h-25 gap-22">
          <div className="headings flex flex-col justify-between capitalize">
            <SectionLabel>featured</SectionLabel>
            <h2 className={`${inter.className} text-nowrap text-4xl font-semibold`}>new arival</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 grid-rows-[repeat(2,_300px)] gap-8 md:grid-cols-2 md:grid-rows-[repeat(2,_400px)] lg:h-[600px] lg:grid-cols-[1fr_0.5fr_0.5fr] lg:grid-rows-2 xl:grid-cols-[1fr_0.5fr_0.5fr] xl:grid-rows-2">
          <ProductShowcaseCard className="lg:row-span-2 xl:row-span-2" product={product1} />
          <ProductShowcaseCard className="lg:col-span-2 xl:col-span-2" product={product2} />
          <ProductShowcaseCard
            className="hidden md:col-span-2 md:block xl:col-span-1"
            product={product3}
          />
          <ProductShowcaseCard className="hidden xl:block" product={product4} />
        </div>
      </div>
    </LayoutPadding>
  );
}

export default NewArival;
