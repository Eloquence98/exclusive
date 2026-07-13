export type OrderStatus =
  | "processing"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

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
  paymentMethod: "cash_on_delivery";
}

/**
 * Successful order creation response.
 */
export interface CreateOrderResponse {
  orderNumber: string;
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
