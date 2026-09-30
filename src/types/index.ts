export type FoodCategory =
  | 'All'
  | 'Coffee'
  | 'Pizza'
  | 'Snacks'
  | 'Pasta'
  | 'Burgers'
  | 'Beverages'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  description: string;
  image?: string;
  isVeg: boolean;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  isAvailable: boolean;
  calories?: string;
  prepTime?: string;
  customizations?: {
    milk?: string[];
    sugar?: string[];
    crust?: string[];
    cheese?: string[];
    spice?: string[];
  };
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedOptions?: {
    milk?: string;
    sugar?: string;
    extraCheese?: boolean;
    spiceLevel?: string;
    note?: string;
  };
  totalPrice: number;
}

export type OrderStatus =
  | 'received'
  | 'brewing'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: 'delivery' | 'takeaway' | 'dine_in';
  deliveryAddress?: string;
  bhopalArea?: string;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'cash' | 'upi' | 'card';
  appliedCoupon?: string;
  beansEarned: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingZone: 'Work Lounge' | 'Main Café Hall' | 'Terrace Garden';
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  favoriteItem?: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrder?: number;
  tag: string;
  validUntil: string;
}

export interface ComboDeal {
  id: string;
  name: string;
  description: string;
  itemsIncluded: string[];
  originalPrice: number;
  comboPrice: number;
  image: string;
  badge: string;
}

export interface LoyaltyUser {
  phone: string;
  name: string;
  beans: number;
  tier: 'Bronze Bean' | 'Silver Bean' | 'Gold Bean';
  joinedDate: string;
}
