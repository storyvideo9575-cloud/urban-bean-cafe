import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MenuItem,
  CartItem,
  Order,
  Reservation,
  Review,
  Offer,
  LoyaltyUser,
  OrderStatus,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  ACTIVE_OFFERS,
  CUSTOMER_REVIEWS,
} from '../data/menuData';

interface CafeContextType {
  // Navigation
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  scrollToSection: (sectionId: string) => void;

  // Menu items & Admin management
  menuItems: MenuItem[];
  updateMenuItemPrice: (id: string, newPrice: number) => void;
  toggleItemAvailability: (id: string) => void;
  addCustomMenuItem: (item: Omit<MenuItem, 'id'>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: CartItem['selectedOptions']) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: 'delivery' | 'takeaway' | 'dine_in';
  setOrderType: (type: 'delivery' | 'takeaway' | 'dine_in') => void;
  cartCount: number;
  subtotal: number;
  appliedCoupon: Offer | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryAddress?: string;
    bhopalArea?: string;
    tableNumber?: string;
    paymentMethod: 'cash' | 'upi' | 'card';
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (orderId: string | null) => void;

  // Reservations
  reservations: Reservation[];
  createReservation: (data: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => Reservation;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  activeReservation: Reservation | null;
  setActiveReservation: (res: Reservation | null) => void;

  // Loyalty Program
  loyaltyUser: LoyaltyUser | null;
  loginLoyalty: (phone: string, name: string) => void;
  logoutLoyalty: () => void;
  redeemedBeansValue: number;
  redeemBeans: (beans: number) => boolean;
  resetRedeemedBeans: () => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('urban_bean_menu');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MENU_ITEMS;
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('urban_bean_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine_in'>('delivery');
  const [appliedCoupon, setAppliedCoupon] = useState<Offer | null>(null);
  const [redeemedBeansValue, setRedeemedBeansValue] = useState(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('urban_bean_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    // Seed 1 realistic previous order for demonstration
    return [
      {
        id: 'UB-9214',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        customerName: 'Aman Saxena',
        customerPhone: '+91 98260 11223',
        customerEmail: 'aman.saxena@example.com',
        orderType: 'delivery',
        deliveryAddress: 'Flat 402, Royal Palms, Arera Colony E-3, Bhopal',
        bhopalArea: 'Arera Colony (E-1 to E-8)',
        items: [
          {
            cartId: 'item-1',
            item: INITIAL_MENU_ITEMS[0], // Cappuccino
            quantity: 2,
            totalPrice: 258,
          },
          {
            cartId: 'item-2',
            item: INITIAL_MENU_ITEMS[5], // Farmhouse Pizza
            quantity: 1,
            totalPrice: 249,
          },
        ],
        subtotal: 507,
        discount: 100,
        deliveryFee: 0,
        tax: 20,
        total: 427,
        status: 'completed',
        paymentMethod: 'upi',
        appliedCoupon: 'BHOPAL100',
        beansEarned: 42,
      },
    ];
  });

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('urban_bean_reservations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'UB-RES-8831',
        customerName: 'Kabir & Friends',
        phone: '+91 97555 44332',
        email: 'kabir.bhopal@gmail.com',
        date: 'Today',
        timeSlot: '07:30 PM',
        guests: 4,
        seatingZone: 'Terrace Garden',
        specialRequests: 'Window/edge table for birthday celebration',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'UB-RES-8832',
        customerName: 'Tanvi Shrivastava',
        phone: '+91 94250 88991',
        email: 'tanvi.s@techlead.io',
        date: 'Today',
        timeSlot: '02:00 PM',
        guests: 2,
        seatingZone: 'Work Lounge',
        specialRequests: 'Quiet area near power sockets for coding sprint',
        status: 'seated',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [activeReservation, setActiveReservation] = useState<Reservation | null>(null);

  // Loyalty User
  const [loyaltyUser, setLoyaltyUser] = useState<LoyaltyUser | null>(() => {
    const saved = localStorage.getItem('urban_bean_loyalty');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo user to give instant value
    return {
      phone: '+91 98765 43210',
      name: 'Coffee Lover',
      beans: 120,
      tier: 'Bronze Bean',
      joinedDate: 'Jan 2024',
    };
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('urban_bean_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CUSTOMER_REVIEWS;
      }
    }
    return CUSTOMER_REVIEWS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('urban_bean_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('urban_bean_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('urban_bean_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('urban_bean_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (loyaltyUser) {
      localStorage.setItem('urban_bean_loyalty', JSON.stringify(loyaltyUser));
    }
  }, [loyaltyUser]);

  useEffect(() => {
    localStorage.setItem('urban_bean_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Cart operations
  const addToCart = (item: MenuItem, options?: CartItem['selectedOptions']) => {
    const optionKey = JSON.stringify(options || {});
    const cartId = `${item.id}-${optionKey}`;

    // Additional add-on pricing
    let extra = 0;
    if (options?.milk && (options.milk.includes('+₹40') || options.milk.includes('Oat') || options.milk.includes('Almond'))) {
      extra += 40;
    }
    if (options?.milk && options.milk.includes('+₹20')) {
      extra += 20;
    }
    if (options?.extraCheese) {
      extra += 50;
    }

    const unitPrice = item.price + extra;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.cartId === cartId);
      if (existing) {
        return prev.map((ci) =>
          ci.cartId === cartId
            ? {
                ...ci,
                quantity: ci.quantity + 1,
                totalPrice: (ci.quantity + 1) * unitPrice,
              }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartId,
          item,
          quantity: 1,
          selectedOptions: options,
          totalPrice: unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.cartId === cartId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            const singlePrice = ci.totalPrice / ci.quantity;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: singlePrice * newQty,
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setRedeemedBeansValue(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  // Coupons
  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = ACTIVE_OFFERS.find((o) => o.code === formatted);

    if (!found) {
      return { success: false, message: 'Invalid promo code. Try FIRSTBEAN or BHOPAL100' };
    }

    if (found.minOrder && subtotal < found.minOrder) {
      return {
        success: false,
        message: `Add ₹${found.minOrder - subtotal} more to apply code ${found.code}`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(appliedCoupon.discountAmount, subtotal);
    }
  }

  // Add redeemed beans discount
  discount += redeemedBeansValue;

  const deliveryFee =
    orderType === 'delivery' && subtotal > 0 && subtotal < 399 ? 30 : 0;
  const taxableSubtotal = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableSubtotal * 0.05); // 5% GST
  const total = Math.max(0, taxableSubtotal + deliveryFee + tax);

  // Loyalty operations
  const loginLoyalty = (phone: string, name: string) => {
    const cleanPhone = phone.trim();
    const cleanName = name.trim() || 'Urban Explorer';
    const newUser: LoyaltyUser = {
      phone: cleanPhone,
      name: cleanName,
      beans: 80,
      tier: 'Bronze Bean',
      joinedDate: 'New Member',
    };
    setLoyaltyUser(newUser);
  };

  const logoutLoyalty = () => {
    setLoyaltyUser(null);
    setRedeemedBeansValue(0);
  };

  const redeemBeans = (beansToRedeem: number): boolean => {
    if (!loyaltyUser || loyaltyUser.beans < beansToRedeem) return false;
    const value = Math.floor(beansToRedeem / 2); // 10 beans = ₹5 off
    setRedeemedBeansValue(value);
    setLoyaltyUser((prev) =>
      prev ? { ...prev, beans: prev.beans - beansToRedeem } : null
    );
    return true;
  };

  const resetRedeemedBeans = () => {
    if (loyaltyUser && redeemedBeansValue > 0) {
      const beansReturned = redeemedBeansValue * 2;
      setLoyaltyUser((prev) =>
        prev ? { ...prev, beans: prev.beans + beansReturned } : null
      );
    }
    setRedeemedBeansValue(0);
  };

  // Orders
  const placeOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryAddress?: string;
    bhopalArea?: string;
    tableNumber?: string;
    paymentMethod: 'cash' | 'upi' | 'card';
    notes?: string;
  }): Order => {
    const orderId = `UB-${Math.floor(1000 + Math.random() * 9000)}`;
    const beansEarned = Math.floor(total / 10);

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      orderType,
      deliveryAddress: orderData.deliveryAddress,
      bhopalArea: orderData.bhopalArea,
      tableNumber: orderData.tableNumber,
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      status: 'received',
      paymentMethod: orderData.paymentMethod,
      appliedCoupon: appliedCoupon?.code,
      beansEarned,
      notes: orderData.notes,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update loyalty points
    if (loyaltyUser) {
      setLoyaltyUser((prev) =>
        prev
          ? {
              ...prev,
              beans: prev.beans + beansEarned,
              tier:
                prev.beans + beansEarned > 600
                  ? 'Gold Bean'
                  : prev.beans + beansEarned > 200
                  ? 'Silver Bean'
                  : 'Bronze Bean',
            }
          : null
      );
    }

    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTrackingOrderId(orderId);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Reservations
  const createReservation = (
    data: Omit<Reservation, 'id' | 'status' | 'createdAt'>
  ): Reservation => {
    const resId = `UB-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      ...data,
      id: resId,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newRes, ...prev]);
    setActiveReservation(newRes);
    return newRes;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // Menu Admin
  const updateMenuItemPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, price: newPrice } : m))
    );
  };

  const toggleItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isAvailable: !m.isAvailable } : m))
    );
  };

  const addCustomMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `custom-${Date.now()}`,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <CafeContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        scrollToSection,
        menuItems,
        updateMenuItemPrice,
        toggleItemAvailability,
        addCustomMenuItem,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
        cartCount,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discount,
        deliveryFee,
        tax,
        total,
        orders,
        placeOrder,
        updateOrderStatus,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        reservations,
        createReservation,
        updateReservationStatus,
        activeReservation,
        setActiveReservation,
        loyaltyUser,
        loginLoyalty,
        logoutLoyalty,
        redeemedBeansValue,
        redeemBeans,
        resetRedeemedBeans,
        reviews,
        addReview,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
