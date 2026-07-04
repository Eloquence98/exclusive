"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserProfile } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import { Camera, Loader2, User } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();

  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      await updateUserProfile({ name });
      updateUser({ name }); // Update local Zustand store
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      <Card className="border-border bg-background">
        <CardHeader>
          <CardTitle className="text-base font-medium text-foreground">
            Personal Information
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Update your photo and personal details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Upload Area */}
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="group relative">
                {/* Avatar Placeholder */}
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-muted-foreground">
                  {user?.name ? (
                    <span className="text-2xl font-semibold text-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="h-10 w-10" />
                  )}
                </div>

                {/* Dashed Upload Overlay (UI Only) */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-border bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                >
                  <Camera className="mb-1 h-5 w-5 text-foreground" />
                  <span className="text-[10px] font-medium text-foreground">
                    Upload
                  </span>
                  <input
                    id="avatar-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    disabled
                  />
                </label>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <p className="text-sm font-medium text-foreground">
                  Profile Photo
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="h-11 border-border bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="h-11 cursor-not-allowed border-border bg-muted text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading || name === user?.name}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
