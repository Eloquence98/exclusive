import LayoutPadding from "./LayoutPadding";
import StyledLink from "./StyledLink";

const footerLinksContent = [
  {
    heading: "account",
    items: [
      { href: "/account", name: "my account" },
      { href: "/signup", name: "login / register" },
      { href: "/cart", name: "cart" },
      { href: "/wishlist", name: "shop" },
    ],
  },
  {
    heading: "quick links",
    items: [
      { href: "/privacy-policy", name: "privacy policy" },
      { href: "/terms", name: "terms of use" },
      { href: "/faq", name: "faq" },
      { href: "/contact", name: "contact" },
    ],
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black py-4 text-sm text-text-one">
      <LayoutPadding>
        <div className="flex flex-wrap items-center justify-center py-7">
          <div className="offer min-w-max flex-1">
            <h2>Exclusive</h2>
          </div>
          <div className="support min-w-max flex-1">
            <h2>Support</h2>
          </div>
          {footerLinksContent.map((linksContent, i) => (
            <FooterContent key={i} content={linksContent} />
          ))}
          <div className="download min-w-max flex-1">
            <h2>Download</h2>
          </div>
        </div>
      </LayoutPadding>
      <p className="copyright text-center text-sm text-text-two">
        {" "}
        &copy; Copyright Exclusive {year}. All right reserved{" "}
      </p>
    </footer>
  );
}

export default Footer;

function FooterContent({ content }) {
  const { heading, items } = content;
  return (
    <div className="flex min-w-max flex-1 flex-col items-start justify-center">
      <h2> {heading} </h2>
      {items.map((item, i) => (
        <StyledLink item={item} key={i} />
      ))}
    </div>
  );
}
