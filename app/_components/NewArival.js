"use client";
import sideImage from "@/public/side-image.png";
import imageTwo from "@/public/tembela-bohle.jpg";
import imageThree from "@/public/clark-street-mercantile-unsplash.jpg";
import imageFour from "@/public/qin-fan-unsplash.jpg";
import { Inter } from "next/font/google";
import LayoutPadding from "./LayoutPadding";
import ProductShowcaseCard from "./ProductShowcaseCard";

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
    description:
      "The newest Galaxy phone with cutting-edge features and design.",
    id: 5,
    image: imageFour,
  };

  return (
    <LayoutPadding>
      <div className="section-wrapper">
        <div className="section-stats mb-10 flex min-h-25 gap-22">
          <div className="headings flex flex-col justify-between capitalize">
            <h3 className="text-regular relative pl-9 font-semibold leading-9 text-primary">
              <span className="absolute left-0 top-0 inline-block h-full w-5 rounded bg-primary"></span>
              featured
            </h3>
            <h2
              className={`${inter.className} text-nowrap text-4xl font-semibold`}
            >
              new arival
            </h2>
          </div>
        </div>

        <div className="grid h-[600px] grid-cols-[1fr_0.5fr_0.5fr] grid-rows-2 gap-8">
          <ProductShowcaseCard className="row-span-2" product={product1} />
          <ProductShowcaseCard className="col-span-2" product={product2} />
          <ProductShowcaseCard product={product3} />
          <ProductShowcaseCard product={product4} />
        </div>
      </div>
    </LayoutPadding>
  );
}

export default NewArival;
