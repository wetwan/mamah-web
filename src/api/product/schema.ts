
import { shippingData } from "../auth/schema";

export interface OrderItem {
  product: string; // only the product ID
  quantity: number;
  color?: string;
  size?: string;
}

export interface Order {
  items: OrderItem[];
  shippingAddress: shippingData;
  paymentMethod: "card" | "cash";
  shippingPrice: number;
  taxPrice: number;
}