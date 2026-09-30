import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { BHOPAL_AREAS } from '../data/menuData';
import {
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    deliveryFee,
    tax,
    total,
    orderType,
    placeOrder,
    loyaltyUser,
  } = useCafe();

  const [name, setName] = useState(loyaltyUser?.name || '');
  const [phone, setPhone] = useState(loyaltyUser?.phone || '');
  const [email, setEmail] = useState('');
  const [bhopalArea, setBhopalArea] = useState(BHOPAL_AREAS[1]); // Default MP Nagar Zone-II
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card'>('upi');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (orderType === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your delivery street / flat address in Bhopal');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      placeOrder({
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        bhopalArea: orderType === 'delivery' ? bhopalArea : undefined,
        deliveryAddress: orderType === 'delivery' ? address : undefined,
        tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
        paymentMethod,
        notes,
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EADECF] my-8 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F4EBE1]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B1310] font-display">
              Complete Your Order
            </h2>
            <span className="text-xs text-[#785A4B] block mt-0.5">
              {orderType === 'delivery'
                ? 'Doorstep delivery across Bhopal'
                : orderType === 'takeaway'
                ? 'Quick pickup at Urban Bean counter'
                : 'Direct to your café table'}
            </span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-[#785A4B] hover:bg-[#FAF6F0] hover:text-[#1B1310]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Customer Personal Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#574035] block mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#785A4B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#574035] block mb-1">
                Phone Number (for SMS & updates) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#785A4B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                />
              </div>
            </div>
          </div>

          {/* Delivery or Dine In Specifics */}
          {orderType === 'delivery' && (
            <div className="space-y-3 p-4 bg-[#FAF6F0] rounded-2xl border border-[#EADECF]">
              <div>
                <label className="text-xs font-bold text-[#574035] block mb-1">
                  Select Bhopal Area / Locality *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#E86034] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={bhopalArea}
                    onChange={(e) => setBhopalArea(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034] text-[#1B1310]"
                  >
                    {BHOPAL_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#574035] block mb-1">
                  Complete Street / Apartment Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House/Flat number, building name, landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                />
              </div>
            </div>
          )}

          {orderType === 'dine_in' && (
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EADECF]">
              <label className="text-xs font-bold text-[#574035] block mb-1">
                Your Table Number (if already seated)
              </label>
              <input
                type="text"
                placeholder="e.g. Table 04 or Lounge Desk 2"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-white border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
              />
            </div>
          )}

          {orderType === 'takeaway' && (
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EADECF] text-xs text-[#574035]">
              <span className="font-bold text-[#1B1310] block">Pickup Location:</span>
              Urban Bean Café Counter, 24, MP Nagar Zone-II, Bhopal (Ready in 15–20 mins).
            </div>
          )}

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold text-[#574035] block mb-1.5 uppercase tracking-wider">
              Payment Option
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#E86034] bg-[#E86034]/10 text-[#E86034] font-bold shadow-xs'
                    : 'border-[#D8C7B5] bg-[#FAF6F0] text-[#574035] hover:bg-white'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-[#E86034] bg-[#E86034]/10 text-[#E86034] font-bold shadow-xs'
                    : 'border-[#D8C7B5] bg-[#FAF6F0] text-[#574035] hover:bg-white'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">Cash / COD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#E86034] bg-[#E86034]/10 text-[#E86034] font-bold shadow-xs'
                    : 'border-[#D8C7B5] bg-[#FAF6F0] text-[#574035] hover:bg-white'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">Card POS</span>
              </button>
            </div>
          </div>

          {/* Special Kitchen Cooking Notes */}
          <div>
            <label className="text-xs font-bold text-[#574035] block mb-1">
              Cooking / Delivery Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Ring doorbell, send extra napkins, spicy dip..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
            />
          </div>

          {/* Pricing Recap Box */}
          <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EADECF] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#785A4B] block">
                Total for {cart.reduce((s, i) => s + i.quantity, 0)} items (incl. GST)
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You'll earn {Math.floor(total / 10)} Bean loyalty points</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-[#E86034] tabular-nums">
                ₹{total}
              </span>
            </div>
          </div>

          {/* Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming your order...</span>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Place Order (₹{total})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
