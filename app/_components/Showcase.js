import { Suspense } from "react";
import LayoutPadding from "@/app/_components/LayoutPadding";
import ShowcaseSlider from "@/app/_components/ShowcaseSlider";
import Spinner from "@/app/_components/Spinner";
import Link from "next/link";

export const sideNavigationItem = [
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
      <section className="grid h-96 grid-rows-1 xl:grid-cols-[14.5625em,1fr]">
        <aside className="sideNavigation hidden border-r border-border pr-4 pt-10 xl:block">
          <SideNavigation />
        </aside>
        <div className="h-full max-h-full w-full max-w-full overflow-hidden pt-10 xl:pl-11">
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
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
