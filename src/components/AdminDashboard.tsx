import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { OrderStatus, FoodCategory } from '../types';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Calendar,
  Coffee,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
  Edit2,
  X,
  Eye,
  Sliders,
  Sparkles,
  Users,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    setCurrentTab,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    menuItems,
    updateMenuItemPrice,
    toggleItemAvailability,
    addCustomMenuItem,
    reviews,
  } = useCafe();

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<
    'orders' | 'reservations' | 'menu' | 'reviews'
  >('orders');

  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);

  // New item modal
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<FoodCategory>('Coffee');
  const [newItemPrice, setNewItemPrice] = useState(149);
  const [newItemDesc, setNewItemDesc] = useState('');

  // Calculations
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;
  const confirmedRes = reservations.filter((r) => r.status === 'confirmed').length;

  const filteredOrders =
    orderFilter === 'all'
      ? orders
      : orders.filter((o) => o.status === orderFilter);

  const handleSavePrice = (id: string) => {
    if (editPriceVal > 0) {
      updateMenuItemPrice(id, editPriceVal);
    }
    setEditingItemId(null);
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemDesc.trim()) return;

    addCustomMenuItem({
      name: newItemName.trim(),
      category: newItemCategory,
      price: newItemPrice,
      description: newItemDesc.trim(),
      isVeg: true,
      isAvailable: true,
      prepTime: '8 mins',
      calories: '220 kcal',
    });

    setShowAddItemModal(false);
    setNewItemName('');
    setNewItemDesc('');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1B1310] text-white p-6 rounded-3xl shadow-lg border border-[#2D201A]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E86034] flex items-center justify-center text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E5A93C] font-semibold">
                Urban Bean Café MP Nagar
              </span>
              <h1 className="text-2xl font-bold font-display">Staff & Admin Operations</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentTab('home')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[#D8C7B5] hover:text-white text-xs font-semibold rounded-xl transition-colors"
            >
              ← Back to Customer Website
            </button>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-[#EADECF] shadow-xs">
            <div className="flex items-center justify-between text-[#785A4B] text-xs mb-1">
              <span>Today's Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-2xl font-black font-mono text-[#1B1310] tabular-nums">
              ₹{totalSales.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-700 block mt-1 font-medium">
              Across all dine-in & deliveries
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#EADECF] shadow-xs">
            <div className="flex items-center justify-between text-[#785A4B] text-xs mb-1">
              <span>Active Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#E86034]" />
            </div>
            <span className="text-2xl font-black font-mono text-[#1B1310] tabular-nums">
              {pendingOrders}
            </span>
            <span className="text-[11px] text-[#E86034] block mt-1 font-medium">
              In kitchen & delivery pipeline
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#EADECF] shadow-xs">
            <div className="flex items-center justify-between text-[#785A4B] text-xs mb-1">
              <span>Table Bookings</span>
              <Calendar className="w-4 h-4 text-[#E5A93C]" />
            </div>
            <span className="text-2xl font-black font-mono text-[#1B1310] tabular-nums">
              {confirmedRes}
            </span>
            <span className="text-[11px] text-[#785A4B] block mt-1 font-medium">
              Confirmed for today
            </span>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#EADECF] shadow-xs">
            <div className="flex items-center justify-between text-[#785A4B] text-xs mb-1">
              <span>Live Menu Items</span>
              <Coffee className="w-4 h-4 text-[#574035]" />
            </div>
            <span className="text-2xl font-black font-mono text-[#1B1310] tabular-nums">
              {menuItems.filter((m) => m.isAvailable).length} / {menuItems.length}
            </span>
            <span className="text-[11px] text-[#785A4B] block mt-1 font-medium">
              In-stock kitchen items
            </span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#EADECF] w-fit">
          <button
            onClick={() => setActiveAdminSubTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeAdminSubTab === 'orders'
                ? 'bg-[#1B1310] text-white shadow-xs'
                : 'text-[#574035] hover:text-[#1B1310]'
            }`}
          >
            Live Kitchen Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminSubTab('reservations')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeAdminSubTab === 'reservations'
                ? 'bg-[#1B1310] text-white shadow-xs'
                : 'text-[#574035] hover:text-[#1B1310]'
            }`}
          >
            Table Reservations ({reservations.length})
          </button>
          <button
            onClick={() => setActiveAdminSubTab('menu')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeAdminSubTab === 'menu'
                ? 'bg-[#1B1310] text-white shadow-xs'
                : 'text-[#574035] hover:text-[#1B1310]'
            }`}
          >
            Menu Stock & Pricing ({menuItems.length})
          </button>
          <button
            onClick={() => setActiveAdminSubTab('reviews')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeAdminSubTab === 'reviews'
                ? 'bg-[#1B1310] text-white shadow-xs'
                : 'text-[#574035] hover:text-[#1B1310]'
            }`}
          >
            Guest Feedback ({reviews.length})
          </button>
        </div>

        {/* Orders Tab */}
        {activeAdminSubTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#EADECF] shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#1B1310]">Kitchen Tickets & Orders</h3>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {['all', 'received', 'brewing', 'out_for_delivery', 'completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setOrderFilter(f)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-colors ${
                      orderFilter === f
                        ? 'bg-[#E86034] text-white'
                        : 'bg-[#FAF6F0] text-[#574035] hover:bg-[#EADECF]'
                    }`}
                  >
                    {f.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="text-xs text-[#785A4B] py-8 text-center">
                No orders found under this status.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#EADECF] text-[#785A4B] uppercase tracking-wider font-semibold">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Type & Address</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Current Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4EBE1]">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#FAF6F0]/60">
                        <td className="py-3 font-mono font-bold text-[#1B1310]">{o.id}</td>
                        <td className="py-3">
                          <span className="font-bold text-[#1B1310] block">{o.customerName}</span>
                          <span className="text-[#785A4B] font-mono text-[11px]">{o.customerPhone}</span>
                        </td>
                        <td className="py-3">
                          <span className="uppercase font-semibold text-[10px] px-2 py-0.5 rounded bg-[#FAF6F0] text-[#574035] border border-[#D8C7B5]">
                            {o.orderType}
                          </span>
                          {o.bhopalArea && (
                            <span className="block text-[11px] text-[#785A4B] mt-0.5">
                              {o.bhopalArea}
                            </span>
                          )}
                          {o.tableNumber && (
                            <span className="block text-[11px] font-bold text-[#E86034]">
                              {o.tableNumber}
                            </span>
                          )}
                        </td>
                        <td className="py-3 max-w-[200px] truncate text-[#574035]">
                          {o.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                        </td>
                        <td className="py-3 font-mono font-bold text-[#1B1310] tabular-nums">
                          ₹{o.total}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                              o.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.status === 'brewing'
                                ? 'bg-[#E5A93C]/20 text-[#9b6f1f]'
                                : o.status === 'out_for_delivery'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-[#E86034]/15 text-[#E86034]'
                            }`}
                          >
                            {o.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 text-right space-x-1">
                          {o.status === 'received' && (
                            <button
                              onClick={() => updateOrderStatus(o.id, 'brewing')}
                              className="px-2.5 py-1 bg-[#1B1310] text-white rounded-lg text-[11px] font-semibold hover:bg-[#3E2D25]"
                            >
                              Start Prep
                            </button>
                          )}
                          {o.status === 'brewing' && (
                            <button
                              onClick={() => updateOrderStatus(o.id, 'out_for_delivery')}
                              className="px-2.5 py-1 bg-[#E86034] text-white rounded-lg text-[11px] font-semibold hover:bg-[#D24E23]"
                            >
                              Dispatch
                            </button>
                          )}
                          {o.status === 'out_for_delivery' && (
                            <button
                              onClick={() => updateOrderStatus(o.id, 'completed')}
                              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700"
                            >
                              Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Reservations Tab */}
        {activeAdminSubTab === 'reservations' && (
          <div className="bg-white rounded-3xl p-6 border border-[#EADECF] shadow-xs space-y-5">
            <h3 className="text-lg font-bold text-[#1B1310]">Table Booking Registry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EADECF] text-[#785A4B] uppercase tracking-wider font-semibold">
                    <th className="pb-3">Booking Ref</th>
                    <th className="pb-3">Guest Name & Phone</th>
                    <th className="pb-3">Date & Slot</th>
                    <th className="pb-3">Party Size</th>
                    <th className="pb-3">Seating Zone</th>
                    <th className="pb-3">Special Requests</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EBE1]">
                  {reservations.map((r) => (
                    <tr key={r.id} className="hover:bg-[#FAF6F0]/60">
                      <td className="py-3 font-mono font-bold text-[#1B1310]">{r.id}</td>
                      <td className="py-3">
                        <span className="font-bold text-[#1B1310] block">{r.customerName}</span>
                        <span className="text-[#785A4B] font-mono text-[11px]">{r.phone}</span>
                      </td>
                      <td className="py-3 font-semibold text-[#1B1310]">
                        {r.date} · {r.timeSlot}
                      </td>
                      <td className="py-3 font-bold text-[#574035]">{r.guests} Guests</td>
                      <td className="py-3 text-[#E86034] font-medium">{r.seatingZone}</td>
                      <td className="py-3 text-[#785A4B] max-w-[150px] truncate">
                        {r.specialRequests || 'None'}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            r.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : r.status === 'seated'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 text-right space-x-1">
                        {r.status === 'confirmed' && (
                          <button
                            onClick={() => updateReservationStatus(r.id, 'seated')}
                            className="px-2.5 py-1 bg-[#1B1310] text-white rounded-lg text-[11px] font-semibold hover:bg-[#3E2D25]"
                          >
                            Mark Seated
                          </button>
                        )}
                        {r.status === 'seated' && (
                          <button
                            onClick={() => updateReservationStatus(r.id, 'completed')}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700"
                          >
                            Mark Free
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Menu Tab */}
        {activeAdminSubTab === 'menu' && (
          <div className="bg-white rounded-3xl p-6 border border-[#EADECF] shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1B1310]">Menu Inventory & Prices</h3>
                <span className="text-xs text-[#785A4B]">
                  Update live availability or modify pricing instantly.
                </span>
              </div>
              <button
                onClick={() => setShowAddItemModal(true)}
                className="px-4 py-2 bg-[#E86034] hover:bg-[#D24E23] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-[#EADECF] bg-[#FAF6F0] flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#785A4B] block">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#1B1310]">{item.name}</h4>
                    </div>

                    <button
                      onClick={() => toggleItemAvailability(item.id)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                        item.isAvailable
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#EADECF] flex items-center justify-between">
                    {editingItemId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editPriceVal}
                          onChange={(e) => setEditPriceVal(Number(e.target.value))}
                          className="w-20 px-2 py-1 text-xs bg-white border border-[#E86034] rounded-lg font-mono"
                        />
                        <button
                          onClick={() => handleSavePrice(item.id)}
                          className="px-2.5 py-1 bg-[#E86034] text-white text-[10px] font-bold rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="text-[#785A4B] text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-mono text-[#1B1310]">
                          ₹{item.price}
                        </span>
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setEditPriceVal(item.price);
                          }}
                          className="p-1 text-[#785A4B] hover:text-[#1B1310]"
                          title="Edit Price"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <span className="text-[11px] text-[#785A4B]">
                      {item.prepTime || 'Fresh Prep'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeAdminSubTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-6 border border-[#EADECF] shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-[#1B1310]">Customer Feedback Moderation</h3>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EADECF] flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1B1310]">{rev.name}</span>
                      <span className="text-xs text-[#785A4B]">({rev.role})</span>
                      <span className="text-xs font-mono font-bold text-[#E5A93C]">
                        ★ {rev.rating}/5
                      </span>
                    </div>
                    <p className="text-xs text-[#574035] mt-1.5 leading-relaxed">
                      "{rev.comment}"
                    </p>
                    {rev.favoriteItem && (
                      <span className="text-[10px] text-[#E86034] font-medium block mt-1">
                        Favorite dish: {rev.favoriteItem}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#785A4B] shrink-0 font-mono">
                    {rev.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add New Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EADECF] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4EBE1]">
              <h3 className="text-lg font-bold text-[#1B1310]">Add New Menu Item</h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="p-1 rounded-full text-[#785A4B] hover:bg-[#FAF6F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#574035] block mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pistachio Matcha Latte"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as FoodCategory)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  >
                    {['Coffee', 'Pizza', 'Snacks', 'Pasta', 'Burgers', 'Beverages', 'Desserts'].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574035] block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#574035] block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Appetizing description of ingredients, flavor profile..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full p-3 text-xs bg-[#FAF6F0] border border-[#D8C7B5] rounded-xl focus:outline-none focus:border-[#E86034]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E86034] hover:bg-[#D24E23] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                Add Item to Menu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
