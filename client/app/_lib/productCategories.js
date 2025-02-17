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
    pathname: `/products`,
    query: "t-shirts",
    icon: <PiTShirtFill />,
  },
  { name: "Shirts", pathname: `/products`, query: "shirts", icon: <GiShirt /> },
  {
    name: "Polos",
    pathname: `/products`,
    query: "polos",
    icon: <GiPoloShirt />,
  },
  {
    name: "Jeans",
    pathname: `/products`,
    query: "jeans",
    icon: <PiPantsFill />,
  },
  {
    name: "Shorts",
    pathname: `/products`,
    query: "shorts",
    icon: <GiShorts />,
  },
  {
    name: "Trousers",
    pathname: `/products`,
    query: "trousers",
    icon: <GiTrousers />,
  },
  {
    name: "Activewear",
    pathname: `/products`,
    query: "activewear",
    icon: <GiUnderwearShorts />,
  },
  {
    name: "Fragrances",
    pathname: `/products`,
    query: "fragrances",
    icon: <GiFragrance />,
  },
  {
    name: "Shoes",
    pathname: `/products`,
    query: "shoes",
    icon: <GiSonicShoes />,
  },
  {
    name: "Accessories",
    pathname: `/products`,
    query: "accessories",
    icon: <GiSunglasses />,
  },
  {
    name: "Underwear",
    pathname: `/products`,
    query: "underwear",
    icon: <GiUnderwear />,
  },
];
