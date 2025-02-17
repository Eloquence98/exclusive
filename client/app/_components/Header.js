import GuestArea from "./GuestArea";
import LayoutPadding from "./LayoutPadding";
import Logo from "./Logo";
import Search from "./Search";
import StyledLink from "./StyledLink";

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
    name: "Login",
    href: "/login",
  },
];

function Header() {
  return (
    <LayoutPadding>
      <header className="flex h-23 items-end border-b border-border pb-4">
        <nav className="flex w-full items-center justify-between gap-4">
          <Logo />
          <div className="ml-8 mr-auto xl:hidden"> [Menu]</div>
          <div className="hidden items-center justify-center gap-12 xl:flex">
            {navLinks.map((navItem) => (
              <StyledLink key={navItem.name} item={navItem} />
            ))}
          </div>
          <div className="ml-auto">
            <Search />
          </div>
          <GuestArea className="ml-5" />
        </nav>
      </header>
    </LayoutPadding>
  );
}

export default Header;
