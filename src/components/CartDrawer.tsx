/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, Tag, ShoppingCart, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: (calculations: {
    subtotal: number;
    discount: number;
    shipping: number;
    gst: number;
    total: number;
    appliedCoupon: string;
  }) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Cart Calculations
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  // Calculate Promo Code Discounts
  let discount = 0;
  if (appliedCoupon === 'FESTIVE10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'IND500') {
    discount = subtotal >= 2000 ? 500 : 0;
  } else if (appliedCoupon === 'WELCOME') {
    discount = Math.min(150, subtotal);
  }

  // 18% standard Indian Goods & Services Tax (GST)
  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(taxableAmount * 0.18);

  // Free shipping above ₹1,000, else ₹120
  const shipping = taxableAmount >= 1000 || taxableAmount === 0 ? 0 : 120;
  const grandTotal = taxableAmount + gst + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (!code) return;

    if (code === 'FESTIVE10') {
      setAppliedCoupon('FESTIVE10');
      setCouponSuccess('FESTIVE10: 10% discount applied successfully!');
    } else if (code === 'IND500') {
      if (subtotal < 2000) {
        setCouponError('This coupon requires a minimum purchase of ₹2,000');
      } else {
        setAppliedCoupon('IND500');
        setCouponSuccess('IND500: Flat ₹500 discount applied!');
      }
    } else if (code === 'WELCOME') {
      setAppliedCoupon('WELCOME');
      setCouponSuccess('WELCOME: Flat ₹150 discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME, FESTIVE10, or IND500');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponCode('');
    setCouponSuccess('');
    setCouponError('');
  };

  const handleStartCheckout = () => {
    onCheckout({
      subtotal,
      discount,
      shipping,
      gst,
      total: grandTotal,
      appliedCoupon,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      {/* Tap out zone */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-indigo-600" />
            <h2 className="font-display font-bold text-slate-900 text-base">Your Cart</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body - Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="h-16 w-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base">Your cart is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1.5">
                Explore our catalog with more than 100 premium products and find the perfect deals for yourself.
              </p>
              <button
                onClick={onClose}
                className="mt-5 rounded-full bg-indigo-600 text-white px-6 py-2.5 text-xs font-bold hover:bg-indigo-700 transition-all active:scale-95 cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-4.5 first:pt-0 last:pb-0 group">
                {/* Thumb */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold">
                      Category: {item.product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Toggles */}
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="h-6 w-6 rounded-lg bg-white text-xs font-bold hover:bg-slate-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="h-6 w-6 rounded-lg bg-white text-xs font-bold hover:bg-slate-100 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Price and Delete */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onRemoveFromCart(item.product.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer - Pricing Breakdown & Promos */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-4">
            
            {/* Promo Code Form */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. WELCOME)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="submit"
                  className="rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold px-4 py-2.5 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Tag className="h-3.5 w-3.5 text-indigo-400" /> Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between rounded-2xl bg-indigo-50 border border-indigo-100 px-3.5 py-2">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-indigo-600 animate-bounce" />
                  <div>
                    <p className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">Coupon Applied</p>
                    <p className="text-xs font-bold text-indigo-900 font-mono">{appliedCoupon}</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs font-bold text-indigo-700 hover:text-red-600 transition-colors underline"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Error / Success messages */}
            {couponError && <p className="text-[10px] font-bold text-red-600 font-mono">{couponError}</p>}
            {couponSuccess && <p className="text-[10px] font-bold text-green-600 font-mono">{couponSuccess}</p>}

            {/* Helpful promo suggestions if none active */}
            {!appliedCoupon && (
              <div className="text-[10px] text-slate-500 flex gap-2 overflow-x-auto pb-1">
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-full cursor-pointer font-mono font-bold hover:border-indigo-200" onClick={() => setCouponCode('WELCOME')}>WELCOME (₹150 off)</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-full cursor-pointer font-mono font-bold hover:border-indigo-200" onClick={() => setCouponCode('FESTIVE10')}>FESTIVE10 (10% off)</span>
              </div>
            )}

            {/* Price Calculations Table */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-slate-950">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Promo Discount</span>
                  <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  GST (18% Standard)
                </span>
                <span className="font-mono text-slate-950">₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-semibold uppercase text-[10px] tracking-wider bg-green-50 px-1.5 py-0.5 rounded border border-green-100">FREE</span>
                ) : (
                  <span className="font-mono text-slate-950">₹{shipping}</span>
                )}
              </div>

              {shipping > 0 && (
                <p className="text-[9px] text-slate-400 text-right">
                  Add ₹{(1000 - taxableAmount).toLocaleString('en-IN')} more to unlock **FREE Delivery**!
                </p>
              )}

              <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="font-mono text-base text-indigo-600">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Safe checkout stamp and CTA button */}
            <div className="pt-2">
              <button
                onClick={handleStartCheckout}
                className="w-full py-3 px-5 rounded-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Proceed to Secure Checkout <ArrowRight className="h-4 w-4" />
              </button>
              
              <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-400 mt-3 text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span>Verified 256-bit Secure SSL Checkout Protection</span>
              </div>
            </div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
