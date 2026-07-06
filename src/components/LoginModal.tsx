import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, Mail, Lock, User as UserIcon, Smartphone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const DEMO_USERS: User[] = [
  {
    fullName: 'Rajesh Kumar',
    email: 'rajesh@eshop.in',
    phone: '9876543210',
    address: 'Flat 405, Block B, Prestige Heights, Outer Ring Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
  },
  {
    fullName: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '9988776655',
    address: 'House No 12, Lane 4, Chhatrapati Shivaji Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  }
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123'); // Demo default

  // Signup Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginEmail) {
      setError('Please enter your email');
      return;
    }

    // Check if it's one of the demo users
    const matchedUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );

    if (matchedUser) {
      setSuccess(`Welcome back, ${matchedUser.fullName}!`);
      setTimeout(() => {
        onLoginSuccess(matchedUser);
        onClose();
        setSuccess('');
      }, 1000);
    } else {
      // If not demo user, log in as a dynamically created user
      const tempUser: User = {
        fullName: loginEmail.split('@')[0].toUpperCase(),
        email: loginEmail.trim(),
        phone: '9876543210',
        address: '101, Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
      };
      setSuccess(`Logged in successfully as ${tempUser.fullName}!`);
      setTimeout(() => {
        onLoginSuccess(tempUser);
        onClose();
        setSuccess('');
      }, 1000);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone || !address || !city || !state || !pincode) {
      setError('All fields are required for priority shipping setup');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Mobile number must be a 10-digit number');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError('PIN code must be a 6-digit number');
      return;
    }

    const newUser: User = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
    };

    setSuccess('Account created and logged in!');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
      setSuccess('');
    }, 1000);
  };

  const selectDemoUser = (user: User) => {
    setLoginEmail(user.email);
    setLoginPassword('password123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl z-10 text-slate-100 flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/25 border border-indigo-500/30 text-indigo-400 mb-3">
            <LogIn className="h-6 w-6" />
          </div>
          <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
            {isSignUp ? 'Create Account' : 'Sign In to E-shop'}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            {isSignUp 
              ? 'Complete your shopper profile to unlock 1-click checkout and invoice tracking'
              : 'Access saved addresses, invoices, and cart history across devices'}
          </p>
        </div>

        {/* Error / Success Feedback */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-950/40 border border-red-500/30 p-3 text-xs text-red-400 font-bold text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl bg-green-950/40 border border-green-500/30 p-3 text-xs text-green-400 font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-full mb-6 border border-slate-800">
          <button
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
              !isSignUp ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
              isSignUp ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Form */}
        {!isSignUp ? (
          <div className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    placeholder="e.g. rajesh@eshop.in"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-950 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-950/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Let&apos;s Sign In
              </button>
            </form>

            {/* Quick Demo Accout Selector */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-2.5">
                Quick Demo Profile Login
              </span>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_USERS.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => selectDemoUser(user)}
                    className="p-2.5 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-indigo-500/50 text-left cursor-pointer transition-all duration-200 group"
                  >
                    <p className="text-[11px] font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {user.fullName}
                    </p>
                    <p className="text-[9px] text-slate-500 font-mono line-clamp-1">
                      {user.email}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUpSubmit} className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 pl-10 pr-4 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Email</label>
                <input
                  type="email"
                  placeholder="rajesh@eshop.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 px-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Mobile (+91)</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 px-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Flat, Street, Area Address</label>
              <textarea
                placeholder="Flat No, Building, Main Road..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 px-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none min-h-[50px] max-h-[90px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">City</label>
                <input
                  type="text"
                  placeholder="Bengaluru"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 px-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">PIN Code</label>
                <input
                  type="text"
                  placeholder="560103"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 px-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">State</label>
              <input
                type="text"
                placeholder="Karnataka"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 py-2 px-3.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-950/20 transition-all cursor-pointer"
            >
              Register & Sign In
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
