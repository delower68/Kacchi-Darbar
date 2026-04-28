import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

const StickyOrder: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[90] bg-primary-red text-white font-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 uppercase tracking-widest text-[10px] red-glow"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Order Now</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default StickyOrder;
