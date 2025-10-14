import { CartItem } from "@/context/cartStore";
import { shippingData } from "../auth/schema";

export interface Order {
    item: CartItem[],
    shippingAddress: shippingData
    paymentmethod: "card" | "cash"
    shippingPrice: number
    taxPrice: number
}