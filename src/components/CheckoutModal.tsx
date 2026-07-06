/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, MapPin, CreditCard, ShieldCheck, ArrowRight, Loader2, CheckCircle, Receipt, Download, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, ShippingDetails, Order, User } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  calculations: {
    subtotal: number;
    discount: number;
    shipping: number;
    gst: number;
    total: number;
    appliedCoupon: string;
  };
  onOrderComplete: (order: Order) => void;
  user?: User | null;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  calculations,
  onOrderComplete,
  user,
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Shipping, 2: Payment, 3: Loading, 4: Receipt
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Auto-integrate pre-filled login user details into shipping checkout fields
  useEffect(() => {
    if (user) {
      setShippingDetails({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
      });
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Handle Input Changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Shipping Form
  const validateShipping = () => {
    const newErrors: Record<string, string> = {};
    if (!shippingDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingDetails.email)) newErrors.email = 'Valid email is required';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingDetails.phone)) newErrors.phone = 'Enter a valid 10-digit Indian phone number';
    
    if (!shippingDetails.address.trim()) newErrors.address = 'Complete delivery address is required';
    if (!shippingDetails.city.trim()) newErrors.city = 'City is required';
    if (!shippingDetails.state.trim()) newErrors.state = 'State is required';
    
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(shippingDetails.pincode)) newErrors.pincode = 'Enter a valid 6-digit Indian PIN Code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    }
  };

  // Simulate Payment Processing
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentErrors: Record<string, string> = {};

    if (paymentMethod === 'UPI') {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiRegex.test(upiId)) {
        paymentErrors.upi = 'Enter a valid UPI ID (e.g. yourname@okaxis)';
        setErrors(paymentErrors);
        return;
      }
    } else if (paymentMethod === 'Card') {
      if (!cardDetails.nameOnCard.trim()) paymentErrors.cardName = 'Name on card is required';
      if (cardDetails.cardNumber.replace(/\s/g, '').length < 16) paymentErrors.cardNumber = 'Enter valid card number';
      if (!cardDetails.expiry) paymentErrors.expiry = 'Required';
      if (cardDetails.cvv.length < 3) paymentErrors.cvv = 'Required';

      if (Object.keys(paymentErrors).length > 0) {
        setErrors(paymentErrors);
        return;
      }
    }

    setErrors({});
    setStep(3); // Go to loading step

    // Create unique Order ID
    const orderId = `OD${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      shippingDetails,
      paymentMethod,
      subtotal: calculations.subtotal,
      discount: calculations.discount,
      shipping: calculations.shipping,
      gst: calculations.gst,
      total: calculations.total,
      status: 'Processing',
    };

    // Simulate Server Ingress delay (1.5 seconds)
    setTimeout(() => {
      setCreatedOrder(newOrder);
      onOrderComplete(newOrder);
      setStep(4); // Show receipt
    }, 1800);
  };

  // Indian States Options
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="absolute inset-0" onClick={step < 3 ? onClose : undefined} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl bg-slate-900 shadow-2xl border border-slate-800 overflow-hidden z-10 flex flex-col max-h-[92vh]"
      >
        {/* Header (Only for Steps 1 and 2) */}
        {step < 3 && (
          <div className="px-6 py-4.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div>
              <h3 className="font-display font-extrabold text-white text-lg flex items-center gap-2">
                <ShieldCheck className="h-5.5 w-5.5 text-green-500 animate-pulse" /> E-shop Secure Checkout
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Step {step} of 2 • Indian Rupee Invoicing</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 text-slate-100">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Shipping Details */}
            {step === 1 && (
              <motion.form
                key="shipping-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleShippingSubmit}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-indigo-400 mb-2.5">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Delivery Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={shippingDetails.fullName}
                      onChange={handleShippingChange}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={shippingDetails.email}
                      onChange={handleShippingChange}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                    />
                    {errors.email && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Mobile Number (India)</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-semibold text-slate-500 font-mono">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="9876543210"
                        value={shippingDetails.phone}
                        onChange={handleShippingChange}
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-12 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 font-mono transition-colors"
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.phone}</p>}
                  </div>

                  {/* Pin Code */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">PIN Code (6 digits)</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="400001"
                      maxLength={6}
                      value={shippingDetails.pincode}
                      onChange={handleShippingChange}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 font-mono transition-colors"
                    />
                    {errors.pincode && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                {/* Complete Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Shipping Address (Flat, House, Building, Street)</label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={shippingDetails.address}
                    onChange={handleShippingChange}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                  />
                  {errors.address && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingDetails.city}
                      onChange={handleShippingChange}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                    />
                    {errors.city && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.city}</p>}
                  </div>

                  {/* State Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="e.g. Maharashtra"
                      list="state-list"
                      value={shippingDetails.state}
                      onChange={handleShippingChange}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                    />
                    <datalist id="state-list">
                      {indianStates.map(state => <option key={state} value={state} />)}
                    </datalist>
                    {errors.state && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.state}</p>}
                  </div>
                </div>

                {/* Subtotal preview and Next Step */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">AMOUNT TO PAY</span>
                    <span className="text-xl font-bold text-white font-mono">₹{calculations.total.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-950/40 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Continue to Payment <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Simulated Payments */}
            {step === 2 && (
              <motion.form
                key="payment-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-indigo-400 mb-2.5">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Select Payment Method</span>
                </div>

                {/* Method Options */}
                <div className="grid grid-cols-3 gap-3">
                  <label
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer text-center transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-indigo-500 bg-indigo-950/40 text-indigo-400'
                        : 'border-slate-850 bg-slate-950 hover:border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="sr-only"
                    />
                    <Smartphone className="h-6 w-6 text-indigo-400 mb-1.5" />
                    <span className="text-xs font-bold">UPI / GPay</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer text-center transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-indigo-500 bg-indigo-950/40 text-indigo-400'
                        : 'border-slate-855 bg-slate-950 hover:border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="sr-only"
                    />
                    <CreditCard className="h-6 w-6 text-indigo-400 mb-1.5" />
                    <span className="text-xs font-bold">Debit/Credit</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 cursor-pointer text-center transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-indigo-500 bg-indigo-950/40 text-indigo-400'
                        : 'border-slate-855 bg-slate-950 hover:border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="sr-only"
                    />
                    <CheckCircle className="h-6 w-6 text-indigo-400 mb-1.5" />
                    <span className="text-xs font-bold">Cash on Del.</span>
                  </label>
                </div>

                {/* Sub-forms */}
                <div className="bg-slate-950 rounded-3xl border border-slate-850 p-4.5 min-h-[140px] flex flex-col justify-center">
                  {paymentMethod === 'UPI' && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">UPI Identity Verification</h4>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="yourname@okaxis"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm font-mono text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">
                        You will receive a simulated payment request in your respective UPI application (PhonePe, GPay, Paytm).
                      </p>
                      {errors.upi && <p className="text-[10px] text-red-400 font-bold">{errors.upi}</p>}
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Secure Debit or Credit Card</h4>
                      
                      <div>
                        <input
                          type="text"
                          placeholder="Cardholder Full Name"
                          value={cardDetails.nameOnCard}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, nameOnCard: e.target.value }))}
                          required
                          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Card Number (16 Digits)"
                          maxLength={19}
                          value={cardDetails.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                          required
                          className="col-span-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-mono text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                            required
                            className="w-1/2 rounded-2xl border border-slate-800 bg-slate-900 text-center text-xs font-mono text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={3}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            required
                            className="w-1/2 rounded-2xl border border-slate-800 bg-slate-900 text-center text-xs font-mono text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[9px] text-slate-500">
                        <ShieldCheck className="h-3 w-3 text-green-500" />
                        <span>Card data is processed server-side with strict AES-256 PCI compliance protection.</span>
                      </div>
                      
                      {errors.cardName && <p className="text-[10px] text-red-400 font-bold">{errors.cardName}</p>}
                      {errors.cardNumber && <p className="text-[10px] text-red-400 font-bold">{errors.cardNumber}</p>}
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="space-y-2 text-center py-2">
                      <h4 className="text-sm font-bold text-green-500 uppercase tracking-wide">Cash on Delivery (COD) Selected</h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                        An additional Cash-on-Delivery confirmation verification code will be sent via SMS to <span className="font-bold font-mono text-white">+91 {shippingDetails.phone}</span> upon order receipt.
                      </p>
                      <p className="text-[10px] text-slate-500">No advance digital deposit required!</p>
                    </div>
                  )}
                </div>

                {/* Back and Confirm Button */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors border border-slate-800 hover:bg-slate-850 px-4 py-2.5 rounded-full"
                  >
                    Go Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md shadow-indigo-950/40 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Authorize Payment (₹{calculations.total.toLocaleString('en-IN')}) <ShieldCheck className="h-4.5 w-4.5" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Server Processing Animation */}
            {step === 3 && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
                <h4 className="font-display font-bold text-white text-lg">Authorizing Secure Transaction...</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-2 leading-relaxed font-medium">
                  We are securely routing the transaction details to your bank and updating the E-shop inventory log files. Please do not close this window.
                </p>
              </motion.div>
            )}

            {/* Step 4: PDF Invoice / Order Success Receipt */}
            {step === 4 && createdOrder && (
              <motion.div
                key="invoice-receipt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                {/* Success Banner */}
                <div className="text-center py-2 flex flex-col items-center">
                  <div className="h-12 w-12 bg-green-950/40 text-green-400 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h4 className="font-display font-bold text-green-400 text-lg">Order Placed Successfully!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Your payment was verified, and order <span className="font-mono font-bold text-slate-200">{createdOrder.id}</span> has been dispatched.
                  </p>
                </div>

                {/* Beautiful Printable Invoice Box */}
                <div id="eshop-invoice-slip" className="border border-slate-800 bg-slate-950 rounded-3xl p-4 sm:p-5 text-xs font-medium text-slate-300 relative overflow-hidden">
                  
                  {/* Decorative Invoice stamp */}
                  <div className="absolute -top-1 right-4 bg-indigo-600 text-white font-mono font-bold px-3 py-1.5 rounded-b-md text-[9px] uppercase tracking-wider">
                    E-shop Tax Invoice
                  </div>

                  {/* Issuer & Client detail */}
                  <div className="flex justify-between border-b border-slate-800 pb-3 mb-3.5">
                    <div>
                      <h5 className="font-bold text-white">E-shop India Pvt. Ltd.</h5>
                      <p className="text-[10px] text-slate-500">CIN: U51909MH2026PTC334589</p>
                      <p className="text-[10px] text-slate-500">Chhatrapati Shivaji Marg, Mumbai - 400001</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">Invoice Date: {createdOrder.date}</p>
                      <p className="text-indigo-400 font-mono font-bold">ID: {createdOrder.id}</p>
                      <p className="text-[10px] text-slate-500">Payment: {createdOrder.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="mb-4">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-wider">Deliver To</span>
                    <p className="font-bold text-slate-200">{createdOrder.shippingDetails.fullName}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {createdOrder.shippingDetails.address}, {createdOrder.shippingDetails.city}, {createdOrder.shippingDetails.state} - {createdOrder.shippingDetails.pincode}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">Phone: +91 {createdOrder.shippingDetails.phone} • Email: {createdOrder.shippingDetails.email}</p>
                  </div>

                  {/* Items list table */}
                  <div className="space-y-2 border-t border-b border-slate-800 py-3 mb-3.5">
                    <span className="text-[9px] font-bold text-slate-500 uppercase block tracking-wider mb-1.5">Billed Items</span>
                    {createdOrder.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <span className="text-slate-100 font-semibold">{item.product.name}</span>
                          <span className="text-[10px] text-slate-500 block font-medium">
                            {item.quantity} x ₹{item.product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="font-mono text-white font-semibold text-right shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Invoice Sums */}
                  <div className="space-y-1.5 text-[11px] border-b border-slate-800 pb-3 mb-3">
                    <div className="flex justify-between text-slate-450">
                      <span>Billed Subtotal</span>
                      <span className="font-mono">₹{createdOrder.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {createdOrder.discount > 0 && (
                      <div className="flex justify-between text-green-400 font-semibold">
                        <span>Applied Discount</span>
                        <span className="font-mono">-₹{createdOrder.discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-450">
                      <span>GST (18% Integrated CGST/SGST)</span>
                      <span className="font-mono">₹{createdOrder.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-450">
                      <span>Shipping Delivery Charges</span>
                      <span>
                        {createdOrder.shipping === 0 ? (
                          <span className="text-green-400 font-semibold text-[10px]">FREE</span>
                        ) : (
                          <span className="font-mono">₹{createdOrder.shipping}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Grand total absolute */}
                  <div className="flex justify-between text-sm font-bold text-white">
                    <span className="flex items-center gap-1.5"><Receipt className="h-4 w-4 text-indigo-400" /> Grand Total Invoiced</span>
                    <span className="font-mono text-indigo-400 text-base">₹{createdOrder.total.toLocaleString('en-IN')}</span>
                  </div>

                </div>

                {/* Helpful Delivery Indicator */}
                <div className="text-[11px] font-semibold text-slate-400 text-center py-1">
                  📅 Estimated Delivery: <span className="text-indigo-400">3-4 business days</span> (Express Priority dispatch)
                </div>

                {/* Final receipt actions */}
                <div className="pt-4 border-t border-slate-800 flex gap-3">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    type="button"
                    className="flex-1 py-2.5 px-4 rounded-full border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-indigo-400" /> Save / Print PDF Invoice
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs text-center transition-colors cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
