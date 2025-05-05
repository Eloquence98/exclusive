import { useState } from "react";
import { Input, Button } from "@heroui/react";

export default function ChangePasswordSection() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Password change submitted:", formData);
    // Here you would typically send the password data to your backend
  };

  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-xl font-medium text-primary">Change Password</h2>
      <form onSubmit={handleSubmit}>
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
            <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-gray-700">
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
        <div className="mt-4">
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
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
        <div className="mt-6">
          <Button type="submit" radius="sm" color="primary" className="w-full">
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
