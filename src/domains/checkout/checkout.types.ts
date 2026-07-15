export type OrderStatus =
  | "processing"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cash_on_delivery";
export type PaymentStatus = "pending" | "paid" | "failed";

/**
 * Shipping address matching backend orderSchema.shippingAddress.
 */
export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  zipCode: string;
  country: string;
}

/**
 * Guest information required by createGuestUser middleware.
 */
export interface GuestInfo {
  name: string;
  email: string;
}

/**
 * Product item sent to POST /orders.
 * Backend expects "product", not "productId".
 */
export interface OrderProduct {
  product: string;
  quantity: number;
}

/**
 * Payload sent to POST /orders.
 */
export interface CreateOrderPayload {
  guestInfo?: GuestInfo;
  shippingAddress: ShippingAddress;
  products: OrderProduct[];
  paymentMethod: PaymentMethod;
}

/**
 * Successful order creation response.
 */
export interface CreateOrderResponse {
  orderNumber: string;
  accessToken: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: string;
}

/**
 * Result of shipping cost calculation.
 */
export interface ShippingCalculation {
  shippingCost: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
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
