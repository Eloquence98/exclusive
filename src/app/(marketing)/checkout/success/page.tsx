"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  // Redirect to home if accessed directly without an order ID
  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
  }, [orderId, router]);

  if (!orderId) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16 md:py-20">
        <div className="w-full max-w-xl space-y-10 text-center">
          {/* Success Indicator */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Thank you for your order
              </h1>
              <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
                Your order has been received and is now being processed.
                We&apos;ve sent a confirmation email with your order details.
              </p>
            </div>
          </div>

          {/* Order Details Card */}
          <Card className="border-border bg-muted/30 text-left">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Order Number
                </span>
                <span className="font-mono text-sm font-semibold tracking-wide text-foreground">
                  {orderId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Payment Confirmed
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Guest to Registered Prompt */}
          <Card className="border-border bg-background">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-left sm:flex-row">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Track your order
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Create an account to easily track your shipment, manage
                  returns, and save your details for next time.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="shrink-0 border-border text-foreground hover:bg-muted"
              >
                <Link href={`/signup?orderId=${orderId}`}>Create Account</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Primary Actions */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full text-muted-foreground hover:text-foreground sm:w-auto"
            >
              <Link href="/" className="flex items-center gap-2">
                Return Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
