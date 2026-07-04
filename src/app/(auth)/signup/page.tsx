// import RegisterUser from "@/components/RegisterUser";

// export const metadata = {
//   title: "Signup",
// };
// function page() {
//   return <RegisterUser to="signup" />;
// }

// export default page;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import { useAuthStore } from "@/src/lib/auth-store";
import { Eye, EyeOff, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  // Pre-fill email if passed from checkout (optional enhancement) tempeto
  useEffect(() => {
    const checkoutEmail = searchParams.get("email");
    if (checkoutEmail) setEmail(checkoutEmail);
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        name,
        email,
        password,
        ...(orderId && { orderId }),
      });

      // Save to global state and localStorage
      login(response.token, response.user);

      toast.success(
        orderId
          ? "Account created! Your order has been linked."
          : "Account created successfully!",
      );

      if (orderId) {
        router.push(`/account/orders/${orderId}`);
      } else {
        router.push("/account");
      }
      router.refresh();
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create account. Please try again.",
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join ATELIER to track orders, save your details, and get early access.
        </p>
      </div>

      {/* Guest -> Registered Prompt */}
      {orderId && (
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4 text-sm">
          <Package className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">
              Track your recent order
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Create an account using the same email from your checkout to link
              order{" "}
              <span className="font-mono font-semibold text-foreground">
                {orderId}
              </span>{" "}
              to your profile.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            className="h-11 border-border bg-background"
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="h-11 border-border bg-background"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-11 border-border bg-background pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-11 border-border bg-background"
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
