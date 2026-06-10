"use client";

import BillingDetailsForm from "@/components/BillingDetailsForm";
import CheckoutTotal from "@/components/CheckoutTotal";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import LayoutPadding from "@/components/LayoutPadding";
import { useCart } from "@/hooks/CartProvider";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [shippingAddress, setShippingAddress] = useState(null);

  if (!cart || cart.length === 0) {
    return (
      <LayoutPadding>
        <div className="mt-15">
          <EmptyState type="cart" />
        </div>
      </LayoutPadding>
    );
  }

  return (
    <LayoutPadding>
      <div className="mt-15">
        <Heading className="mb-9">Billing Details</Heading>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[25rem_1fr]">
          <BillingDetailsForm onDataChange={setShippingAddress} />
          <CheckoutTotal
            checkOutItems={cart}
            shippingAddress={shippingAddress}
          />
        </div>
      </div>
    </LayoutPadding>
  );
}