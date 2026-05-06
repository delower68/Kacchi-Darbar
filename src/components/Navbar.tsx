import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, ChevronRight, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Royal Menu', href: '#menu' },
    { name: 'Our Story', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-charcoal/90 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <img 
            src="https://images.deliveryhero.io/image/talabat/restaurants/Logo639025375656171984.jpg?width=180" 
            alt="Kacchi Darbar Logo" 
            className="w-12 h-12 rounded-full border border-primary-green/30 p-0.5 object-cover"
          />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Kacchi <span className="text-primary-green">Darbar</span>
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-semibold text-white/90 hover:text-primary-green transition-colors"
            >
              {link.name}
              {link.name === 'Find Food' && (
                <div className="h-0.5 w-full bg-primary-red mt-1 rounded-full" />
              )}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:block text-white hover:text-primary-green transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Cart Icon - Visible on all screens */}
          <button 
            onClick={() => (window as any).toggleCart?.()}
            className="relative p-2 group"
          >
            <ShoppingBag className="w-5 h-5 text-white active:scale-90 transition-transform" />
            {(window as any).cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-red text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-charcoal">
                {(window as any).cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => (window as any).toggleOrders?.()}
            className="hidden sm:flex items-center gap-2 p-2 group text-white/50 hover:text-primary-green transition-colors"
            title="My Orders"
          >
            <History className="w-5 h-5" />
          </button>

          {/* Desktop Order Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:block px-6 py-2.5 bg-primary-green text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg green-glow"
          >
            Order Now
          </motion.button>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-primary-green p-2 hover:bg-primary-green/10 rounded-lg transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8 stroke-[2.5]" />
            ) : (
              <Menu className="w-8 h-8 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden absolute top-full left-0 w-full bg-charcoal/95 backdrop-blur-xl border-b border-white/5 shadow-2xl z-[60]"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-black text-white hover:text-primary-green transition-colors uppercase tracking-widest flex items-center justify-between group"
                >
                  {link.name}
                  <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-primary-green group-hover:translate-x-2 transition-smooth" />
                </motion.a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  (window as any).toggleOrders?.();
                }}
                className="flex items-center justify-between text-lg font-black text-white hover:text-primary-green transition-colors uppercase tracking-widest group"
              >
                My Orders
                <History className="w-6 h-6 text-white/10 group-hover:text-primary-green transition-smooth" />
              </button>

              <div className="h-[1px] w-full bg-white/5 my-2" />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-6 bg-primary-green text-white font-black rounded-3xl text-sm uppercase tracking-[0.3em] shadow-2xl green-glow"
              >
                Order Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
