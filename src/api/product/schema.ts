import { CartItem } from "@/context/cartStore";
import { shippingData } from "../auth/schema";

export interface Order {
    item: CartItem,
    shippingAddress: shippingData
    paymentmethod: ["card", "paypal", "bank", "cash_on_delivery"]
    shippingPrice: number
    taxPrice: number
}