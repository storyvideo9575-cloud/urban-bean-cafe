import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import {
  Sparkles,
  Award,
  Coffee,
  Gift,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const LoyaltySection: React.FC = () => {
  const { loyaltyUser, loginLoyalty, logoutLoyalty, setCurrentTab } = useCafe();

  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [calcSpend, setCalcSpend] = useState<number>(500);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    loginLoyalty(phoneInput, nameInput);
  };

  return (
    <section id="loyalty-section" className="py-16 sm:py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
            <span>Bean Rewards Club</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E5A93C]">Every Sip Counts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
            Join Urban Bean Rewards
          </h2>
          <p className="mt-3 text-[#574035] text-base leading-relaxed">
            Earn 1 Bean for every ₹10 spent. Unlock complimentary artisanal coffees,
            secret chef tasting invites, and priority table reservations in Bhopal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Digital Member Pass or Signup */}
          <div className="lg:col-span-6 space-y-6">
            {loyaltyUser ? (
              /* Active Digital Membership Card */
              <div className="bg-gradient-to-br from-[#1B1310] via-[#2A1D17] to-[#120B08] text-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-[#E5A93C]/30 relative overflow-hidden">
                {/* Background gold badge motif */}
                <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#E5A93C]/10 rounded-full blur-2xl" />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#E86034] flex items-center justify-center text-white">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-bold tracking-tight block">
                        Urban Bean Pass
                      </span>
                      <span className="text-[10px] text-[#D8C7B5] tracking-widest uppercase">
                        Member since {loyaltyUser.joinedDate}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/40">
                    {loyaltyUser.tier}
                  </span>
                </div>

                <div className="my-6">
                  <span className="text-xs text-[#D8C7B5] block uppercase tracking-wider">
                    Available Balance
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-black font-mono text-[#E5A93C] tracking-tight">
                      {loyaltyUser.beans}
                    </span>
                    <span className="text-sm font-bold text-[#EADECF]">Beans</span>
                  </div>
                  <span className="text-xs text-[#D8C7B5] block mt-1">
                    ≈ Worth ₹{Math.floor(loyaltyUser.beans / 2)} instant discount on next order
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#D8C7B5] block">Cardholder</span>
                    <span className="font-bold text-white text-sm">{loyaltyUser.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#D8C7B5] block">Phone ID</span>
                    <span className="font-mono text-white text-xs">{loyaltyUser.phone}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => setCurrentTab('home')}
                    className="flex-1 py-2.5 bg-[#E86034] hover:bg-[#D24E23] text-white text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    Redeem in Order Bag
                  </button>
                  <button
                    onClick={logoutLoyalty}
                    className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-[#D8C7B5] text-xs font-medium rounded-xl transition-colors"
                  >
                    Switch Account
                  </button>
                </div>
              </div>
            ) : (
              /* Signup Form */
              <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-md border border-[#EADECF]">
                <h3 className="text-xl font-bold text-[#1B1310] font-display">
                  Activate Your Free Card
                </h3>
                <p className="text-xs sm:text-sm text-[#785A4B] mt-1">
                  Start with instant 80 welcome beans credited right now.
                </p>

                <form onSubmit={handleJoin} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#574035] block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sen"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#574035] block mb-1">
                      Mobile Number (Used as your Bean ID) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                    <span>Join Club & Claim 80 Beans</span>
                  </button>
                </form>
              </div>
            )}

            {/* Interactive Points Calculator */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADECF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1310] uppercase tracking-wider">
                  Bean Savings Calculator
                </span>
                <span className="text-xs font-bold font-mono text-[#E86034]">
                  ₹{calcSpend} Spend
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={calcSpend}
                onChange={(e) => setCalcSpend(Number(e.target.value))}
                className="w-full accent-[#E86034]"
              />

              <div className="grid grid-cols-2 gap-3 text-center pt-2">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EADECF]">
                  <span className="text-xs text-[#785A4B] block">Beans Earned</span>
                  <span className="text-xl font-bold font-mono text-[#1B1310]">
                    +{Math.floor(calcSpend / 10)}
                  </span>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EADECF]">
                  <span className="text-xs text-[#785A4B] block">Next Order Savings</span>
                  <span className="text-xl font-bold font-mono text-emerald-700">
                    ₹{Math.floor(calcSpend / 20)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tiers breakdown */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-[#1B1310] font-display mb-2">
              Membership Tiers & Perks
            </h3>

            {/* Tier 1 */}
            <div className="bg-white rounded-2xl p-5 border border-[#EADECF] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#785A4B] font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1310]">Bronze Bean</h4>
                    <span className="text-[11px] text-[#785A4B]">0 – 200 Beans</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Starting Tier
                </span>
              </div>
              <p className="text-xs text-[#574035] leading-relaxed">
                1 Bean per ₹10 spent, 5% birthday month discount voucher, early access to new seasonal menu additions.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-2xl p-5 border border-[#EADECF] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#574035] font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1310]">Silver Bean</h4>
                    <span className="text-[11px] text-[#785A4B]">201 – 600 Beans</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#E86034] bg-[#E86034]/10 px-2.5 py-0.5 rounded-full">
                  Frequent Guest
                </span>
              </div>
              <p className="text-xs text-[#574035] leading-relaxed">
                Free iced beverage coupon every month, complimentary fries with any pizza order, priority booking during peak weekend hours.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5A93C]/40 bg-gradient-to-r from-white to-[#FAF6F0] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E5A93C] text-[#1B1310] flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1B1310]">Gold Bean</h4>
                    <span className="text-[11px] text-[#785A4B]">601+ Beans</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#1B1310] bg-[#E5A93C] px-2.5 py-0.5 rounded-full">
                  VIP Club
                </span>
              </div>
              <p className="text-xs text-[#574035] leading-relaxed">
                Flat 10% off on all dine-in bills, guaranteed reservation in Quiet Work Lounge, complimentary dessert with any meal over ₹400.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
