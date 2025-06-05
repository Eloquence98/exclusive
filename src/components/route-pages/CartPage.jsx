"use client";
import Button from "@/components/Button";
import CartCheckoutStats from "@/components/CartCheckoutStats";
import CartTable from "@/components/CartTable";
import CouponForm from "@/components/CouponForm";
import LayoutPadding from "@/components/LayoutPadding";
import { useCart } from "@/hooks/CartProvider";
import { useRouter } from "next/navigation";

  function CartPage() {
    const { cart, getCartTotal } = useCart();
    const router = useRouter();
    const isEmpty = !cart?.items || cart.items.length === 0;

    const handleReturnToShop = () => {
      router.push("/products");
    };

    const handleCheckout = () => {
      router.push("/checkout");
    };

    return (
      <LayoutPadding>
        <div className="mt-15">
          <CartTable />
          
          {!isEmpty && (
            <>
              <div className="mb-20 mt-6 flex items-center justify-between">
                <Button variant="secondary" onClick={handleReturnToShop}>
                  Return to shop
                </Button>
                <Button variant="secondary">update cart</Button>
              </div>

              <div className="forms grid grid-cols-1 grid-rows-[max-content_1fr] gap-4 xl:grid-cols-[1fr_29.375rem] xl:grid-rows-1 xl:gap-0">
                <CouponForm />

                {/* Cart items */}
                <div className="cart-total-items row-start-1 row-end-2 border border-discount px-6 py-8 xl:row-start-[unset] xl:row-end-[unset]">
                  <h4 className="text-xl font-medium text-black">Cart total</h4>

                  <CartCheckoutStats stats={{ subTotal: getCartTotal(), shipping: 0 }} />

                  <div className="w-full text-center">
                    <Button onClick={handleCheckout}>Process to Checkout</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </LayoutPadding>
    );
  }

  export default CartPage;
