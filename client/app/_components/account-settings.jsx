"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileSection from "./account/ProfileSection";
import ChangePasswordSection from "./account/ChangePasswordSection";
import { NavSection } from "./account/Navigation";

const PlaceholderSection = ({ title }) => (
  <div className="space-y-6">
    <h2 className="mb-6 text-xl font-medium text-primary">{title}</h2>
    <p>This section is not implemented yet.</p>
  </div>
);

export default function AccountSettings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (tab) => {
    router.push(`/account?tab=${tab}`, { scroll: false });
  };

  const navigationSections = [
    {
      title: "Manage My Account",
      items: [
        { id: "profile", label: "My Profile" },
        { id: "addressBook", label: "Address Book" },
        { id: "paymentOptions", label: "My Payment Options" },
      ],
    },
    {
      title: "My Orders",
      items: [
        { id: "returns", label: "My Returns" },
        { id: "cancellations", label: "My Cancellations" },
      ],
    },
  ];

  const passwordSection = {
    id: "changePassword",
    label: "Change Password",
  };

  const currentActiveSection = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "addressBook":
        return <PlaceholderSection title="Address Book" />;
      case "paymentOptions":
        return <PlaceholderSection title="My Payment Options" />;
      case "returns":
        return <PlaceholderSection title="My Returns" />;
      case "cancellations":
        return <PlaceholderSection title="My Cancellations" />;
      case "changePassword":
        return <ChangePasswordSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          {navigationSections.map((section) => (
            <NavSection
              key={section.title}
              title={section.title}
              items={section.items}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          ))}

          <button
            className={`block w-full text-left text-base font-medium ${
              activeTab === passwordSection.id ? "text-primary" : ""
            }`}
            onClick={() => handleTabChange(passwordSection.id)}
          >
            {passwordSection.label}
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-3">
          {currentActiveSection()}
        </div>
      </div>
    </div>
  );
}
