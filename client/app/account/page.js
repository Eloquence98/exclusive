import LayoutPadding from "@/app/_components/LayoutPadding";
import AccountSettings from "@/app/_components/account-settings";

export const metadata = {
  title: "Account",
};

function page() {
  return (
    <LayoutPadding>
      <div className="mt-15">
        {/* <Heading className="mb-9">Account</Heading> */}
        <AccountSettings />
      </div>
    </LayoutPadding>
  );
}

export default page;
