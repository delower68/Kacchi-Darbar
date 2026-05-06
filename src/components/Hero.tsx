import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, ChevronRight, ChevronLeft } from 'lucide-react';

import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

const PLATTER_IMAGES = [
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
];

interface HeroProps {
  onSelectItem: (item: MenuItem) => void;
  menuItems: MenuItem[];
}

const Hero: React.FC<HeroProps> = ({ onSelectItem, menuItems }) => {
  const [activePlatter, setActivePlatter] = useState(0);
  
  const featuredIds = ['basmati-kacchi', 'basmati-kacchi-roast-borhani-kabab', 'jali-kabab', 'badam-shorbot'];
  const featuredItems = menuItems.filter(item => featuredIds.includes(item.id)).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePlatter((prev) => (prev + 1) % PLATTER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-charcoal">
      {/* Background Gradients/Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-red/10 blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-green/10 blur-[150px] -z-10" />

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[45%] w-8 h-8 bg-primary-green rounded-lg transform -rotate-12 blur-[1px] hidden lg:block" 
      />
      <motion.div 
        animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] left-[40%] w-12 h-12 bg-primary-green/80 rounded-full blur-[2px] hidden lg:block shadow-lg" 
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] right-[10%] w-24 h-24 border-4 border-primary-green/20 rounded-full border-t-primary-green hidden lg:block" 
      />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <span className="text-accent-yellow text-xl">😋</span>
              <span className="text-white text-xs font-bold uppercase tracking-wider">Fast Delivery Biryani</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Order <span className="text-white">Tasty</span> & <br />
              <span className="text-white">Fresh</span> Food <br />
              <span className="text-primary-red">anytime!</span>
            </h1>
            <p className="text-white/50 text-base mb-8 max-w-md mx-auto lg:mx-0">
              Dhaka's most authentic premium Kacchi Biryani. Just confirm your order and enjoy.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-primary-red text-white font-bold rounded-2xl text-base shadow-2xl red-glow flex items-center gap-3 uppercase tracking-widest"
              >
                Order Now
              </motion.button>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-base font-bold text-accent-yellow hover:underline decoration-2 underline-offset-4"
              >
                See Menu
              </button>
            </div>
          </motion.div>

          {/* Right Plate Section with slider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative group mx-auto max-w-xl">
              <div className="relative z-10 p-4 min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-4 bg-white/5 rounded-full blur-2xl -z-10 group-hover:bg-primary-green/10 transition-colors" />
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activePlatter}
                    src={PLATTER_IMAGES[activePlatter]} 
                    alt="Delicious Food"
                    initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: activePlatter % 2 === 0 ? 10 : -10 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 15 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full aspect-square object-cover rounded-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
                  />
                </AnimatePresence>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-[10%] right-[0%] z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl flex flex-col gap-2 scale-90"
              >
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest leading-none">Happy Customers</span>
                <div className="flex items-center gap-0">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?u=${i + 15}`} 
                      className="w-6 h-6 rounded-full border border-charcoal -ml-1.5 first:ml-0"
                      alt="customer"
                    />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-primary-green flex items-center justify-center text-[8px] font-black -ml-1.5">2k+</div>
                </div>
              </motion.div>

              {/* Slider Navigation Buttons */}
              <div className="absolute -bottom-10 right-0 flex gap-3 z-[40]">
                 <button 
                  onClick={(e) => { e.stopPropagation(); setActivePlatter(p => (p - 1 + PLATTER_IMAGES.length) % PLATTER_IMAGES.length); }}
                  className="w-12 h-12 rounded-2xl border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-smooth backdrop-blur-md"
                 >
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button 
                  onClick={(e) => { e.stopPropagation(); setActivePlatter(p => (p + 1) % PLATTER_IMAGES.length); }}
                  className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-charcoal shadow-2xl hover:scale-110 active:scale-95 transition-smooth"
                 >
                    <ChevronRight className="w-6 h-6" />
                 </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Small Cards Section */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 lg:gap-0">
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {featuredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-3 flex items-center gap-4 group hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[240px]"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-0.5">{item.name}</h4>
                    <div className="flex text-accent-yellow gap-0.5 mb-1">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-accent-yellow" />)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-primary-red text-xs">৳{item.price.p1}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onSelectItem(item); }}
                        className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-smooth shadow-lg shadow-primary-green/20"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Floating Circles */}
      <div className="absolute bottom-10 left-10 w-6 h-6 bg-primary-green rounded-full opacity-50 blur-[2px] hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-3 h-3 bg-primary-red rounded-full opacity-50 blur-[1px] hidden lg:block" />
    </section>
  );
};

export default Hero;
