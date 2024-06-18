import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

import Countdown from "./_components/CountDown";
import LayoutPadding from "./_components/LayoutPadding";
import Showcase from "./_components/Showcase";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main>
      <Showcase />
      {/* Today's Sale */}
      <section className="mt-35">
        <LayoutPadding>
          <div className="section-stats">
            <div className="min-h-25 flex gap-22">
              <div className="headings flex flex-col justify-between">
                <h3 className="relative leading-9 text-regular font-semibold text-primary pl-9">
                  <span className="absolute top-0 left-0  h-full w-5 bg-primary rounded inline-block"></span>
                  Today&apos;s
                </h3>
                <h2 className={`${inter.className} text-4xl font-semibold`}>
                  {" "}
                  Flash Sales
                </h2>
              </div>
              <div className="mt-auto">
                <Countdown hours={25} />
              </div>
              <div className="buttons ml-auto mt-auto flex justify-center items-center gap-2">
                <button className="bg-secondary text-black w-11 h-11 flex items-center justify-center rounded-full">
                  <ArrowLeftIcon />
                </button>
                <button className="bg-secondary text-black w-11 h-11 flex items-center justify-center rounded-full">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </LayoutPadding>
      </section>
    </main>
  );
}
