import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

import controller from "@/public/controller.png";
import Countdown from "./_components/CountDown";
import LayoutPadding from "./_components/LayoutPadding";
import Showcase from "./_components/Showcase";

import { Inter } from "next/font/google";
import ProductCard from "./_components/ProductCard";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// TODO: Fetch
const product = {
  image: controller,
  name: "HAVIT HV-G92 Gamepad",
  price: 160,
  discount: 40,
  ratings: {
    total: 87,
    dislikes: 15,
  },
};

export default function Home() {
  return (
    <main>
      <Showcase />
      {/* Today's Sale */}
      <section className="mt-35">
        <LayoutPadding>
          <div className="test">
            <div className="section-stats mb-10 flex min-h-25 gap-22">
              <div className="headings flex flex-col justify-between">
                <h3 className="text-regular relative pl-9 font-semibold leading-9 text-primary">
                  <span className="absolute left-0 top-0 inline-block h-full w-5 rounded bg-primary"></span>
                  Today&apos;s
                </h3>
                <h2
                  className={`${inter.className} text-nowrap text-4xl font-semibold`}
                >
                  {" "}
                  Flash Sales
                </h2>
              </div>
              <div className="mt-auto">
                <Countdown hours={25} />
              </div>
              <div className="ml-auto mt-auto flex items-center justify-center gap-2">
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black">
                  <ArrowLeftIcon />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-black">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
            <div className="section-slider">
              <ProductCard product={product} />
            </div>
          </div>
        </LayoutPadding>
      </section>
    </main>
  );
}
