import Link from "next/link";
import LayoutPadding from "./_components/LayoutPadding";
import SimpleSlider from "./_components/ShowcaseSlider";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";
import Showcase from "./_components/Showcase";

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
      <Showcase />
    </main>
  );
}
