"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Package, Search } from "lucide-react";
import { FormEvent, useState } from "react";

interface TrackOrderLookupFormProps {
  initialOrderNumber?: string;
  initialEmail?: string;
  onSubmit: (values: { orderNumber: string; email: string }) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function TrackOrderLookupForm({
  initialOrderNumber = "",
  initialEmail = "",
  onSubmit,
  isLoading = false,
  error,
}: TrackOrderLookupFormProps) {
  const [values, setValues] = useState({
    orderNumber: initialOrderNumber,
    email: initialEmail,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <Card className="border-border bg-background">
      <CardContent className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Track Your Order
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Enter your order number and email to see real-time updates.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orderNumber" className="text-sm font-medium">
              Order Number
            </Label>
            <Input
              id="orderNumber"
              name="orderNumber"
              placeholder="EXC-20260715-0001"
              value={values.orderNumber}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  orderNumber: e.target.value,
                }))
              }
              required
              disabled={isLoading}
              className="border-border bg-background font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Found in your confirmation email
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              disabled={isLoading}
              className="border-border bg-background"
            />
            <p className="text-xs text-muted-foreground">
              The email used when placing your order
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
              <p className="text-sm text-rose-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-12 w-full bg-primary text-base text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Looking up order...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Track Order
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
