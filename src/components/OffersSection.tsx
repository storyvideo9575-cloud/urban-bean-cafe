import React from 'react';
import { useCafe } from '../context/CafeContext';
import { COMBO_DEALS, ACTIVE_OFFERS } from '../data/menuData';
import {
  Tag,
  Sparkles,
  ShoppingBag,
  Percent,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';

export const OffersSection: React.FC = () => {
  const { addToCart, menuItems, applyCoupon, setIsCartOpen } = useCafe();

  const handleAddCombo = (comboId: string) => {
    if (comboId === 'combo-1') {
      // Cappuccino + Brownie
      const coffee = menuItems.find((i) => i.id === 'c-1');
      const brownie = menuItems.find((i) => i.id === 'd-1');
      if (coffee) addToCart(coffee);
      if (brownie) addToCart(brownie);
    } else if (comboId === 'combo-2') {
      // Farmhouse Pizza + 2 Cold Coffees
      const pizza = menuItems.find((i) => i.id === 'p-1');
      const coldCoffee = menuItems.find((i) => i.id === 'c-2');
      const garlicBread = menuItems.find((i) => i.id === 's-2');
      if (pizza) addToCart(pizza);
      if (coldCoffee) addToCart(coldCoffee);
      if (coldCoffee) addToCart(coldCoffee);
      if (garlicBread) addToCart(garlicBread);
    } else if (comboId === 'combo-3') {
      // Americano + Pasta
      const americano = menuItems.find((i) => i.id === 'c-4');
      const pasta = menuItems.find((i) => i.id === 'm-1');
      if (americano) addToCart(americano);
      if (pasta) addToCart(pasta);
    }
    setIsCartOpen(true);
  };

  return (
    <section id="offers-section" className="py-16 sm:py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
            <span>Daily Values</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E86034]">Curated Combos</span>
            <span aria-hidden="true">·</span>
            <span>Student & Work Friendly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
            Special Combos & Deals
          </h2>
          <p className="mt-3 text-[#574035] text-base leading-relaxed">
            Handcrafted bundles designed for group hangouts, study marathon sessions,
            and workday lunches in Bhopal.
          </p>
        </div>

        {/* Promo Voucher Cards Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {ACTIVE_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl p-5 border border-[#EADECF] hover:border-[#D8C7B5] shadow-xs flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#E86034]">{offer.tag}</span>
                  <span className="text-[#785A4B] font-mono text-[11px]">{offer.validUntil}</span>
                </div>
                <h3 className="text-base font-bold text-[#1B1310]">{offer.title}</h3>
                <p className="text-xs text-[#574035] mt-1 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F4EBE1] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B1310] bg-[#FAF6F0] px-2.5 py-1 rounded-lg border border-[#D8C7B5]">
                  <Tag className="w-3 h-3 text-[#E86034]" />
                  <span>{offer.code}</span>
                </div>

                <button
                  onClick={() => {
                    applyCoupon(offer.code);
                    setIsCartOpen(true);
                  }}
                  className="text-xs font-bold text-[#E86034] hover:text-[#D24E23] flex items-center gap-1"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMBO_DEALS.map((combo) => (
            <div
              key={combo.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EADECF] hover:border-[#D8C7B5] transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EBE1]">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1310]/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E86034] text-white shadow-xs">
                    {combo.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1B1310] group-hover:text-[#E86034] transition-colors">
                    {combo.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#574035] leading-relaxed">
                    {combo.description}
                  </p>

                  {/* Included items bullet checklist */}
                  <div className="mt-4 space-y-1.5">
                    {combo.itemsIncluded.map((it) => (
                      <div
                        key={it}
                        className="flex items-center gap-2 text-xs text-[#785A4B]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#E86034] shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4EBE1] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#785A4B] line-through block font-mono">
                      ₹{combo.originalPrice}
                    </span>
                    <span className="text-2xl font-black font-mono text-[#1B1310]">
                      ₹{combo.comboPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddCombo(combo.id)}
                    className="px-5 py-2.5 bg-[#1B1310] hover:bg-[#3E2D25] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E86034]" />
                    <span>Add Combo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
