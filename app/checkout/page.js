import BillingDetailsForm from "@/app/_components/BillingDetailsForm";
import Heading from "@/app/_components/Heading";
import LayoutPadding from "@/app/_components/LayoutPadding";
import ItemsOnCheckOut from "../_components/ItemsOnCheckOut";

export const metadata = {
  title: "Checkout",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <Heading className="mb-9">Billing Details</Heading>
        <div className="grid grid-cols-[29.375rem_1fr]">
          <BillingDetailsForm />
          <div className="h-99 bg-green-600">
            <ItemsOnCheckOut />
          </div>
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
