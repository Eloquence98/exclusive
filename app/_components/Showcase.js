import { Suspense } from "react";
import LayoutPadding from "@/app/_components/LayoutPadding";
import ShowcaseSlider from "@/app/_components/ShowcaseSlider";
import Spinner from "@/app/_components/Spinner";
import Link from "next/link";
import {
  GiShirt,
  GiPoloShirt,
  GiShorts,
  GiTrousers,
  GiBallerinaShoes,
  GiSonicShoes,
  GiUnderwearShorts,
  GiUnderwear,
  GiFragrance,
  GiSunglasses,
  GiSocks,
} from "react-icons/gi";
import { PiPantsFill, PiTShirtFill } from "react-icons/pi";

export const sideNavigationItem = [
  { name: "T-Shirts", icon: <PiTShirtFill /> },
  { name: "Shirts", icon: <GiShirt /> },
  { name: "Polos", icon: <GiPoloShirt /> },
  { name: "Jeans", icon: <PiPantsFill /> },
  { name: "Shorts", icon: <GiShorts /> },
  { name: "Trousers", icon: <GiTrousers /> },
  { name: "Activewear", icon: <GiUnderwearShorts /> },
  { name: "Fragrances", icon: <GiFragrance /> },
  { name: "Shoes", icon: <GiSonicShoes /> },
  { name: "Accessories", icon: <GiSunglasses /> },
  { name: "Underwear", icon: <GiUnderwear /> },
];

function SideNavigation() {
  return (
    <ul className="space-y-4">
      {sideNavigationItem.map(({ name, icon }) => (
        <li key={name} className="font-regular capitalize">
          <Link href="/">{name}</Link>
        </li>
      ))}
    </ul>
  );
}

function Showcase() {
  return (
    <LayoutPadding>
      <section className="grid h-99 grid-rows-1 xl:grid-cols-[14.5625em,1fr]">
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
