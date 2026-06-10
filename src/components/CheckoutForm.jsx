"use client";

import { useRouter } from "next/navigation";
import { Radio, RadioGroup } from "@heroui/react";
import { createOrderAction } from "@/lib/actions";
import { useError } from "@/utils/useError";
import Button from "@/components/Button";
import { useCart } from "@/hooks/CartProvider";

function CheckoutForm({ className = "", shippingAddress }) {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [paymentMethodError, setPaymentMethodError] = useError();

  async function handleSubmit(formData) {
    // Client side validation for UX
    const paymentMethod = formData.get("paymentMethod");

    if (!paymentMethod) {
      setPaymentMethodError("Please select a payment method");
      return;
    }

    if (!shippingAddress) {
      setPaymentMethodError("Please fill in shipping address");
      return;
    }

    if (cart.length === 0) {
      setPaymentMethodError("Your cart is empty");
      return;
    }

    // Add cart and shipping data to formData
    formData.append("cartData", JSON.stringify(cart));
    formData.append("shippingData", JSON.stringify(shippingAddress));

    try {
      // Server Action
      const result = await createOrderAction(formData);
      
      // Clear cart on success
      clearCart();

      // Redirect to success page
      router.push(`/orders/success?orderNumber=${result.orderNumber}`);
    } catch (error) {
      // Show error from server
      setPaymentMethodError(error.message);
    }
  }

  return (
    <form className={`${className} checkout-form w-full`} noValidate action={handleSubmit}>
      <RadioGroup
        color="primary"
        name="paymentMethod"
        className="w-full"
        isRequired
        errorMessage={paymentMethodError}
        onValueChange={() => setPaymentMethodError("")}
      >
        <Radio value="cash-on-delivery">Cash on Delivery</Radio>
        <Radio value="bank" isDisabled>
          Bank Transfer (Coming Soon)
        </Radio>
      </RadioGroup>

      {paymentMethodError && !paymentMethodError.includes("payment method") && (
        <div className="mt-2 rounded bg-red-50 p-3 text-sm text-red-600">
          {paymentMethodError}
        </div>
      )}

      <Button type="submit" className="mt-4">
        Place Order
      </Button>
    </form>
  );
}

export default CheckoutForm;