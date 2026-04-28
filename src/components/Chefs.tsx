import React from 'react';
import { motion } from 'motion/react';
import { CHEFS } from '../constants';

const Chefs: React.FC = () => {
  return (
    <section className="py-24 bg-charcoal-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] font-medium text-sm mb-4 block">Our Team</span>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold">Meet Our <span className="text-gold">Master Chefs</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {CHEFS.map((chef, idx) => (
            <motion.div
              key={chef.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-4 border-gold/10 group-hover:border-gold/50 transition-smooth mb-6">
                <img 
                  src={chef.image} 
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-charcoal to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white/70 text-sm italic">"Authentic flavor is the highest form of respect for our guests."</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif font-bold mb-1">{chef.name}</h3>
                <p className="text-gold uppercase tracking-widest text-xs font-bold">{chef.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs;
