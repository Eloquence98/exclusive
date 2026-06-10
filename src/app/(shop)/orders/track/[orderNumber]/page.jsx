"use client";

import { useEffect, useState } from "react";
import LayoutPadding from "@/components/LayoutPadding";
import Spinner from "@/components/Spinner";
import { formatCurrency } from "@/utils/utility";
import { HiCheckCircle, HiClock } from "react-icons/hi2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TrackOrderPage({ params }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`${API_URL}/orders/track/${params.orderNumber}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Order not found");
        }

        setOrder(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [params.orderNumber]);

  if (loading) {
    return (
      <LayoutPadding>
        <div className="mt-15">
          <Spinner />
        </div>
      </LayoutPadding>
    );
  }

  if (error) {
    return (
      <LayoutPadding>
        <div className="mt-15 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">{error}</h1>
        </div>
      </LayoutPadding>
    );
  }

  const statusSteps = [
    { status: "processing", label: "Processing" },
    { status: "confirmed", label: "Confirmed" },
    { status: "shipped", label: "Shipped" },
    { status: "delivered", label: "Delivered" },
  ];

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.status === order.orderStatus
  );

  return (
    <LayoutPadding>
      <div className="mt-15">
        <h1 className="mb-8 text-3xl font-bold">Track Order</h1>

        {/* Order Info */}
        <div className="mb-8 rounded-lg border border-border p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-default-500">Order Number</p>
              <p className="text-xl font-semibold">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-default-500">Total Amount</p>
              <p className="text-xl font-semibold text-primary">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Order Status</h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => (
              <div key={step.status} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      index <= currentStatusIndex
                        ? "bg-success-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index <= currentStatusIndex ? (
                      <HiCheckCircle className="h-6 w-6" />
                    ) : (
                      <HiClock className="h-6 w-6" />
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium">{step.label}</p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`mx-2 h-1 flex-1 ${
                      index < currentStatusIndex ? "bg-success-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="rounded-lg border border-border p-6">
          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
          <p>{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 && (
            <p>{order.shippingAddress.addressLine2}</p>
          )}
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.zipCode}
          </p>
          <p>{order.shippingAddress.country}</p>
          <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
        </div>
      </div>
    </LayoutPadding>
  );
}