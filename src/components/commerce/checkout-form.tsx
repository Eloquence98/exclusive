import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  GuestInfo,
  ShippingAddress,
} from "@/domains/checkout/checkout.types";

interface CheckoutFormProps {
  guestInfo: GuestInfo;
  shippingAddress: ShippingAddress;
  isPending: boolean;
  onGuestInfoChange: (field: keyof GuestInfo, value: string) => void;
  onShippingAddressChange: (
    field: keyof ShippingAddress,
    value: string,
  ) => void;
}

export function CheckoutForm({
  guestInfo,
  shippingAddress,
  isPending,
  onGuestInfoChange,
  onShippingAddressChange,
}: CheckoutFormProps) {
  return (
    <div className="space-y-8">
      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-foreground">Contact</h2>

        <div className="space-y-2">
          <Label htmlFor="name" className="sr-only">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Full name"
            value={guestInfo.name}
            onChange={(e) => onGuestInfoChange("name", e.target.value)}
            required
            disabled={isPending}
            className="border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            value={guestInfo.email}
            onChange={(e) => onGuestInfoChange("email", e.target.value)}
            required
            disabled={isPending}
            className="border-border bg-background"
          />
        </div>
      </section>

      {/* Shipping Address */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-foreground">
          Shipping Address
        </h2>

        <div className="space-y-2">
          <Label htmlFor="addressLine1" className="sr-only">
            Address
          </Label>
          <Input
            id="addressLine1"
            name="addressLine1"
            placeholder="Address line 1"
            value={shippingAddress.addressLine1}
            onChange={(e) =>
              onShippingAddressChange("addressLine1", e.target.value)
            }
            required
            disabled={isPending}
            className="border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2" className="sr-only">
            Address Line 2
          </Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            placeholder="Apartment, suite, etc. (optional)"
            value={shippingAddress.addressLine2 ?? ""}
            onChange={(e) =>
              onShippingAddressChange("addressLine2", e.target.value)
            }
            disabled={isPending}
            className="border-border bg-background"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="sr-only">
              City
            </Label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) => onShippingAddressChange("city", e.target.value)}
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode" className="sr-only">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              name="zipCode"
              placeholder="ZIP code"
              value={shippingAddress.zipCode}
              onChange={(e) =>
                onShippingAddressChange("zipCode", e.target.value)
              }
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="sr-only">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={(e) =>
                onShippingAddressChange("country", e.target.value)
              }
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="sr-only">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={shippingAddress.phone}
              onChange={(e) => onShippingAddressChange("phone", e.target.value)}
              required
              disabled={isPending}
              className="border-border bg-background"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
