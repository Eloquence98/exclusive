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
        <div className="grid grid-cols-1 grid-rows-2 gap-4 lg:grid-cols-[25rem_1fr]">
          <BillingDetailsForm />
          <CheckoutTotal checkOutItems={listItems} />
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
