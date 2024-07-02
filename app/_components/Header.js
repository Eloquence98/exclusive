import LayoutPadding from "./LayoutPadding";
import Logo from "./Logo";
import Search from "./Search";
import StyledLink from "./StyledLink";
import { auth } from "../_lib/auth";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Sign Up ",
    href: "/signup",
  },
];

async function Header() {
  // this will makee the route dynamic it's reading the headers and currently the header is being used in every route so all the routes are dynamic
  const session = await auth();
  return (
    <LayoutPadding>
      <header className="flex h-23 items-end border-b border-border pb-4">
        <nav className="flex w-full items-center justify-between">
          <Logo />
          <div className="ml-8 mr-auto xl:hidden"> [Menu comes here]</div>
          <div className="hidden items-center justify-center gap-12 xl:flex">
            {navLinks.map((navItem) => (
              <StyledLink key={navItem.name} item={navItem} />
            ))}
          </div>
          <div className="ml-4">
            <Search />
          </div>
          {/* User */}
          {session?.user?.image ? (
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-8 rounded-full"
                src={session?.user?.image}
                alt="User Google Avatart"
                referrerPolicy="no-referrer"
              />
            </Link>
          ) : null}
        </nav>
      </header>
    </LayoutPadding>
  );
}

export default Header;
