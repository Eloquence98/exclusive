import { useState } from "react";
import { Input, Button } from "@heroui/react";

export default function ProfileSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
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
    console.log("Profile data submitted:", formData);
    // Here you would typically send the profile data to your backend
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-primary">My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
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
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
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
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
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
            <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
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
        <div className="mt-6">
          <Button type="submit" radius="sm" color="primary" className="w-full">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
