import Button from "../_components/Button";
import JustForYou from "../_components/JustForYou";
import LayoutPadding from "../_components/LayoutPadding";

export const metadata = {
  title: "Wishlist",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <div className="wishlist">
          <div className="wishlist-head flex items-center justify-between">
            <h3 className="text-regular relative leading-9 text-black">
              Wishlist [4]
            </h3>
            <Button
              as="link"
              href="/cart"
              variant="secondary"
              className="float-right capitalize"
            >
              Move all to bag
            </Button>
          </div>
          <div className="wishlist-body">them items goes here</div>
        </div>

        <JustForYou />
      </div>
    </LayoutPadding>
  );
}

export default page;
