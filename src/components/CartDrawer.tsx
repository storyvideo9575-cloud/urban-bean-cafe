import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Bike,
  Store,
  Utensils,
  CheckCircle2,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    orderType,
    setOrderType,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discount,
    deliveryFee,
    tax,
    total,
    loyaltyUser,
    redeemedBeansValue,
    redeemBeans,
    resetRedeemedBeans,
    setIsCheckoutOpen,
  } = useCafe();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF6F0] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-[#EADECF]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#EADECF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#E86034]">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1B1310] font-display">
                Your Order Bag
              </h2>
              <span className="text-xs text-[#785A4B]">
                {cart.length === 0
                  ? 'Bag is empty'
                  : `${cart.reduce((s, i) => s + i.quantity, 0)} item(s)`}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-xl text-[#785A4B] hover:bg-[#FAF6F0] hover:text-[#1B1310] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Mode Selector (Delivery, Takeaway, Dine-in) */}
        <div className="px-4 py-3 bg-[#F4EBE1] border-b border-[#EADECF]">
          <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-xl border border-[#D8C7B5]">
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#1B1310] text-white shadow-xs'
                  : 'text-[#574035] hover:text-[#1B1310]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery</span>
            </button>
            <button
              onClick={() => setOrderType('takeaway')}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                orderType === 'takeaway'
                  ? 'bg-[#1B1310] text-white shadow-xs'
                  : 'text-[#574035] hover:text-[#1B1310]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Takeaway</span>
            </button>
            <button
              onClick={() => setOrderType('dine_in')}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                orderType === 'dine_in'
                  ? 'bg-[#1B1310] text-white shadow-xs'
                  : 'text-[#574035] hover:text-[#1B1310]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Dine-In</span>
            </button>
          </div>
        </div>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#785A4B]">
              <div className="w-16 h-16 rounded-2xl bg-[#EADECF] flex items-center justify-center text-[#574035] mb-3">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="text-base font-bold text-[#1B1310]">Your bag is currently empty</h3>
              <p className="text-xs text-[#785A4B] mt-1 max-w-xs">
                Explore our artisanal coffees, hand-tossed pizzas, and sweet treats to start your order.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-4 py-2 bg-[#E86034] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {cart.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="bg-white rounded-2xl p-3.5 border border-[#EADECF] shadow-xs flex gap-3 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-[#F4EBE1] overflow-hidden shrink-0">
                    {cartItem.item.image ? (
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#785A4B] text-xs font-bold">
                        UB
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#1B1310] truncate">
                        {cartItem.item.name}
                      </h4>
                      <span className="text-xs font-bold font-mono text-[#1B1310] tabular-nums ml-2">
                        ₹{cartItem.totalPrice}
                      </span>
                    </div>

                    {/* Options tag */}
                    {(cartItem.selectedOptions?.milk ||
                      cartItem.selectedOptions?.extraCheese ||
                      cartItem.selectedOptions?.spiceLevel) && (
                      <div className="text-[11px] text-[#785A4B] truncate mt-0.5">
                        {[
                          cartItem.selectedOptions.milk,
                          cartItem.selectedOptions.extraCheese ? 'Double Cheese' : null,
                          cartItem.selectedOptions.spiceLevel,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </div>
                    )}

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#D8C7B5] rounded-lg bg-[#FAF6F0] p-0.5">
                        <button
                          onClick={() => updateQuantity(cartItem.cartId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#574035] hover:bg-white rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold font-mono text-[#1B1310]">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#574035] hover:bg-white rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.cartId)}
                        className="text-[#785A4B] hover:text-red-600 p-1 text-xs transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon code section */}
              <div className="bg-white rounded-2xl p-3.5 border border-[#EADECF] space-y-2.5">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#E86034]" />
                  <span className="text-xs font-bold text-[#1B1310]">Promo Code / Voucher</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                        <span className="text-emerald-700 block text-[11px]">
                          {appliedCoupon.title}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-emerald-800 hover:text-red-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. FIRSTBEAN or BHOPAL100"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl uppercase font-mono tracking-wider focus:outline-none focus:border-[#E86034]"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="px-3.5 py-1.5 bg-[#1B1310] hover:bg-[#3E2D25] text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick suggested coupon buttons */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => handleApplyCoupon('FIRSTBEAN')}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF6F0] hover:bg-[#EADECF] border border-[#D8C7B5] text-[#574035] font-mono"
                      >
                        FIRSTBEAN (15% off)
                      </button>
                      <button
                        onClick={() => handleApplyCoupon('BHOPAL100')}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF6F0] hover:bg-[#EADECF] border border-[#D8C7B5] text-[#574035] font-mono"
                      >
                        BHOPAL100 (₹100 off)
                      </button>
                    </div>
                  </>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] ${
                      couponFeedback.success ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Loyalty Beans Redemption */}
              {loyaltyUser && loyaltyUser.beans >= 40 && (
                <div className="bg-white rounded-2xl p-3.5 border border-[#EADECF] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                    <div>
                      <span className="text-xs font-bold text-[#1B1310] block">
                        Bean Rewards ({loyaltyUser.beans} pts)
                      </span>
                      <span className="text-[11px] text-[#785A4B]">
                        {redeemedBeansValue > 0
                          ? `Redeemed: ₹${redeemedBeansValue} off`
                          : 'Redeem 50 beans for ₹25 off'}
                      </span>
                    </div>
                  </div>
                  {redeemedBeansValue > 0 ? (
                    <button
                      onClick={resetRedeemedBeans}
                      className="text-xs font-semibold text-red-600 underline"
                    >
                      Undo
                    </button>
                  ) : (
                    <button
                      onClick={() => redeemBeans(50)}
                      className="px-3 py-1 bg-[#E5A93C] text-[#1B1310] text-xs font-bold rounded-lg hover:bg-[#d89c31] transition-colors"
                    >
                      Redeem 50
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#EADECF] space-y-3">
            <div className="space-y-1.5 text-xs text-[#574035]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums text-[#1B1310]">₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discounts Applied</span>
                  <span className="font-mono tabular-nums">-₹{discount}</span>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Bhopal Delivery Fee</span>
                  <span className="font-mono tabular-nums text-[#1B1310]">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE (Above ₹399)</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-mono tabular-nums text-[#1B1310]">₹{tax}</span>
              </div>

              <div className="pt-2 border-t border-[#F4EBE1] flex justify-between text-sm sm:text-base font-bold text-[#1B1310]">
                <span>To Pay</span>
                <span className="font-mono tabular-nums text-lg text-[#E86034]">
                  ₹{total}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full py-3.5 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
