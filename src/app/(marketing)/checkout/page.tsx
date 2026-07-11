"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrder, type ShippingAddress } from "@/lib/api";
import { useCartStore } from "@/src/domains/cart/cart.store";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();

  // Form State
  const [email, setEmail] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  if (items.length === 0) return null;

  const shippingCost = subtotal() > 100 ? 0 : 15;
  const total = subtotal() + shippingCost;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation for the Guest -> Registered flow
    if (createAccount && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Construct payload matching backend expectations
      const payload = {
        email,
        shippingAddress,
        items,
        subtotal: subtotal(),
        shippingCost,
        total,
        createAccount,
        ...(createAccount && { password }),
      };

      // Call backend
      const response = await createOrder(payload);

      // Clear cart on success
      clearCart();

      toast.success("Order placed successfully!");

      // Redirect to success page
      router.push(`/checkout/success?orderId=${response.orderId}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
            {/* Left Column: Shipping Form */}
            <div className="flex flex-col">
              <Link
                href="/shop"
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to cart
              </Link>

              <h1 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
                Shipping Information
              </h1>

              <div className="space-y-6">
                {/* Contact */}
                <div className="space-y-4">
                  <h2 className="text-sm font-medium text-foreground">
                    Contact
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="sr-only">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-border bg-background"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="create-account"
                        checked={createAccount}
                        onCheckedChange={(checked) =>
                          setCreateAccount(checked as boolean)
                        }
                        disabled={isSubmitting}
                      />
                      <Label
                        htmlFor="create-account"
                        className="cursor-pointer text-xs font-normal text-muted-foreground"
                      >
                        Create an account to track your order
                      </Label>
                    </div>

                    {/* Conditional Password Field for Guest -> Registered Flow */}
                    {createAccount && (
                      <div className="space-y-2 border-l-2 border-border pl-6">
                        <Label
                          htmlFor="password"
                          className="text-xs text-muted-foreground"
                        >
                          Create a password
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Min. 6 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required={createAccount}
                          minLength={6}
                          className="border-border bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className="text-sm font-medium text-foreground">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="sr-only">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First name"
                          value={shippingAddress.firstName}
                          onChange={handleAddressChange}
                          required
                          className="border-border bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="sr-only">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last name"
                          value={shippingAddress.lastName}
                          onChange={handleAddressChange}
                          required
                          className="border-border bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="sr-only">
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={shippingAddress.address}
                        onChange={handleAddressChange}
                        required
                        className="border-border bg-background"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="sr-only">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="City"
                          value={shippingAddress.city}
                          onChange={handleAddressChange}
                          required
                          className="border-border bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="sr-only">
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="State"
                          value={shippingAddress.state}
                          onChange={handleAddressChange}
                          required
                          className="border-border bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip" className="sr-only">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          name="zip"
                          placeholder="ZIP code"
                          value={shippingAddress.zip}
                          onChange={handleAddressChange}
                          required
                          className="border-border bg-background"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button (Mobile) */}
                <div className="pt-4 lg:hidden">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      `Pay $${total.toFixed(2)}`
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (Sticky on Desktop) */}
            <div className="h-fit rounded-2xl border border-border bg-muted/30 p-6 lg:sticky lg:top-24">
              <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="mb-6 max-h-[40vh] space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="line-clamp-1 text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      {item.size && (
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      $
                      {((item.salePrice || item.price) * item.quantity).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button (Desktop) */}
              <div className="mt-8 hidden space-y-4 lg:block">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay $${total.toFixed(2)}`
                  )}
                </Button>
                <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
