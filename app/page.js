import {
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline";

import controller from "@/public/controller.png";
import Countdown from "./_components/CountDown";
import LayoutPadding from "./_components/LayoutPadding";
import Showcase from "./_components/Showcase";

import { Inter } from "next/font/google";
import Image from "next/image";

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
          <div className="test">
            <div className="section-stats mb-10 flex min-h-25 gap-22">
              <div className="headings flex flex-col justify-between">
                <h3 className="text-regular relative pl-9 font-semibold leading-9 text-primary">
                  <span className="absolute left-0 top-0 inline-block h-full w-5 rounded bg-primary"></span>
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
              <div className="card space-y-2">
                <div className="image relative flex h-[15.625rem] w-[16.875em] items-center justify-center rounded bg-secondary">
                  <Image
                    src={controller}
                    quality={90}
                    height={180}
                    width={190}
                    className="object-cover object-center"
                    alt="Controller image"
                  />
                  <div className="absolute left-3 top-3 rounded bg-primary px-3 py-1 text-xs text-white">
                    <p>-10%</p>
                  </div>
                  <div className="absolute right-3 top-3 space-y-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                      <HeartIcon className="h-5 w-5" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="font-medium">HAVIT HV-G92 Gamepad</p>
                <p className="font-medium text-primary">
                  $120 {"   "}
                  <span className="ml-2 text-discount line-through">
                    {" "}
                    $160
                  </span>{" "}
                </p>
                <div className="ratings flex items-end space-x-2">
                  <StarIcon className="fill-rating-rated" />
                  <StarIcon className="fill-rating-rated" />
                  <StarIcon className="fill-rating-rated" />
                  <StarIcon className="fill-rating-rated" />
                  <StarIcon className="fill-rating-not-rated" />
                  {/* Var totalRanking */}
                  <p className="text-sm font-semibold text-discount">(87)</p>
                </div>
              </div>
            </div>
          </div>
        </LayoutPadding>
      </section>
    </main>
  );
}
