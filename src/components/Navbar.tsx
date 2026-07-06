/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, ClipboardList, Menu, X, Store, Sparkles, User as UserIcon, LogOut, Receipt } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, Product, User } from '../types';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  activeTab: 'home' | 'shop' | 'wishlist' | 'orders';
  setActiveTab: (tab: 'home' | 'shop' | 'wishlist' | 'orders') => void;
  onOpenCart: () => void;
  user: User | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({
  searchQuery,
  setSearchQuery,
  cart,
  wishlist,
  activeTab,
  setActiveTab,
  onOpenCart,
  user,
  onOpenLogin,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const navTabs = [
    { id: 'home' as const, label: 'Home Dashboard', icon: Store },
    { id: 'shop' as const, label: 'Explore Catalog', icon: Sparkles },
    { id: 'wishlist' as const, label: 'My Wishlist', icon: Heart, count: wishlist.length, badgeColor: 'bg-red-500' },
    { id: 'orders' as const, label: 'Order History', icon: ClipboardList },
  ];

  return (
    <>
      {/* ========================================================
          DESKTOP SIDEBAR PORTAL (Left-aligned sidebar panel)
         ======================================================== */}
      <aside 
        id="eshop-desktop-sidebar" 
        className="hidden md:flex flex-col fixed inset-y-0 left-0 w-68 bg-slate-900 border-r border-slate-800 z-40 text-slate-100"
      >
        {/* Top Branding Block */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="p-6 border-b border-slate-800/80 flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 group-hover:scale-105 transition-transform">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <span className="font-display text-2.5xl font-black tracking-tighter text-white flex items-center gap-1 leading-none">
              E-shop
              <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded-full border border-indigo-900/50 uppercase tracking-wider">INR</span>
            </span>
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black mt-1">Premium Indian Hub</p>
          </div>
        </div>

        {/* Desktop Sidebar Navigation List */}
        <div className="flex-1 px-4 py-6 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3.5 mb-3.5">Main Portal</p>
          
          <nav className="space-y-1.5 relative">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 hover:bg-slate-950/30 hover:text-white'
                  }`}
                >
                  {/* Sliding Spring Highlight Background */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute inset-0 bg-indigo-950/40 border border-indigo-900/40 rounded-2xl z-0"
                      transition={{ type: "spring", stiffness: 150, damping: 18 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-3.5">
                    <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    {tab.label}
                  </span>

                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full ${tab.badgeColor} text-[10px] font-black text-white px-1 shadow-sm`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Cart Trigger inside Sidebar */}
          <div className="pt-6 border-t border-slate-800/60 mt-6 space-y-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3.5">Checkout Deck</p>
            <button
              onClick={onOpenCart}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-950/50 border border-slate-800/85 hover:border-slate-700/90 rounded-2xl text-slate-200 hover:text-white transition-all cursor-pointer group"
            >
              <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                <ShoppingBag className="h-4.5 w-4.5 text-indigo-400 transition-transform group-hover:scale-110" />
                Shopping Cart
              </span>
              <span className="flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white px-1 shadow-md shadow-indigo-950/40">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* User profile card pinned to bottom of sidebar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          {user ? (
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white shrink-0 shadow-inner">
                  {getUserInitials(user.fullName)}
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs font-bold leading-tight text-white truncate">{user.fullName}</span>
                  <span className="text-[9px] font-mono text-slate-500 mt-0.5">Verified Shopper</span>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Log Out Session"
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors cursor-pointer shrink-0 ml-1"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="w-full flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 p-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-950/20 transition-all cursor-pointer"
            >
              <UserIcon className="h-4 w-4" />
              Sign In To Buy
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================
          MOBILE/TABLET HEADER BAR (Top floating horizontal header)
         ======================================================== */}
      <header 
        id="eshop-mobile-navbar" 
        className="md:hidden sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md text-slate-100 h-16 flex items-center"
      >
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display text-lg font-black tracking-tighter text-white">
                  E-shop
                </span>
                <p className="text-[8px] font-mono text-slate-500 font-bold leading-none uppercase">INR Hub</p>
              </div>
            </div>

            {/* Icons deck */}
            <div className="flex items-center gap-1.5">
              {/* Quick wishlist */}
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`relative p-2 rounded-xl cursor-pointer ${
                  activeTab === 'wishlist' ? 'bg-red-950/30 text-red-400' : 'text-slate-400'
                }`}
              >
                <Heart className={`h-4.5 w-4.5 ${activeTab === 'wishlist' ? 'fill-red-500' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-1 ring-slate-950 animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Quick Cart trigger */}
              <button
                onClick={onOpenCart}
                className="flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1.5 text-white cursor-pointer"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-[10px] font-black text-white">
                  {cartCount}
                </span>
              </button>

              {/* Login profile on Mobile */}
              {user ? (
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white shrink-0 border border-indigo-500" onClick={() => setActiveTab('orders')}>
                  {getUserInitials(user.fullName)}
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="p-2 rounded-xl text-indigo-400 bg-indigo-950/30 border border-indigo-900/35 cursor-pointer"
                >
                  <UserIcon className="h-4.5 w-4.5" />
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-900 cursor-pointer ml-0.5"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-slate-950 border-b border-slate-850 z-30 px-4 py-4 shadow-2xl flex flex-col gap-2">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive ? 'bg-indigo-950/50 text-indigo-400 border border-indigo-900/45' : 'text-slate-400 hover:bg-slate-900 text-left'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4.5 w-4.5" />
                  {tab.label}
                </span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white px-1">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          {user ? (
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 mt-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-black text-white shrink-0">
                  {getUserInitials(user.fullName)}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{user.fullName}</p>
                  <p className="text-[9px] font-mono text-slate-500 mt-0.5">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 w-full py-3 mt-3 rounded-2xl text-xs font-bold uppercase tracking-wider text-white"
            >
              <UserIcon className="h-4 w-4" /> Sign In To Account
            </button>
          )}
        </div>
      )}
    </>
  );
}
