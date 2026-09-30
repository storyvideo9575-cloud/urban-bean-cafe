import React, { useState, useMemo } from 'react';
import { useCafe } from '../context/CafeContext';
import { MenuItem, FoodCategory } from '../types';
import {
  Search,
  Plus,
  Flame,
  Star,
  Clock,
  Check,
  X,
  Coffee,
  Pizza,
  UtensilsCrossed,
  SlidersHorizontal,
} from 'lucide-react';

const CATEGORIES: FoodCategory[] = [
  'All',
  'Coffee',
  'Pizza',
  'Snacks',
  'Pasta',
  'Burgers',
  'Beverages',
  'Desserts',
];

export const MenuSection: React.FC = () => {
  const { menuItems, addToCart } = useCafe();
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Customization state
  const [selectedMilk, setSelectedMilk] = useState<string>('');
  const [selectedSugar, setSelectedSugar] = useState<string>('');
  const [extraCheese, setExtraCheese] = useState<boolean>(false);
  const [selectedSpice, setSelectedSpice] = useState<string>('');
  const [itemNote, setItemNote] = useState<string>('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Best seller filter
      if (onlyBestSeller && !item.isBestSeller) {
        return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, onlyBestSeller]);

  const openCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedMilk(item.customizations?.milk?.[0] || '');
    setSelectedSugar(item.customizations?.sugar?.[0] || '');
    setSelectedSpice(item.customizations?.spice?.[0] || '');
    setExtraCheese(false);
    setItemNote('');
  };

  const handleAddDirectOrCustomize = (item: MenuItem) => {
    if (item.customizations) {
      openCustomizer(item);
    } else {
      addToCart(item);
    }
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    addToCart(customizingItem, {
      milk: selectedMilk || undefined,
      sugar: selectedSugar || undefined,
      extraCheese: extraCheese || undefined,
      spiceLevel: selectedSpice || undefined,
      note: itemNote.trim() || undefined,
    });
    setCustomizingItem(null);
  };

  return (
    <section id="menu-section" className="py-16 sm:py-20 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#785A4B] mb-2">
            <span>Freshly Prepared</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E86034]">Artisanal Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Bhopal Best Eats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1310] tracking-tight font-display">
            Explore Our Crafted Menu
          </h2>
          <p className="mt-3 text-[#574035] text-base leading-relaxed">
            From locally roasted Arabica coffee to stone-baked pizzas and warm molten
            desserts. Made to order with premium ingredients every single day.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EADECF] mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#1B1310] text-white shadow-sm'
                      : 'text-[#574035] hover:text-[#1B1310] hover:bg-[#F4EBE1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and toggles */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-[#785A4B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search coffee, pizza..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#FAF6F0] rounded-xl border border-[#D8C7B5] focus:outline-none focus:border-[#E86034] text-[#1B1310]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#785A4B] hover:text-[#1B1310]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setOnlyBestSeller(!onlyBestSeller)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors shrink-0 ${
                  onlyBestSeller
                    ? 'bg-[#E86034]/10 border-[#E86034] text-[#E86034]'
                    : 'border-[#D8C7B5] text-[#574035] hover:border-[#1B1310]'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${onlyBestSeller ? 'fill-[#E86034]' : ''}`} />
                <span>Best Sellers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#D8C7B5]">
            <UtensilsCrossed className="w-12 h-12 text-[#785A4B] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-[#1B1310]">No items match your criteria</h3>
            <p className="text-sm text-[#785A4B] mt-1">
              Try searching for something else or clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyBestSeller(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#E86034] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EADECF] hover:border-[#D8C7B5] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                {/* Media slot or clean styling */}
                <div className="relative aspect-[16/10] bg-[#F4EBE1] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#785A4B] p-4 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#EADECF] flex items-center justify-center text-[#574035] mb-2">
                        {item.category === 'Coffee' ? (
                          <Coffee className="w-6 h-6" />
                        ) : item.category === 'Pizza' ? (
                          <Pizza className="w-6 h-6" />
                        ) : (
                          <UtensilsCrossed className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-[#785A4B]">
                        Fresh from Urban Bean Bar
                      </span>
                    </div>
                  )}

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {/* Pure veg indicator symbol */}
                    <span className="w-5 h-5 rounded-md bg-white/95 border border-emerald-600 flex items-center justify-center shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    </span>

                    {item.isBestSeller && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#1B1310] text-[#E5A93C] shadow-xs">
                        ★ Best Seller
                      </span>
                    )}
                    {item.isChefSpecial && !item.isBestSeller && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#E86034] text-white shadow-xs">
                        Chef’s Pick
                      </span>
                    )}
                  </div>

                  {/* Availability tag if out of stock */}
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-[#1B1310]/70 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                      Temporarily Sold Out
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & specs */}
                    <div className="flex items-center justify-between text-xs text-[#785A4B] mb-1">
                      <span className="uppercase tracking-wider font-semibold text-[11px]">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2 text-[11px]">
                        {item.prepTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#785A4B]" />
                            {item.prepTime}
                          </span>
                        )}
                        {item.calories && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.calories}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#1B1310] group-hover:text-[#E86034] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#574035] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-5 pt-4 border-t border-[#F4EBE1] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#785A4B] block leading-none">Price</span>
                      <span className="text-xl font-extrabold text-[#1B1310] font-mono tabular-nums">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.customizations && (
                        <button
                          onClick={() => openCustomizer(item)}
                          disabled={!item.isAvailable}
                          className="p-2 text-xs text-[#785A4B] hover:text-[#1B1310] hover:bg-[#F4EBE1] rounded-xl transition-colors disabled:opacity-40"
                          title="Customize Options"
                        >
                          <SlidersHorizontal className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleAddDirectOrCustomize(item)}
                        disabled={!item.isAvailable}
                        className="px-4 py-2 bg-[#E86034] hover:bg-[#D24E23] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Customizer Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EADECF] space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4EBE1]">
              <div>
                <h3 className="text-lg font-bold text-[#1B1310]">{customizingItem.name}</h3>
                <span className="text-xs text-[#785A4B]">Customize to your preference</span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="p-1 rounded-full text-[#785A4B] hover:bg-[#F4EBE1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Milk Option */}
            {customizingItem.customizations?.milk && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#574035]">
                  Choice of Milk
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.customizations.milk.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedMilk(opt)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-left flex items-center justify-between transition-colors ${
                        selectedMilk === opt
                          ? 'border-[#E86034] bg-[#E86034]/10 text-[#E86034] font-semibold'
                          : 'border-[#D8C7B5] text-[#574035]'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {selectedMilk === opt && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sugar Option */}
            {customizingItem.customizations?.sugar && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#574035]">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {customizingItem.customizations.sugar.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedSugar(opt)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-left flex items-center justify-between transition-colors ${
                        selectedSugar === opt
                          ? 'border-[#E86034] bg-[#E86034]/10 text-[#E86034] font-semibold'
                          : 'border-[#D8C7B5] text-[#574035]'
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {selectedSugar === opt && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Cheese for Pizza or Pasta */}
            {customizingItem.customizations?.cheese && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#574035]">
                  Cheese Upgrades
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#D8C7B5] bg-[#FAF6F0] cursor-pointer hover:border-[#E86034]">
                  <input
                    type="checkbox"
                    checked={extraCheese}
                    onChange={(e) => setExtraCheese(e.target.checked)}
                    className="w-4 h-4 accent-[#E86034] rounded"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#1B1310] block">Double Cheese Burst</span>
                    <span className="text-[#785A4B]">+₹50 · Extra melted mozzarella layer</span>
                  </div>
                </label>
              </div>
            )}

            {/* Special Instructions Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#574035]">
                Special Request (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra hot, separate dressing, less ice..."
                value={itemNote}
                onChange={(e) => setItemNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
              />
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-3 border-t border-[#F4EBE1] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#785A4B] block">Total with Add-ons</span>
                <span className="text-xl font-bold font-mono text-[#1B1310]">
                  ₹
                  {customizingItem.price +
                    (extraCheese ? 50 : 0) +
                    (selectedMilk &&
                    (selectedMilk.includes('+₹40') ||
                      selectedMilk.includes('Oat') ||
                      selectedMilk.includes('Almond'))
                      ? 40
                      : selectedMilk && selectedMilk.includes('+₹20')
                      ? 20
                      : 0)}
                </span>
              </div>
              <button
                onClick={handleConfirmCustomization}
                className="px-6 py-2.5 bg-[#E86034] hover:bg-[#D24E23] text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
              >
                Add to Order Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
