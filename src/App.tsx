/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Percent, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  X, 
  HelpCircle,
  TrendingUp,
  Heart,
  ShoppingBag,
  Inbox
} from 'lucide-react';

import { products } from './data/products';
import { Product, CartItem, Order, Filters, User } from './types';

// Component imports
import Navbar from './components/Navbar';
import SidebarFilters from './components/SidebarFilters';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import LoginModal from './components/LoginModal';

// Available categories
const ALL_CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Fitness', 'Books & Stationery'];

const LIVE_EVENTS = [
  { id: '1', city: 'Mumbai', user: 'Amit S.', item: 'Pro Wireless Headphones', action: 'purchased' },
  { id: '2', city: 'Bengaluru', user: 'Priya K.', item: 'LiteSync Smartwatch Series 5', action: 'added to wishlist' },
  { id: '3', city: 'New Delhi', user: 'Rohan Sharma', item: 'Apex Mechanical Keyboard', action: 'redeemed WELCOME coupon' },
  { id: '4', city: 'Chennai', user: 'Sneha R.', item: 'CinemaView Ultra-HD Projector', action: 'purchased' },
  { id: '5', city: 'Hyderabad', user: 'Vikram Reddy', item: 'SoundBar Surround System', action: 'placed a COD order' },
  { id: '6', city: 'Kolkata', user: 'Ananya D.', item: 'Titanium Swift Laptop', action: 'added to cart' },
];

