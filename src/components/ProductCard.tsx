/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}: ProductCardProps) {
  const { name, price, category, subCategory, image, rating, reviewsCount, stock, featured } = product;
  
  // Interactive 3D Perspective Tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert mouse coordinates into rotation values (-12 to +12 degrees)
    const rx = ((y / rect.height) - 0.5) * -12;
    const ry = ((x / rect.width) - 0.5) * 12;
    
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer"
    >
      {/* Dynamic light highlight overlay inside card */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15), transparent)`,
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
      />

      {/* Badges / Hearts */}
      <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5" style={{ transform: 'translateZ(20px)' }}>
        {featured && (
          <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[9px] font-extrabold text-white uppercase tracking-wider shadow-sm">
            Best Seller
          </span>
        )}
        {stock === 0 ? (
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider border border-slate-700">
            Sold Out
          </span>
        ) : stock < 8 ? (
          <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[9px] font-extrabold text-white uppercase tracking-wider">
            Only {stock} Left
          </span>
        ) : null}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={`absolute top-3.5 right-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/90 backdrop-blur-sm shadow-sm border border-slate-800 transition-transform hover:scale-115 active:scale-90 ${
          isWishlisted ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        style={{ transform: 'translateZ(25px)' }}
      >
        <Heart className={`h-4.5 w-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Block with visual zoom */}
      <div 
        className="relative aspect-square overflow-hidden bg-slate-950" 
        onClick={() => onSelectProduct(product)}
        style={{ transform: 'translateZ(10px)' }}
      >
        <img
          src={image}
          alt={name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-slate-900/95 px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-slate-100 flex items-center gap-1.5 shadow-md border border-slate-800">
            <Eye className="h-3.5 w-3.5 text-indigo-400" /> Quick View
          </div>
        </div>
      </div>

      {/* Content Block */}
      <div className="flex flex-1 flex-col p-4.5" style={{ transform: 'translateZ(15px)' }}>
        {/* Category Info */}
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
          {category} • {subCategory}
        </p>

        {/* Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          className="mt-1 font-sans text-sm font-extrabold text-slate-100 line-clamp-2 hover:text-indigo-400 cursor-pointer flex-1 leading-snug transition-colors"
        >
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold text-slate-200 font-mono">{rating.toFixed(1)}</span>
          <span className="text-[10px] text-slate-500 font-bold">({reviewsCount} reviews)</span>
        </div>

        {/* Price & Cart Actions */}
        <div className="mt-4 flex items-center justify-between gap-2 pt-3.5 border-t border-slate-800">
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase block leading-none mb-1">Price</span>
            <span className="text-base font-extrabold text-slate-100 font-mono tracking-tight">{formattedPrice}</span>
          </div>

          {stock === 0 ? (
            <button
              disabled
              className="flex h-9.5 items-center justify-center rounded-xl bg-slate-950 px-3.5 text-xs font-bold text-slate-500 cursor-not-allowed border border-slate-850"
            >
              Out of Stock
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-950/40 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-900/55 transition-colors cursor-pointer group/btn"
              title="Add to Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5 transition-transform group-hover/btn:scale-110" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
