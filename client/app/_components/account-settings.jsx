"use client";
import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileSection = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-medium text-primary">My Profile</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label
          htmlFor="firstName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="address"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <Input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>
    </div>
  </div>
);

const ChangePasswordSection = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <h2 className="mb-6 text-xl font-medium text-primary">Change Password</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label
          htmlFor="currentPassword"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Current Password
        </label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="newPassword"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange}
          required
          className="w-full"
        />
      </div>
    </div>
    <div>
      <label
        htmlFor="confirmPassword"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Confirm New Password
      </label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        required
        className="w-full"
      />
    </div>
  </div>
);

const PlaceholderSection = ({ title }) => (
  <div className="space-y-6">
    <h2 className="mb-6 text-xl font-medium text-primary">{title}</h2>
    <p>This section is not implemented yet.</p>
  </div>
);

const AccountSettings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleTabChange = (tab) => {
    router.push(`/account?tab=${tab}`, { scroll: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "addressBook":
        return <PlaceholderSection title="Address Book" />;
      case "paymentOptions":
        return <PlaceholderSection title="My Payment Options" />;
      case "orders":
        return <PlaceholderSection title="My Orders" />;
      case "returns":
        return <PlaceholderSection title="My Returns" />;
      case "cancellations":
        return <PlaceholderSection title="My Cancellations" />;
      case "changePassword":
        return (
          <ChangePasswordSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return (
          <ProfileSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left Component - Headings */}
        <div className="lg:col-span-1">
          <h3 className="mb-4 text-base font-medium">Manage My Account</h3>
          <div className="mb-4 space-y-2">
            <button
              className={`block w-full text-left font-normal ${
                activeTab === "profile" ? "text-primary" : "text-discount"
              }`}
              onClick={() => handleTabChange("profile")}
            >
              My Profile
            </button>
            <button
              className={`block w-full text-left font-normal ${
                activeTab === "addressBook" ? "text-primary" : "text-discount"
              }`}
              onClick={() => handleTabChange("addressBook")}
            >
              Address Book
            </button>
            <button
              className={`block w-full text-left font-normal ${
                activeTab === "paymentOptions"
                  ? "text-primary"
                  : "text-discount"
              }`}
              onClick={() => handleTabChange("paymentOptions")}
            >
              My Payment Options
            </button>
          </div>

          <h3 className="mb-4 text-base font-medium">My Orders</h3>
          <div className="mb-4 space-y-2">
            <button
              className={`block w-full text-left font-normal ${
                activeTab === "returns" ? "text-primary" : "text-discount"
              }`}
              onClick={() => handleTabChange("returns")}
            >
              My Returns
            </button>
            <button
              className={`block w-full text-left font-normal ${
                activeTab === "cancellations" ? "text-primary" : "text-discount"
              }`}
              onClick={() => handleTabChange("cancellations")}
            >
              My Cancellations
            </button>
          </div>

          <button
            className={`block w-full text-left text-base font-medium ${
              activeTab === "changePassword" ? "text-primary" : ""
            }`}
            onClick={() => handleTabChange("changePassword")}
          >
            Change Password
          </button>
        </div>

        {/* Right Component - Content */}
        <div className="rounded-lg bg-white p-6 shadow-md lg:col-span-3">
          <form onSubmit={handleSubmit}>
            {renderContent()}
            <div className="pt-6">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
