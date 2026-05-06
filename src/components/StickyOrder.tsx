import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, MapPin, ChevronRight, Phone } from 'lucide-react';
import { OUTLETS } from '../constants';

const StickyOrder: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate how close we are to the bottom
      const isNearBottom = (documentHeight - (scrollY + windowHeight)) < 600; // threshold for footer visibility
      
      setIsVisible(scrollY > 400 && !isNearBottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContact = (whatsapp: string) => {
    const message = encodeURIComponent('Hello! I would like to place an order.');
    window.open(`https://wa.me/${whatsapp}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-end gap-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-charcoal/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-3xl w-72 mb-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px]">Select Outlet</h4>
                  <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {OUTLETS.map((outlet) => (
                    <button
                      key={outlet.id}
                      onClick={() => handleContact(outlet.whatsapp)}
                      className="w-full flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-4 hover:border-primary-green/50 hover:bg-primary-green/5 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-green/10 flex items-center justify-center text-primary-green flex-none group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-bold truncate tracking-tight">{outlet.name}</div>
                        <div className="text-white/30 text-[8px] uppercase font-black truncate mt-0.5 tracking-widest border-t border-white/5 pt-1">Chat on WhatsApp</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-primary-green group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-[8px] font-black uppercase text-white/20 tracking-widest leading-relaxed">
                    Connecting you directly with our outlet managers for faster service.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-500 ${
              isOpen 
                ? 'bg-charcoal border border-white/10 text-white' 
                : 'bg-[#25D366] text-white green-glow hover:bg-[#128C7E]'
            }`}
          >
            <MessageCircle className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StickyOrder;
