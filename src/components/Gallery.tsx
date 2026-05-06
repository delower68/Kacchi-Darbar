import React from 'react';
import { motion } from 'motion/react';

const IMAGES = [
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=800'
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden relative bg-charcoal">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/30 to-transparent" />
      
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl font-bold">Visual <span className="text-primary-green">Journey</span></h2>
      </div>

      <div className="flex relative items-center gap-6 py-6">
        <motion.div 
          className="flex gap-6 min-w-full"
          animate={{ x: [0, -1000] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear"
            }
          }}
        >
          {[...IMAGES, ...IMAGES].map((img, i) => (
            <div key={i} className="flex-shrink-0 w-80 h-96 rounded-3xl overflow-hidden border border-white/10 group">
              <img 
                src={img} 
                alt={`Kacchi Darbar Culinary Highlight - ${['Premium Kacchi', 'Basmati Rice', 'Traditional Serving', 'Spicy Biryani'][i % 4]}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/30 to-transparent" />
    </section>
  );
};

export default Gallery;
