/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Truck, CheckCircle2, ChevronRight, Receipt, ArrowLeft, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function OrderHistoryModal({
  isOpen,
  onClose,
  orders,
}: OrderHistoryModalProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden z-10 flex flex-col h-[85vh] max-h-[85vh]"
      >
        <AnimatePresence mode="wait">
          {!selectedOrder ? (
            /* LIST VIEW */
            <motion.div
              key="order-list"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h3 className="font-sans font-bold text-gray-900 text-lg flex items-center gap-2">
                    <Receipt className="h-5.5 w-5.5 text-orange-600" /> Past Orders & Invoices
                  </h3>
                  <p className="text-[11px] font-mono text-gray-400">View and print invoices from your purchase history</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {orders.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10">
                    <div className="h-14 w-14 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
                      <Receipt className="h-6 w-6" />
                    </div>
                    <h4 className="font-sans font-bold text-gray-800 text-base">No orders logged yet</h4>
                    <p className="text-xs text-gray-400 max-w-xs mt-1.5 leading-relaxed">
                      You haven&apos;t placed any e-commerce orders yet. Fill your shopping cart with our premium products to test the checkout flow!
                    </p>
                  </div>
                ) : (
                  orders.map((order) => {
                    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                    return (
                      <div
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className="border border-gray-100 hover:border-orange-200 hover:bg-orange-50/5 rounded-2xl p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer transition-all duration-200 group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors font-mono">
                              {order.id}
                            </span>
                            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> {order.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {order.date}
                            </span>
                            <span>•</span>
                            <span>{totalItems} {totalItems === 1 ? 'item' : 'items'} purchased</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3.5 sm:pt-0 border-t sm:border-0 border-gray-50">
                          <div className="text-left sm:text-right">
                            <span className="text-[10px] font-mono text-gray-400 block leading-none">TOTAL PAID</span>
                            <span className="text-sm font-extrabold text-gray-900 font-mono">
                              ₹{order.total.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          ) : (
            /* DETAILED INVOICE VIEW */
            <motion.div
              key="order-details"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-1 text-xs font-bold"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to History
                </button>
                <div className="h-4 w-[1px] bg-gray-200" />
                <span className="text-xs font-mono font-bold text-gray-400">Invoice: {selectedOrder.id}</span>
              </div>

              {/* Invoice Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-5 text-xs font-medium text-gray-600 relative overflow-hidden">
                  {/* Stamp */}
                  <div className="absolute -top-1 right-4 bg-orange-600 text-white font-mono font-bold px-3 py-1.5 rounded-b-md text-[9px] uppercase tracking-wider">
                    E-shop Tax Invoice
                  </div>

                  {/* Issuer details */}
                  <div className="flex justify-between border-b border-gray-200 pb-3 mb-3.5">
                    <div>
                      <h5 className="font-bold text-gray-900">E-shop India Pvt. Ltd.</h5>
                      <p className="text-[10px] text-gray-400 font-medium">CIN: U51909MH2026PTC334589</p>
                      <p className="text-[10px] text-gray-400 font-medium">Chhatrapati Shivaji Marg, Mumbai - 400001</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">Invoice Date: {selectedOrder.date}</p>
                      <p className="text-orange-600 font-mono font-semibold">ID: {selectedOrder.id}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Payment: {selectedOrder.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Delivery Detail */}
                  <div className="mb-4">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block tracking-wider">Deliver To</span>
                    <p className="font-bold text-gray-800">{selectedOrder.shippingDetails.fullName}</p>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {selectedOrder.shippingDetails.address}, {selectedOrder.shippingDetails.city}, {selectedOrder.shippingDetails.state} - {selectedOrder.shippingDetails.pincode}
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono">Phone: +91 {selectedOrder.shippingDetails.phone} • Email: {selectedOrder.shippingDetails.email}</p>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 border-t border-b border-gray-200 py-3 mb-3.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase block tracking-wider mb-1.5">Billed Items</span>
                    {selectedOrder.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <span className="text-gray-900 font-semibold">{item.product.name}</span>
                          <span className="text-[10px] text-gray-400 block font-medium">
                            {item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="font-mono text-gray-950 font-semibold text-right shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-[11px] border-b border-gray-200 pb-3 mb-3">
                    <div className="flex justify-between text-gray-500">
                      <span>Billed Subtotal</span>
                      <span className="font-mono">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Applied Discount</span>
                        <span className="font-mono">-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>GST (18% Integrated CGST/SGST)</span>
                      <span className="font-mono">₹{selectedOrder.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping Delivery Charges</span>
                      <span>
                        {selectedOrder.shipping === 0 ? (
                          <span className="text-green-600 font-semibold text-[10px]">FREE</span>
                        ) : (
                          <span className="font-mono">₹{selectedOrder.shipping}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Grand total */}
                  <div className="flex justify-between text-sm font-bold text-gray-900">
                    <span className="flex items-center gap-1.5"><Receipt className="h-4 w-4 text-orange-600" /> Grand Total Invoiced</span>
                    <span className="font-mono text-orange-600 text-base">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Priority Delivery Status Box */}
                <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/10 p-4 flex gap-3">
                  <Truck className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Priority Transit Dispatch</h5>
                    <p className="text-[11px] text-gray-500 leading-normal mt-0.5">
                      Your consignment is processed under prioritized sorting. Airway dispatch details will update via registered email <span className="font-bold text-gray-800">{selectedOrder.shippingDetails.email}</span> within 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex gap-3 bg-gray-50/50">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-white text-gray-600 hover:text-gray-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" /> Print / Save Tax Invoice
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
