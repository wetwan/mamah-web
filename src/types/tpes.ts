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

interface ColorAvailability {
  name: string;
  available: boolean;
  _id?: string; // Added _id based on the 'item' structure
}
interface SizeAvailability {
  name: string;
  available: boolean;
  _id?: string; // Added _id based on the 'item' structure
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  createdAt: string; // Changed to ISO string
  updatedAt: string; // Changed to ISO string
}

export interface CategoryProp {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Notification {
  _id: string;
  type:
    | "ORDER_STATUS_UPDATE"
    | "ORDER_CANCELLED"
    | "INVENTORY_ALERT"
    | "NEW_PRODUCT_CREATED"
    | "NEW_ORDER";
  title: string;
  message: string;
  relatedId?: string;
  userIds?: string[];
  isGlobal?: boolean;
  createdAt: string;
  timestamp: string;

  isRead: boolean;
  updatedAt: string;
}
export interface NotificationData {
  success: boolean;
  notifications: Notification[];
  unreadCount: number;
}


export interface ShopdataProp {
  _id: string;
  name: string;
  images: string[];
  colors: ColorAvailability[];
  sizes: SizeAvailability[];
  price: number;
  discount: number;
  category: string;
  stock: number;
  description: string;
  postedby: string;
  averageRating: number;
  numOfReviews: number;
  reviews: Review[];
  createdAt: string; // Changed from number to ISO string
  updatedAt: string; // Changed from number to ISO string
  __v: number;      // New metadata field
  finalPrice: number; // New calculated field
  inStock: boolean; // New status field
  id: string;       // New field (often redundant with _id)
}