import CartTable from "@/app/_components/CartTable";
import Button from "../_components/Button";
import CouponForm from "../_components/CouponForm";
import LayoutPadding from "../_components/LayoutPadding";

export const metadata = {
  title: "Cart",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <CartTable />
        <div className="mb-20 mt-6 flex items-center justify-between">
          <Button variant="secondary">Return to shop</Button>
          <Button variant="secondary">update cart</Button>
        </div>

        <div className="forms">
          <CouponForm />
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
