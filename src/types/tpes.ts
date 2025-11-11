export interface OrderItem {
    _id: string;
    product: {
        _id: string;
        id: string;
        name: string;
        price: number;
        finalPrice: number;
        inStock: boolean;
        images: string[];
    };
    color: string;
    size: string | null;
    price: number;
    quantity: number;
}

export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    address2?: string;
    state: string;
    country: string;
}

export interface PaymentResult {
    id: string;
    status: string;
}

export interface orderProps {
    _id: string;
    user: string;
    createdBy: string;
    creatorModel: "User" | "Admin";
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentResult: PaymentResult;
    paymentIntentId: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    status: string;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt?: string;
    createdAt: string;
    updatedAt: string;
    deliveredAt: string;
}
