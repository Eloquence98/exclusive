import Button from "../_components/Button";
import JustForYou from "../_components/JustForYou";
import LayoutPadding from "../_components/LayoutPadding";
import WishlistSection from "../_components/WishlistSection";

export const metadata = {
  title: "Wishlist",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <WishlistSection />
        <div className="mt-15"></div>
        <JustForYou />
      </div>
    </LayoutPadding>
  );
}

export default page;
