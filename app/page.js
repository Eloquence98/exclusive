import ProductSlider from "@/app/_components/ProductSlider";
import Showcase from "@/app/_components/Showcase";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function Home() {
  // const res = await fetch("https://fakestoreapi.com/products?limit=10");
  // const res = await fetch(
  //   "https://fakestoreapi.com/products/category/men's clothing",
  // );
  // if (!res.ok) console.log("500 server could not send anything");

  // const data = await res.json();

  // console.log(data);

  return (
    <main className="overflow-x-hidden">
      <Showcase />
      {/* Today's Sale */}
      <section className="mt-35">
        {/* <LayoutPadding>
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
            <div className="section-slider flex gap-7">
              <ProductSlider tempProducts={tempProducts} />
            </div>
          </div>
        </LayoutPadding> */}
        <ProductSlider />
      </section>
    </main>
  );
}
