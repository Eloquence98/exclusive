import Link from "next/link";
import { Suspense } from "react";
import LayoutPadding from "./LayoutPadding";
import ShowcaseSlider from "./ShowcaseSlider";
import Spinner from "./Spinner";

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

function SideNavigation() {
  return (
    <ul className="space-y-4">
      {sideNavigationItem.map((item) => (
        <li key={item} className="font-regular capitalize">
          <Link href="/">{item}</Link>
        </li>
      ))}
    </ul>
  );
}

function Showcase() {
  return (
    <LayoutPadding>
      <section className="grid grid-rows-1 xl:grid-cols-[14.5625em,1fr] h-96 ">
        <aside className="hidden xl:block sideNavigation pt-10 pr-4 border-r  border-border ">
          <SideNavigation />
        </aside>
        <div className="pt-10 xl:pl-11 overflow-hidden h-full w-full max-h-full max-w-full">
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <ShowcaseSlider />
          </Suspense>
        </div>
      </section>
    </LayoutPadding>
  );
}

export default Showcase;
