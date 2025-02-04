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

export const productCategories = [
  {
    name: "T-Shirts",
    href: `/products`,
    query: "t-shirts",
    icon: <PiTShirtFill />,
  },
  { name: "Shirts", href: `/products`, query: "shirts", icon: <GiShirt /> },
  { name: "Polos", href: `/products`, query: "polos", icon: <GiPoloShirt /> },
  { name: "Jeans", href: `/products`, query: "jeans", icon: <PiPantsFill /> },
  { name: "Shorts", href: `/products`, query: "shorts", icon: <GiShorts /> },
  {
    name: "Trousers",
    href: `/products`,
    query: "trousers",
    icon: <GiTrousers />,
  },
  {
    name: "Activewear",
    href: `/products`,
    query: "activewear",
    icon: <GiUnderwearShorts />,
  },
  {
    name: "Fragrances",
    href: `/products`,
    query: "fragrances",
    icon: <GiFragrance />,
  },
  { name: "Shoes", href: `/products`, query: "shoes", icon: <GiSonicShoes /> },
  {
    name: "Accessories",
    href: `/products`,
    query: "accessories",
    icon: <GiSunglasses />,
  },
  {
    name: "Underwear",
    href: `/products`,
    query: "underwear",
    icon: <GiUnderwear />,
  },
];
