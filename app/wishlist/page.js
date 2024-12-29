import Button from "../_components/Button";
import LayoutPadding from "../_components/LayoutPadding";
import SectionLabel from "../_components/SectionLabel";

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

        <div styleName="for-you">
          <div className="for-you-head">
            <SectionLabel className="capitalize"> just for you </SectionLabel>
          </div>
          <div className="for-you-body"> them items goes here</div>
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
