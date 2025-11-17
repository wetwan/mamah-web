export interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  color: string | null;
  size: string | null;
  price: number;
}

interface DisplayPrice {
  currency: string;
  symbol: string;
  price: number;
  finalPrice: number;
  savings: number;
  originalPrice: number;
  originalFinalPrice: number;
  formatted: string;
  formattedBasePrice: string;
  exchangeRate: number;
  hasDiscount: boolean;
  discountPercent: number;
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
  items: OrderItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingAddress: {
    address1: string;
    address2: string;
    country: string;
    email: string;
    fullName: string;
    phone: string;
    state: string;
  };
  currency: {
    code: string;
    symbol: string;
    exchangeRate: number;
  };
  displayPrices: {
    currency: string;
    exchangeRate: number;
    items: number;
    originalTotal: number;
    shipping: number;
    symbol: string;
    tax: number;
    total: number;
  };
  formattedTotal: string;
  isDelivered: boolean;
  isPaid: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  deliveredAt: string;
}

export interface ColorAvailability {
  name: string;
  available: boolean;
  _id?: string; // Added _id based on the 'item' structure
}
export interface SizeAvailability {
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
  | "NEW_ORDER"
  | "USER_LOGIN"
  | "NEW_PRODUCT_UPDATED"
  | "NEW_USER_CREATED"
  | "NEW_ORDER_PAYMENT"
  | "ORDER_STATUS_UPDATE";
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  finalPrice: number;
  inStock: boolean;
  id: string;
  displayPrice: DisplayPrice;
}
