import LayoutPadding from "@/components/LayoutPadding";
import AccountSettings from "@/components/AccountSettings";

export const metadata = {
  title: "Account",
};

function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        <AccountSettings />
      </div>
    </LayoutPadding>
  );
}

export default page;
