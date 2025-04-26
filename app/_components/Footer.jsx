import Link from "next/link";
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
        <div className="flex flex-wrap items-start justify-center py-7">
          <div className="offer min-w-max flex-1">
            <FooterHeading>Exclusive</FooterHeading>
          </div>
          <div className="support min-w-max flex-1 space-y-2">
            <FooterHeading>Support</FooterHeading>
            <FooterParagraph>111 Bijoy sarani, Dhaka,</FooterParagraph>
            <FooterParagraph> DH 1515, Bangladesh. </FooterParagraph>
            <FooterParagraph>exclusive@gmail.com</FooterParagraph>
            <FooterParagraph>+88015-88888-9999</FooterParagraph>
          </div>
          {footerLinksContent.map((linksContent, i) => (
            <FooterContent
              key={`${linksContent.heading}-${i}`}
              myKey={`${linksContent.heading}-${i}`}
              content={linksContent}
            />
          ))}
          <div className="download min-w-max flex-1">
            <FooterHeading>Download</FooterHeading>
          </div>
        </div>
      </LayoutPadding>
      <p className="copyright text-center text-xs text-text-two">
        {" "}
        &copy; Copyright Exclusive {year}. All right reserved{" "}
      </p>
    </footer>
  );
}

export default Footer;

function FooterContent({ content, myKey }) {
  const { heading, items } = content;
  return (
    <div
      key={myKey}
      className="flex min-w-max flex-1 flex-col items-start justify-center space-y-2"
    >
      <FooterHeading> {heading} </FooterHeading>
      {items.map((item, i) => (
        <>
          <Link
            className="text-xs capitalize text-text-one"
            href={item?.href}
            key={`${item.name}-${i}`}
          >
            {item.name}
          </Link>
        </>
      ))}
    </div>
  );
}

function FooterHeading({ children, className }) {
  return (
    <h2 className={`${className} text-lg font-medium capitalize`}>
      {" "}
      {children}{" "}
    </h2>
  );
}

function FooterParagraph({ children, className }) {
  return <h2 className={`${className} text-xs text-text-one`}> {children} </h2>;
}
