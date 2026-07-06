/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Filter, Star, SlidersHorizontal, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Filters } from '../types';
import { subCategoriesByCategory } from '../data/products';

interface SidebarFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  allCategories: string[];
  maxPrice: number;
}

export default function SidebarFilters({
  filters,
  setFilters,
  allCategories,
  maxPrice,
}: SidebarFiltersProps) {
  
  // Reset all filters
  const handleReset = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      priceRange: [0, maxPrice],
      rating: 0,
      sortBy: 'featured',
      onlyInStock: false,
    });
  };

  // Toggle Category Selection
  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => {
      const active = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: active };
    });
  };

  return (
    <aside id="catalog-sidebar-filters" className="w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-sm sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto text-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4.5 w-4.5 text-indigo-400" />
          <h2 className="font-display font-bold text-white text-base">Filters</h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" /> Reset All
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Sort By */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Sort Products</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none transition-colors"
          >
            <option value="featured">Featured Picks</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Average Rating</option>
            <option value="reviews">Popularity (Most Reviewed)</option>
          </select>
        </div>

        {/* Categories Multi-Select */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Categories</label>
          <div className="space-y-2">
            {allCategories.map((category) => {
              const isChecked = filters.categories.includes(category);
              return (
                <label
                  key={category}
                  className={`flex justify-between items-center px-4.5 py-2.5 rounded-2xl border text-sm font-semibold cursor-pointer transition-all duration-150 ${
                    isChecked
                      ? 'border-indigo-500 bg-indigo-950/40 text-indigo-400 font-bold shadow-sm'
                      : 'border-slate-800/80 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(category)}
                      className="h-4 w-4 rounded text-indigo-500 border-slate-700 bg-slate-900 focus:ring-indigo-600 cursor-pointer"
                    />
                    <span>{category}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Price Range</label>
            <span className="text-xs font-bold text-indigo-400 font-mono">
              ₹0 - ₹{filters.priceRange[1].toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setFilters((prev) => ({ ...prev, priceRange: [prev.priceRange[0], value] }));
            }}
            className="w-full accent-indigo-500 bg-slate-950 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
            <span>₹0</span>
            <span>₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Minimum Rating</label>
          <div className="grid grid-cols-5 gap-1.5">
            {[0, 4.0, 4.2, 4.5, 4.7].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, rating: rate }))}
                className={`flex flex-col items-center justify-center py-2 rounded-2xl border text-xs font-bold transition-all duration-150 cursor-pointer ${
                  filters.rating === rate
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-950/20'
                    : 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-100'
                }`}
              >
                {rate === 0 ? (
                  <span>All</span>
                ) : (
                  <>
                    <span className="font-mono">{rate}</span>
                    <Star className={`h-3 w-3 mt-0.5 ${filters.rating === rate ? 'fill-white' : 'fill-amber-400 text-amber-400'}`} />
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stock Filter */}
        <div className="pt-2 border-t border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.onlyInStock}
              onChange={(e) => setFilters((prev) => ({ ...prev, onlyInStock: e.target.checked }))}
              className="h-4 w-4 rounded text-indigo-500 border-slate-700 bg-slate-950 focus:ring-indigo-600 cursor-pointer"
            />
            <div>
              <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">In Stock Only</span>
              <p className="text-[10px] text-slate-500 font-medium">Excludes out of stock products</p>
            </div>
          </label>
        </div>

        {/* Indian Delivery Assurance */}
        <div className="rounded-2xl bg-green-950/20 border border-green-900/30 p-3.5">
          <div className="flex gap-2.5">
            <CheckCircle2 className="h-4.5 w-4.5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-green-400 uppercase tracking-wide">Pan-India Delivery</h4>
              <p className="text-[11px] text-green-500/90 leading-normal mt-0.5">
                Free shipping above ₹1,000. Secure UPI payments & Cash-on-Delivery (COD) available nationwide.
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
