import { ShippingAddress } from "../checkout/checkout.types";

export type OrderStatus =
  | "processing"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cash_on_delivery";
export type PaymentStatus = "pending" | "paid" | "failed";

/**
 * Product item sent to POST /orders.
 * Backend expects "product", not "productId".
 */
export interface OrderProduct {
  product: string;
  quantity: number;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  note?: string;
  timestamp: string;
}

// ---
// Order Confirmation types
// Returned by GET /orders/:orderNumber/confirmation?token=:token
// ---

export interface ConfirmationCustomer {
  name: string;
  email: string;
}

export interface ConfirmationProduct {
  product: string;
  quantity: number;
  priceAtPurchase: number;
  name: string;
  imageUrl: string;
}

export interface ConfirmationPayment {
  method: PaymentMethod;
  status: PaymentStatus;
}

export interface ConfirmationTotals {
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
}

export interface ConfirmationEstimatedDelivery {
  confirmedEstimate: string;
  shippedEstimate: string;
  deliveredEstimate: string;
}

/**
 * Full order confirmation data.
 * Returned by GET /orders/:orderNumber/confirmation?token=:token
 */
export interface OrderConfirmation {
  orderNumber: string;
  customer: ConfirmationCustomer;
  products: ConfirmationProduct[];
  shippingAddress: ShippingAddress;
  payment: ConfirmationPayment;
  totals: ConfirmationTotals;
  orderStatus: OrderStatus;
  estimatedDelivery: ConfirmationEstimatedDelivery;
}

/**
 * Order data returned by:
 * GET /api/v1/orders/:orderNumber/tracking?token=:token
 * GET /api/v1/orders/:orderNumber/tracking?email=:email
 */
export interface OrderTracking {
  id: string;
  orderNumber: string;

  products: {
    product: string;
    quantity: number;
    priceAtPurchase: number;
    name: string;
    imageUrl: string;
  }[];

  shippingAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zipCode: string;
    country: string;
  };

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  subtotal: number;
  shippingCost: number;
  totalAmount: number;

  orderStatus: OrderStatus;

  statusHistory: OrderStatusHistory[];

  trackingNumber?: string;

  createdAt: string;
  updatedAt: string;
}
