import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, MessageCircle, ChevronRight, ShoppingCart, Search as SearchIcon } from 'lucide-react';
import { MENU_ITEMS, OUTLETS } from '../constants';
import { MenuItem, Category, Outlet } from '../types';

interface MenuProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectItem, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (Category | 'All')[] = ['All', 'Kacchi', 'Polao', 'Tehri', 'Others', 'Drinks & Dessert'];

  const filteredItems = (selectedCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === selectedCategory)
  ).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="menu" className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8 flex justify-center"
          >
            <img 
              src="https://images.deliveryhero.io/image/talabat/restaurants/Logo639025375656171984.jpg?width=180" 
              alt="Kacchi Darbar Logo" 
              className="w-24 h-24 rounded-full border-2 border-primary-green p-1 shadow-lg shadow-primary-green/20"
            />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary-red uppercase tracking-[0.2em] font-black text-xs mb-4 block"
          >
            Special Selections
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Our Royal <span className="text-primary-green">Menu</span>
          </motion.h2>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="relative group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary-green transition-colors" />
            <input 
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white outline-none focus:border-primary-green transition-smooth placeholder:text-white/20 font-bold"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat 
                ? 'bg-primary-green text-white shadow-lg green-glow' 
                : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className="group bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/10 shadow-2xl transition-smooth"
              >
                <div className="relative aspect-[4/3] overflow-hidden m-3 rounded-[2rem]">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent-yellow fill-accent-yellow" />
                    <span className="text-xs font-bold">{item.rating}</span>
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary-green transition-colors leading-tight">{item.name}</h3>
                    <p className="text-white/40 text-[10px] mb-4 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-tighter text-white/30 font-black">Starting from</span>
                      <span className="text-primary-red font-black text-lg leading-none">৳{item.price.p1}</span>
                    </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                        className="flex-1 ml-4 py-3 bg-primary-green text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-primary-green/20 hover:scale-105 active:scale-95 transition-smooth"
                        title="Add to Cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
