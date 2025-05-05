import Button from "@/components/Button";
import JustForYou from "@/components/JustForYou";
import LayoutPadding from "@/components/LayoutPadding";
import WishlistSection from "@/components/WishlistSection";

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
