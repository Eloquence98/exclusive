"use client";
import Link from "next/link";
import LayoutPadding from "./_components/LayoutPadding";
import SimpleSlider from "./_components/SimpleSlider";
import Swiper from "./_components/Swiper";

const sideNavigationItem = [
  "T-Shirts",
  "Polos",
  "Shirts",
  "Jeans",
  "Shorts",
  "Trousers",
  "Activewear",
  "Fragrances",
  "Shoes",
];

export default function Home() {
  return (
    <main>
      <LayoutPadding>
        <section className="grid grid-cols-[14.5625em,1fr] h-96 ">
          <aside className="sideNavigation pt-10 pr-4 border-r  border-border ">
            <ul className="space-y-4">
              {sideNavigationItem.map((item) => (
                <li key={item} className="font-regular capitalize">
                  <Link href="/">{item}</Link>
                </li>
              ))}
            </ul>
          </aside>
          <section className="pt-10 pl-11 overflow-hidden">
            <SimpleSlider />
            {/* <Swiper /> */}
          </section>
        </section>
      </LayoutPadding>
    </main>
  );
}
