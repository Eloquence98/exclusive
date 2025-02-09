import BillingDetailsForm from "@/app/_components/BillingDetailsForm";
import Heading from "@/app/_components/Heading";
import LayoutPadding from "@/app/_components/LayoutPadding";
import CheckoutTotal from "../_components/CheckoutTotal";

export const metadata = {
  title: "Checkout",
};

const listItems = [
  { name: "HTC Combat gear", image: "/controller.png", price: 230 },
  { name: "CPU & GPU Combat", image: "/side-image.png", price: 2300 },
];

function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <Heading className="mb-9">Billing Details</Heading>
        <div className="grid grid-cols-[29.375rem_1fr]">
          <BillingDetailsForm />
          <div className="h-99 bg-green-600">
            <CheckoutTotal checkOutItems={listItems} />
          </div>
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
