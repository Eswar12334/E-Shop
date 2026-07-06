/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { name, price, description, category, subCategory, image, rating, reviewsCount, stock, tags, specifications } = product;

  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/95 border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 shadow-sm transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side - Image & Badges */}
        <div className="md:w-1/2 bg-slate-50 p-6 flex items-center justify-center relative border-r border-slate-100">
          <img
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[350px] object-cover rounded-2xl shadow-sm"
          />
          {isWishlisted ? (
            <button
              onClick={() => onToggleWishlist(product)}
              className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 border border-red-100 text-red-500 shadow-sm"
            >
              <Heart className="h-5 w-5 fill-current" />
            </button>
          ) : (
            <button
              onClick={() => onToggleWishlist(product)}
              className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 shadow-sm"
            >
              <Heart className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Right Side - Details & Specs */}
        <div className="md:w-1/2 p-6 overflow-y-auto max-h-[450px] md:max-h-[90vh] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-1 uppercase tracking-wider">
              {category} • {subCategory}
            </span>
            <h2 className="mt-3 font-display text-xl font-bold text-slate-900 leading-tight">
              {name}
            </h2>

            {/* Ratings & Reviews */}
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <span className="text-sm font-bold text-slate-800 font-mono">{rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 font-mono">{formattedPrice}</span>
              <span className="text-xs text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded border border-green-100">Inclusive of all taxes</span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {description}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Product Specifications Table */}
            {specifications && Object.keys(specifications).length > 0 && (
              <div className="mt-6 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Specifications</h3>
                </div>
                <table className="w-full text-left text-xs">
                  <tbody>
                    {Object.entries(specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-2 font-bold text-slate-500 w-1/3">{key}</td>
                        <td className="px-4 py-2 text-slate-800 font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add to Cart / Actions Section */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            {/* Delivery Assurance Small Badges */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-[10px] font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Truck className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                <span>Secure UPI</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <RefreshCw className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                <span>7 Days Return</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {stock > 0 && (
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-slate-800 text-sm font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="h-8 w-8 rounded-lg bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              )}

              {stock === 0 ? (
                <button
                  disabled
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-100 text-slate-400 font-bold text-sm cursor-not-allowed text-center"
                >
                  Out of Stock
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="h-4.5 w-4.5" /> Add to Cart (₹{(price * quantity).toLocaleString('en-IN')})
                </button>
              )}
            </div>

            {stock > 0 && (
              <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">
                {stock} units currently available in stock.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
