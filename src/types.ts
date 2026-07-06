/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in INR (₹)
  category: string;
  subCategory: string;
  image: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  featured: boolean;
  tags: string[];
  specifications: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  subtotal: number;
  discount: number;
  shipping: number;
  gst: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface Filters {
  searchQuery: string;
  categories: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  onlyInStock: boolean;
}

export interface User {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