export default function App() {
  // App View States
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'wishlist' | 'orders'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Bento Portal State Hooks
  const [tickerIndex, setTickerIndex] = useState(0);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  // Live timer tick & auto-rotation effects
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', options).format(new Date()));
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 1000);

    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 4500);

    const spotlightTimer = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % 4); // cycle top 4
    }, 6000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(tickerTimer);
      clearInterval(spotlightTimer);
    };
  }, []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    triggerToast(`Coupon "${code}" copied to clipboard!`, 'success');
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // User Authentication States
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('eshop_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('eshop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eshop_user');
    }
  }, [user]);
  
  // Shopping & Persistent Storage States
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('eshop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('eshop_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('eshop_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Overlays / Modals States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [checkoutCalculations, setCheckoutCalculations] = useState<{
    subtotal: number;
    discount: number;
    shipping: number;
    gst: number;
    total: number;
    appliedCoupon: string;
  } | null>(null);

  // Dynamic Custom Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' }[]>([]);

  // Filter Criteria
  const maxProductPrice = useMemo(() => Math.max(...products.map(p => p.price), 100000), []);
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    categories: [],
    priceRange: [0, maxProductPrice],
    rating: 0,
    sortBy: 'featured',
    onlyInStock: false,
  });

  // Sync state to local storage on change
  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eshop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('eshop_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync Search Query from Navbar to Sidebar filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Trigger temporary custom notifications
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Add Item to Cart
  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.stock === 0) {
      triggerToast(`${product.name} is currently out of stock`, 'error');
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          triggerToast(`Cannot add more. Only ${product.stock} items are in stock.`, 'error');
          return prevCart;
        }
        updated[existingIndex].quantity = newQty;
        triggerToast(`Updated quantity for ${product.name} inside cart!`);
        return updated;
      } else {
        triggerToast(`Added ${product.name} to your cart!`);
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Update Cart Item Quantity
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    const item = cart.find(c => c.product.id === productId);
    if (item && quantity > item.product.stock) {
      triggerToast(`Limit exceeded. Only ${item.product.stock} items are in stock.`, 'error');
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (productId: string) => {
    const removedItem = cart.find(c => c.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (removedItem) {
      triggerToast(`Removed ${removedItem.product.name} from shopping cart`, 'info');
    }
  };

  // Toggle Item inside Wishlist
  const handleToggleWishlist = (product: Product) => {
    const isPresent = wishlist.some((item) => item.id === product.id);
    if (isPresent) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      triggerToast(`Removed ${product.name} from your wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      triggerToast(`Saved ${product.name} to your wishlist!`, 'success');
    }
  };

  // Proceed to Checkout
  const handleCheckoutStart = (calcs: any) => {
    setCheckoutCalculations(calcs);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Complete Order
  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart
    setCheckoutOpen(false);
    setCheckoutCalculations(null);
    triggerToast(`Order ${newOrder.id} successfully created!`, 'success');
  };

  // Extract featured products list
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.featured).slice(0, 8);
  }, []);

  // Filter and Sort Products Catalog
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Minimum Rating
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // Stock
    if (filters.onlyInStock) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort criteria
    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'reviews') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } // featured default (no extra sorting)

    return result;
  }, [filters]);

  const activeWishlistIds = useMemo(() => wishlist.map((w) => w.id), [wishlist]);

  // Quick helper to jump into a category search from Home
  const handleCategoryShortcut = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: [categoryName],
    }));
    setActiveTab('shop');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Dynamic Toast Alerts Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`rounded-2xl p-4 shadow-lg border text-xs font-semibold flex items-center justify-between gap-3 ${
                toast.type === 'success'
                  ? 'bg-green-950/90 border-green-900/50 text-green-300'
                  : toast.type === 'error'
                  ? 'bg-red-950/90 border-red-900/50 text-red-300'
                  : 'bg-amber-950/90 border-amber-900/50 text-amber-300'
              }`}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Global Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cart={cart}
        wishlist={wishlist}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCart={() => setCartOpen(true)}
        user={user}
        onOpenLogin={() => setLoginOpen(true)}
        onLogout={() => {
          setUser(null);
          triggerToast('Logged out of E-shop session!', 'info');
        }}
      />

      {/* Primary Layout Sections */}
      <main className="flex-1 pb-16 md:pl-68">
        <AnimatePresence mode="wait">
          
          {/* HOME DASHBOARD TAB */}
          {activeTab === 'home' && (
            <motion.div
              key="home-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12 px-4 sm:px-6 lg:px-8 mt-6"
            >
              {/* Dynamic Header Greeting */}
              <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-inner relative overflow-hidden">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />
                <div className="relative z-10 space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 border border-indigo-900/40 shadow-sm">
                    <Sparkles className="h-3 w-3 animate-spin" /> Authentic Indian Merchandising Hub
                  </span>
                  <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Namaste, {user ? user.fullName.split(' ')[0] : 'Shopper'}! 
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl font-sans">
                    Welcome to your premium e-commerce portal. Explore curated luxury electronics, traditional sarees, beauty, and fitness tools in Indian currency.
                  </p>
                </div>

                {/* Clock & Status Deck */}
                <div className="bg-slate-950/85 border border-slate-800 rounded-2xl p-4 shrink-0 text-center sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Kolkata standard time</p>
                    <p className="text-sm font-black font-mono text-indigo-400 mt-1 tracking-tight">{currentTime || '00:00:00 PM'}</p>
                  </div>
                  <div className="h-px w-8 bg-slate-850 hidden sm:block my-1.5" />
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-green-400 font-bold uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" /> Live Hub Active
                    </span>
                  </div>
                </div>
              </header>

              {/* Spectacular Bento Grid Structure */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* BENTO CARD 1: Cinematic Spotlight Slider (Large, col-span 2) */}
                <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-6 relative overflow-hidden min-h-[420px] shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 to-transparent pointer-events-none z-0" />
                  <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

                  {/* Spotlight Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 font-black uppercase tracking-widest bg-indigo-950/50 px-2.5 py-1 rounded-full border border-indigo-900/40">
                        ✨ Exclusive Spotlight Pick
                      </span>
                      <h2 className="text-lg font-black text-white font-display mt-2.5">Weekly Showcase Special</h2>
                    </div>
                    {/* Page indicators */}
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => setSpotlightIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            spotlightIndex === idx ? 'w-5 bg-indigo-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Active Slide Body */}
                  {featuredProducts[spotlightIndex] && (
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1">
                      {/* Left specs detail column */}
                      <div className="space-y-3.5 order-2 md:order-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase font-sans tracking-wider block">
                          {featuredProducts[spotlightIndex].category} • {featuredProducts[spotlightIndex].subCategory}
                        </span>
                        <h3 
                          onClick={() => setSelectedProduct(featuredProducts[spotlightIndex])}
                          className="text-xl font-black text-white hover:text-indigo-400 cursor-pointer line-clamp-2 leading-tight transition-colors font-sans"
                        >
                          {featuredProducts[spotlightIndex].name}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {featuredProducts[spotlightIndex].description}
                        </p>
                        
                        {/* Short spec grid */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-950/45 p-3 rounded-2xl border border-slate-850">
                          {Object.entries(featuredProducts[spotlightIndex].specifications).slice(0, 2).map(([key, val]) => (
                            <div key={key}>
                              <span className="text-[8px] font-bold uppercase text-slate-500 block">{key}</span>
                              <span className="text-[11px] font-bold text-slate-300 truncate block">{val}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2.5">
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase font-bold block leading-none mb-1">Deal Price</span>
                            <span className="text-lg font-mono font-black text-white">
                              ₹{featuredProducts[spotlightIndex].price.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAddToCart(featuredProducts[spotlightIndex])}
                            className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-indigo-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <ShoppingBag className="h-4 w-4" /> Add To Invoice
                          </button>
                        </div>
                      </div>

                      {/* Right cinematic product frame */}
                      <div className="order-1 md:order-2 flex justify-center relative">
                        <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full scale-75" />
                        <div 
                          onClick={() => setSelectedProduct(featuredProducts[spotlightIndex])}
                          className="h-48 md:h-56 w-48 md:w-56 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative cursor-pointer group/img"
                        >
                          <img
                            src={featuredProducts[spotlightIndex].image}
                            alt={featuredProducts[spotlightIndex].name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover/img:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* BENTO CARD 2: Interactive Coupon Deck (Medium, col-span 1) */}
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/5 blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-900/40">
                      🎟️ ACTIVE DEALS CENTER
                    </span>
                    <h3 className="text-base font-bold text-white mt-4 font-display">Tap Coupon To Redeem</h3>
                    <p className="text-[11px] text-slate-400 leading-normal mt-1.5 font-sans">
                      Redeem these credentials during checkout inside your shopping bag to obtain immediate deductions.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    {/* Code 1 */}
                    <div 
                      onClick={() => handleCopyCoupon('WELCOME')}
                      className={`p-3.5 rounded-2xl bg-slate-950 border transition-all duration-200 cursor-pointer select-none relative group ${
                        copiedCode === 'WELCOME' ? 'border-emerald-500 shadow-sm shadow-emerald-950/30' : 'border-slate-850 hover:border-slate-750'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wide">WELCOME INVOICE</p>
                          <p className="text-sm font-black font-mono text-white mt-0.5 tracking-wider">WELCOME</p>
                        </div>
                        <span className="text-[10px] font-black text-slate-500 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
                          {copiedCode === 'WELCOME' ? 'Copied!' : 'Copy'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 font-sans">Flat ₹150 discount with no minimum spending threshold.</p>
                    </div>

                    {/* Code 2 */}
                    <div 
                      onClick={() => handleCopyCoupon('FESTIVE10')}
                      className={`p-3.5 rounded-2xl bg-slate-950 border transition-all duration-200 cursor-pointer select-none relative group ${
                        copiedCode === 'FESTIVE10' ? 'border-emerald-500 shadow-sm shadow-emerald-950/30' : 'border-slate-850 hover:border-slate-750'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wide">SEASONAL DEDUCTION</p>
                          <p className="text-sm font-black font-mono text-white mt-0.5 tracking-wider">FESTIVE10</p>
                        </div>
                        <span className="text-[10px] font-black text-slate-500 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
                          {copiedCode === 'FESTIVE10' ? 'Copied!' : 'Copy'}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1 font-sans">Get flat 10% reductions applied sitewide.</p>
                    </div>
                  </div>
                </div>

                {/* BENTO CARD 3: Live Orders Ticker (Col-span 1) */}
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-green-500/5 blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-widest bg-green-950/40 px-2.5 py-1 rounded-full border border-green-900/30">
                        ⚡ PAN-INDIA LIVE LOG
                      </span>
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    </div>
                    <h3 className="text-base font-bold text-white mt-4 font-display">Real-time Order Feed</h3>
                    <p className="text-[11px] text-slate-400 leading-normal mt-1.5 font-sans">
                      Simulated ledger tracking secure checkouts of shoppers transacting from cities nationwide.
                    </p>
                  </div>

                  {/* Ticker Box */}
                  <div className="h-24 bg-slate-950 border border-slate-850 rounded-2xl p-3.5 flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tickerIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black font-mono text-indigo-400 uppercase tracking-widest px-1.5 py-0.5 bg-indigo-950/50 border border-indigo-900/40 rounded">
                            {LIVE_EVENTS[tickerIndex].city}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">{LIVE_EVENTS[tickerIndex].user}</span>
                        </div>
                        <p className="text-xs font-extrabold text-white leading-snug line-clamp-1 mt-1">
                          {LIVE_EVENTS[tickerIndex].item}
                        </p>
                        <p className="text-[9px] font-bold text-slate-500">
                          Just {LIVE_EVENTS[tickerIndex].action} • <span className="text-green-400">Verified transaction</span>
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="text-[10px] text-slate-500 flex justify-between font-mono">
                    <span>Updates instantly</span>
                    <span>HTTPS Secured</span>
                  </div>
                </div>

                {/* BENTO CARD 4: Logistical Priority Delivery (Col-span 1) */}
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-indigo-600/5 blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-950/40 px-2.5 py-1 rounded-full border border-indigo-900/30">
                      🚛 DISPATCH GUARANTEE
                    </span>
                    <h3 className="text-base font-bold text-white mt-4 font-display">Express Logistics</h3>
                    <p className="text-[11px] text-slate-400 leading-normal mt-1.5 font-sans">
                      Standard priority courier dispatches are completely free of charge on total checkout values exceeding ₹1,000.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Mumbai hub</span>
                      <span className="text-indigo-400">Delhi Priority</span>
                    </div>
                    {/* Simulated Delivery Path */}
                    <div className="relative h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                      <motion.div 
                        initial={{ width: "10%" }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute h-full bg-gradient-to-r from-indigo-600 to-orange-500" 
                      />
                    </div>
                    <p className="text-[9px] text-slate-500 font-mono">Transit duration is typically within 2-4 business days.</p>
                  </div>
                </div>

                {/* BENTO CARD 5: Authentic Sourcing (Col-span 1) */}
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-teal-500/5 blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-widest bg-teal-950/40 px-2.5 py-1 rounded-full border border-teal-900/30">
                      🛡️ AUTHENTICITY ASSURANCE
                    </span>
                    <h3 className="text-base font-bold text-white mt-4 font-display">100% Genuine Warehouse</h3>
                    <p className="text-[11px] text-slate-400 leading-normal mt-1.5 font-sans">
                      All products featured on our marketplace catalog are sourced straight from authorized original manufacturer units in India.
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 border border-slate-850 px-3 py-1.5 text-[10px] font-bold text-teal-400 font-mono">
                      🔒 SECURED PAYMENT INTEGRATION
                    </span>
                  </div>
                </div>

              </div>

              {/* Browse Categories Shortcut Panel */}
              <section className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <h2 className="font-display text-lg font-black text-white tracking-tight">Explore Major Premium Channels</h2>
                    <p className="text-xs text-slate-500 mt-1">Select any specialized category shortcut to instantly sort catalog listings</p>
                  </div>
                  <button
                    onClick={() => { setFilters(prev => ({ ...prev, categories: [] })); setActiveTab('shop'); }}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    All Channels <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: 'Electronics', count: '18 items', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&auto=format&fit=crop&q=80', color: 'from-blue-600/10' },
                    { name: 'Fashion', count: '18 items', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80', color: 'from-pink-600/10' },
                    { name: 'Home & Living', count: '18 items', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&auto=format&fit=crop&q=80', color: 'from-amber-600/10' },
                    { name: 'Beauty', count: '18 items', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=300&auto=format&fit=crop&q=80', color: 'from-purple-600/10' },
                    { name: 'Fitness', count: '18 items', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&auto=format&fit=crop&q=80', color: 'from-green-600/10' },
                    { name: 'Books & Stationery', count: '18 items', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&auto=format&fit=crop&q=80', color: 'from-teal-600/10' },
                  ].map((cat) => (
                    <div
                      key={cat.name}
                      onClick={() => handleCategoryShortcut(cat.name)}
                      className="group relative h-36 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-4 flex flex-col justify-end cursor-pointer shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all duration-300"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="absolute inset-0 h-full w-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-80`} />
                      <div className="relative z-10">
                        <span className="text-[9px] font-mono text-slate-400 bg-slate-950/95 px-2 py-0.5 rounded-full border border-slate-850">{cat.count}</span>
                        <h3 className="font-sans font-extrabold text-white mt-1.5 text-xs group-hover:text-indigo-400 transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Products Showcase */}
              <section className="space-y-6">
                <div className="border-b border-slate-850 pb-4 mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-lg font-black text-white tracking-tight flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-400" /> Featured Picks of the Week
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Hand-selected premium items featuring direct consumer deals in INR</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={activeWishlistIds.includes(product.id)}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              </section>

            </motion.div>
          )}

          {/* SHOP CATALOG TAB (With sidebar filters and catalog grid) */}
          {activeTab === 'shop' && (
            <motion.div
              key="shop-catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Filters sidebar on Left */}
                <div className="w-full lg:w-1/4 shrink-0">
                  <SidebarFilters
                    filters={filters}
                    setFilters={setFilters}
                    allCategories={ALL_CATEGORIES}
                    maxPrice={maxProductPrice}
                  />
                </div>

                {/* Catalog Grid on Right */}
                <div className="flex-1 space-y-6">
                  
                  {/* Catalog Header with Search feedback */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm">
                    <div>
                      <h2 className="font-sans font-extrabold text-white text-base">Browse Catalog</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {filteredProducts.length === products.length ? (
                          <span>Showing all 108 products across 6 departments</span>
                        ) : (
                          <span>Found {filteredProducts.length} matching products in index</span>
                        )}
                      </p>
                    </div>

                    {/* Active filter badges */}
                    {filters.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active:</span>
                        {filters.categories.map((c) => (
                          <span key={c} className="text-[10px] font-bold text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-900/40 flex items-center gap-1">
                            {c}
                            <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => handleCategoryShortcut(c)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Products Grid */}
                  {filteredProducts.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl py-16 px-4 text-center">
                      <div className="h-14 w-14 bg-orange-950/40 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <h4 className="font-sans font-bold text-white text-base">No products matched your search</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                        We couldn&apos;t find any item matching those specific filters or keyword. Try resetting filters or searching another keyword.
                      </p>
                      <button
                        onClick={() => setFilters({
                          searchQuery: '',
                          categories: [],
                          priceRange: [0, maxProductPrice],
                          rating: 0,
                          sortBy: 'featured',
                          onlyInStock: false,
                        })}
                        className="mt-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence>
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={handleToggleWishlist}
                            isWishlisted={activeWishlistIds.includes(product.id)}
                            onSelectProduct={setSelectedProduct}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          )}

          {/* WISHLIST VIEW TAB */}
          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6"
            >
              <div className="border-b border-slate-900 pb-5 mb-8">
                <h2 className="font-sans text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <Heart className="h-5.5 w-5.5 text-red-500 fill-red-500" /> My Saved Items ({wishlist.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium font-sans">Your saved wishlist products saved locally in this browser cache</p>
              </div>

              {wishlist.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl py-16 px-4 text-center max-w-xl mx-auto">
                  <div className="h-16 w-16 bg-red-950/40 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-7 w-7" />
                  </div>
                  <h4 className="font-sans font-bold text-white text-base">Your wishlist is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 leading-relaxed">
                    Explore E-shop&apos;s product listings and save items to buy later.
                  </p>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="mt-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    Go to Products Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishlist.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={true}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PAST ORDERS & INVOICES TAB */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6"
            >
              <div className="border-b border-slate-900 pb-5 mb-8">
                <h2 className="font-sans text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <ShoppingBag className="h-5.5 w-5.5 text-orange-500" /> My Orders History
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium font-sans">Review your purchase history, priority shipping status, and print tax invoices</p>
              </div>

              {orders.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl py-16 px-4 text-center max-w-xl mx-auto">
                  <div className="h-16 w-16 bg-orange-950/40 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-7 w-7" />
                  </div>
                  <h4 className="font-sans font-bold text-white text-base">No previous orders found</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 leading-relaxed">
                    You haven&apos;t placed any orders yet. Place your first test order with a secure checkout simulation!
                  </p>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="mt-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 text-xs font-bold transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-slate-800 bg-slate-900 rounded-2xl p-5 shadow-sm space-y-4 text-xs text-slate-100"
                    >
                      <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-slate-500">ORDER ID</span>
                          <h4 className="text-sm font-extrabold text-white font-mono leading-none mt-1">{order.id}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-500">DATE PLACED</span>
                          <p className="text-xs text-slate-300 font-semibold mt-1">{order.date}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 py-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Consignment</span>
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.product.id} className="flex justify-between font-medium">
                            <span className="text-slate-300 line-clamp-1">{item.product.name} (x{item.quantity})</span>
                            <span className="font-mono text-slate-200 shrink-0 ml-3">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-[10px] text-orange-400 font-bold">+ {order.items.length - 2} more items in bundle</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-sm font-extrabold text-white">
                        <span className="text-xs font-bold text-slate-500">Invoiced Amount</span>
                        <span className="font-mono text-orange-400">₹{order.total.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(null);
                            setOrdersOpen(true);
                          }}
                          className="flex-1 py-2 rounded-xl bg-orange-950/30 hover:bg-orange-950/50 text-orange-400 border border-orange-900/30 font-bold text-[11px] transition-colors cursor-pointer text-center"
                        >
                          View Details & Save Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-xs text-slate-500 font-medium font-sans md:pl-68">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} E-shop India E-Commerce. All rights reserved.</p>
          <p className="mt-1 font-mono text-[10px] text-slate-600">
            Engineered securely. All prices, taxes and transactions strictly follow Indian Rupee standards.
          </p>
        </div>
      </footer>

      {/* OVERLAY MODALS & SLIDE-OUTS */}
      
      {/* 1. Product Detail Overlay Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={activeWishlistIds.includes(selectedProduct.id)}
          />
        )}
      </AnimatePresence>

      {/* 2. Cart Sidebar Slide Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckoutStart}
          />
        )}
      </AnimatePresence>

      {/* 3. Secure Checkout Wizard Modal */}
      <AnimatePresence>
        {checkoutOpen && checkoutCalculations && (
          <CheckoutModal
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            cart={cart}
            calculations={checkoutCalculations}
            onOrderComplete={handleOrderComplete}
            user={user}
          />
        )}
      </AnimatePresence>

      {/* 4. Order Invoices & Shipments Tracking Modal */}
      <AnimatePresence>
        {ordersOpen && (
          <OrderHistoryModal
            isOpen={ordersOpen}
            onClose={() => setOrdersOpen(false)}
            orders={orders}
          />
        )}
      </AnimatePresence>

      {/* 5. Login / Signup Modal */}
      <AnimatePresence>
        {loginOpen && (
          <LoginModal
            isOpen={loginOpen}
            onClose={() => setLoginOpen(false)}
            onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setLoginOpen(false);
              triggerToast(`Welcome back, ${loggedInUser.fullName}!`, 'success');
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
