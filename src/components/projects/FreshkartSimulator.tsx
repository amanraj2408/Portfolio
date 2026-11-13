"use client";

import React, { useState } from "react";
import { ShoppingBag, Plus, Minus, Check, Sparkles, RefreshCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function FreshkartSimulator() {
  const [items, setItems] = useState([
    { id: 1, name: "Avocado Hass", price: 3.49, qty: 2, icon: "🥑" },
    { id: 2, name: "Organic Blueberries", price: 4.99, qty: 1, icon: "🫐" },
    { id: 3, name: "Almond Milk", price: 2.89, qty: 1, icon: "🥛" },
  ]);
  const [checkedOut, setCheckedOut] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.qty + delta);
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const resetItems = () => {
    setItems([
      { id: 1, name: "Avocado Hass", price: 3.49, qty: 2, icon: "🥑" },
      { id: 2, name: "Organic Blueberries", price: 4.99, qty: 1, icon: "🫐" },
      { id: 3, name: "Almond Milk", price: 2.89, qty: 1, icon: "🥛" },
    ]);
    setCheckedOut(false);
  };

  const handleCheckout = () => {
    setCheckedOut(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#10b981", "#3b82f6", "#a855f7"],
    });
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] bg-[#070d10] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-4 font-sans select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-white font-bold tracking-wider">FRESHKART // QUICK-COMMERCE</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{items.reduce((a, b) => a + b.qty, 0)} Items</span>
        </div>
      </div>

      {/* Cart Content */}
      <div className="my-auto py-2 space-y-2 overflow-y-auto max-h-[190px] pr-1">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 hover:border-emerald-500/30 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">
                    ${item.price.toFixed(2)} / ea
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono font-bold text-white text-xs w-4 text-center">
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            Cart is empty.
            <button
              onClick={resetItems}
              className="block mx-auto mt-2 text-emerald-400 underline font-mono cursor-pointer"
            >
              Restore items
            </button>
          </div>
        )}
      </div>

      {/* Bottom Checkout Action */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        <div>
          <span className="text-[11px] font-mono text-slate-400">Total: </span>
          <span className="font-mono font-bold text-white text-sm">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {checkedOut ? (
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Ordered!
            </span>
            <button
              onClick={resetItems}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 cursor-pointer"
              title="Reset simulator"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="px-4 py-1.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-900/30 transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            Instant Checkout ⚡
          </button>
        )}
      </div>

    </div>
  );
}

