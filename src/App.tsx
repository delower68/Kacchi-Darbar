/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Menu from './components/Menu';
import BookTable from './components/BookTable';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import Chefs from './components/Chefs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyOrder from './components/StickyOrder';
import Checkout from './components/Checkout';
import { MenuItem, Portion } from './types';

export default function App() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cart, setCart] = useState<{item: MenuItem; quantity: number; portion: Portion}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem, portion: Portion = 'p1') => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id && i.portion === portion);
      if (existing) {
        return prev.map(i => i.item.id === item.id && i.portion === portion ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1, portion }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, portion: Portion) => {
    setCart(prev => prev.filter(i => !(i.item.id === id && i.portion === portion)));
  };

  const updateQuantity = (id: string, portion: Portion, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === id && i.portion === portion) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const updatePortion = (id: string, oldPortion: Portion, newPortion: Portion) => {
    setCart(prev => {
      const itemToUpdate = prev.find(i => i.item.id === id && i.portion === oldPortion);
      if (!itemToUpdate) return prev;

      // Check if new portion already exists in cart for this item
      const existingWithNewPortion = prev.find(i => i.item.id === id && i.portion === newPortion);
      
      if (existingWithNewPortion) {
        // Merge quantities
        return prev.filter(i => !(i === itemToUpdate || i === existingWithNewPortion))
          .concat({ 
            ...existingWithNewPortion, 
            quantity: existingWithNewPortion.quantity + itemToUpdate.quantity 
          });
      } else {
        // Just update portion
        return prev.map(i => i === itemToUpdate ? { ...i, portion: newPortion } : i);
      }
    });
  };

  // Expose to window for Navbar access
  if (typeof window !== 'undefined') {
    (window as any).toggleCart = () => setIsCartOpen(!isCartOpen);
    (window as any).cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  if (isCheckingOut) {
    return (
      <div className="bg-charcoal min-h-screen">
        <Checkout 
          items={cart} 
          onBack={() => setIsCheckingOut(false)} 
          onUpdateQuantity={updateQuantity}
          onUpdatePortion={updatePortion}
          onRemove={removeFromCart}
        />
      </div>
    );
  }

  return (
    <div className="relative selection:bg-primary-red selection:text-white bg-charcoal">
      <Navbar />
      
      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[200]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-charcoal-light shadow-2xl p-6 sm:p-8 border-l border-white/5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-widest text-white">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-white p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/20 select-none">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-bold">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map(({ item, quantity, portion }) => (
                    <div key={`${item.id}-${portion}`} className="bg-white/5 p-4 rounded-2xl flex gap-4 items-center group border border-white/0 hover:border-white/10 transition-colors">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-white line-clamp-1">{item.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/40 text-[10px] uppercase tracking-wider font-bold">
                            {portion === 'p1' ? 'Single' : portion === 'p3' ? 'Double' : 'Family'}
                          </span>
                          <span className="text-primary-red font-black text-xs">৳{(item.price[portion] || item.price.p1)} x {quantity}</span>
                          <button onClick={() => removeFromCart(item.id, portion)} className="text-white/30 hover:text-primary-red transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/50 font-bold">Total Amount</span>
                    <span className="text-3xl font-black text-white">
                      ৳{cart.reduce((acc, curr) => acc + (curr.item.price[curr.portion] || curr.item.price.p1) * curr.quantity, 0)}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsCheckingOut(true);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-5 bg-primary-green text-white font-black rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl green-glow"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main>
        <Hero onSelectItem={addToCart} />
        <Features />
        <Stats />
        <About />
        <Menu 
          onSelectItem={addToCart} 
          onAddToCart={addToCart} 
        />
        <Gallery />
        <BookTable />
        <Chefs />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <StickyOrder />
    </div>
  );
}
