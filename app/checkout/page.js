import Heading from "@/app/_components/Heading";
import LayoutPadding from "@/app/_components/LayoutPadding";
import BillingDetailsForm from "@/app/_components/BillingDetailsForm";

export const metadata = {
  title: "Checkout",
};
function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <div className="grid grid-cols-[29.375rem_1fr]">
          <div className="bg-yellow">
            <Heading>Billing Details</Heading>
            <BillingDetailsForm />
          </div>
          <div className="h-99 bg-green-600"></div>
        </div>
      </div>
    </LayoutPadding>
  );
}

export default page;
