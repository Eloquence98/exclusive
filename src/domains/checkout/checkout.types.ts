import { OrderProduct, OrderStatus, PaymentMethod } from "../order/order.types";

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
