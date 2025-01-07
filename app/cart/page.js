import CartTable from "@/app/_components/CartTable";
import Button from "../_components/Button";
import CouponForm from "../_components/CouponForm";
import LayoutPadding from "../_components/LayoutPadding";
import { formatCurrency } from "../_utills/utility";

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

        <div className="forms grid grid-cols-1 grid-rows-[max-content_1fr] gap-4 xl:grid-cols-[1fr_29.375rem] xl:grid-rows-1 xl:gap-0">
          <CouponForm />

          {/* Cart items */}
          <div className="cart-total-items row-start-1 row-end-2 border border-discount px-6 py-8 xl:row-start-[unset] xl:row-end-[unset]">
            <h4 className="text-xl font-medium text-black">Cart total</h4>
            <div className="divide-y-[1px] divide-discount">
              <p className="py-4">
                Subtotal{" "}
                <span className="float-right">{formatCurrency(1750)}</span>
              </p>
              <p className="py-4">
                Shipping <span className="float-right">Free</span>
              </p>
              <p className="py-4">
                Total{" "}
                <span className="float-right">{formatCurrency(1750)}</span>
              </p>
            </div>
            <div className="w-full text-center">
              <Button>Process to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
