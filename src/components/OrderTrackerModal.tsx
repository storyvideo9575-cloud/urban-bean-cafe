import React from 'react';
import { useCafe } from '../context/CafeContext';
import { OrderStatus } from '../types';
import {
  X,
  CheckCircle2,
  Clock,
  Bike,
  Coffee,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const STAGES: { status: OrderStatus; label: string; desc: string }[] = [
  {
    status: 'received',
    label: 'Order Confirmed',
    desc: 'Urban Bean baristas received your ticket',
  },
  {
    status: 'brewing',
    label: 'Brewing & Baking',
    desc: 'Espresso pulling & hand-stretched crust baking',
  },
  {
    status: 'out_for_delivery',
    label: 'Out for Delivery / Ready',
    desc: 'Rider is on the way across Bhopal streets',
  },
  {
    status: 'completed',
    label: 'Delivered / Completed',
    desc: 'Freshly served! Enjoy your meal',
  },
];

export const OrderTrackerModal: React.FC = () => {
  const {
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    orders,
    updateOrderStatus,
  } = useCafe();

  if (!activeTrackingOrderId) return null;

  const currentOrder = orders.find((o) => o.id === activeTrackingOrderId);
  if (!currentOrder) return null;

  const currentStageIndex = STAGES.findIndex((s) => s.status === currentOrder.status);

  const advanceStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      updateOrderStatus(currentOrder.id, STAGES[currentStageIndex + 1].status);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#EADECF] my-6 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F4EBE1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#E86034] uppercase tracking-wider">
                Order Live Tracker
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#1B1310] font-mono">
                {currentOrder.id}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setActiveTrackingOrderId(null)}
            className="p-1.5 rounded-full text-[#785A4B] hover:bg-[#FAF6F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Tracker Flow */}
        <div className="py-6">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EADECF]">
            {STAGES.map((stage, idx) => {
              const isPast = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div key={stage.status} className="relative flex items-start gap-4">
                  {/* Dot / Check indicator */}
                  <div
                    className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isPast
                        ? 'bg-[#E86034] border-[#E86034] text-white shadow-xs'
                        : 'bg-white border-[#D8C7B5] text-transparent'
                    }`}
                  >
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-[#E86034]'
                          : isPast
                          ? 'text-[#1B1310]'
                          : 'text-[#785A4B]'
                      }`}
                    >
                      {stage.label}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#E86034]/15 text-[#E86034] animate-pulse">
                          In Progress
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-[#785A4B] mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details Summary */}
        <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#EADECF] space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#EADECF]">
            <span className="font-bold text-[#1B1310]">Order Summary</span>
            <span className="text-[#785A4B]">
              {new Date(currentOrder.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
            {currentOrder.items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-[#574035]">
                <span>
                  {i.quantity}x {i.item.name}
                </span>
                <span className="font-mono tabular-nums text-[#1B1310]">
                  ₹{i.totalPrice}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EADECF] flex justify-between font-bold text-[#1B1310]">
            <span>Total Paid ({currentOrder.paymentMethod.toUpperCase()})</span>
            <span className="font-mono tabular-nums text-sm text-[#E86034]">
              ₹{currentOrder.total}
            </span>
          </div>

          {currentOrder.orderType === 'delivery' && currentOrder.deliveryAddress && (
            <div className="pt-2 flex items-start gap-1.5 text-[#574035]">
              <MapPin className="w-3.5 h-3.5 text-[#E86034] shrink-0 mt-0.5" />
              <span>
                {currentOrder.bhopalArea} · {currentOrder.deliveryAddress}
              </span>
            </div>
          )}
        </div>

        {/* Live Simulator & Call Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          {currentStageIndex < STAGES.length - 1 ? (
            <button
              onClick={advanceStage}
              className="flex-1 py-2.5 px-4 bg-[#1B1310] hover:bg-[#3E2D25] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Simulate Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex-1 text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
              ✓ Order Successfully Completed
            </div>
          )}

          <a
            href="tel:+919876543210"
            className="py-2.5 px-4 bg-[#EADECF] hover:bg-[#D8C7B5] text-[#1B1310] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E86034]" />
            <span>Call Urban Bean Barista</span>
          </a>
        </div>
      </div>
    </div>
  );
};
