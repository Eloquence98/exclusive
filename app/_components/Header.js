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
    name: "Sign Up ",
    href: "/signup",
  },
];

function Header() {
  return (
    <LayoutPadding>
      <header className="pb-4 h-23 border-b  border-border  flex items-end">
        <nav className="flex items-center justify-between w-full">
          <Logo />
          <div className="mr-auto ml-8 xl:hidden"> [Menu comes here]</div>
          <div className="hidden xl:flex items-center justify-center gap-12">
            {navLinks.map((navItem) => (
              <StyledLink key={navItem.name} item={navItem} />
            ))}
          </div>
          <div className="ml-4">
            <Search />
          </div>
        </nav>
      </header>
    </LayoutPadding>
  );
}

export default Header;
