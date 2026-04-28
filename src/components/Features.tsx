import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Leaf, Zap, MapPin } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality Food',
    desc: 'Only the finest cuts of meat and hand-selected spices.',
    color: 'bg-primary-red'
  },
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    desc: 'Daily sourced vegetables and locally produced aromatic rice.',
    color: 'bg-primary-green'
  },
  {
    icon: Zap,
    title: 'Fast Service',
    desc: 'Quick turnaround time without compromising traditional slow-cooking.',
    color: 'bg-accent-yellow'
  },
  {
    icon: MapPin,
    title: 'Multiple Outlets',
    desc: 'Serving the royal taste across major locations in Dhaka.',
    color: 'bg-primary-green'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-32 bg-charcoal relative">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-primary-red text-xl">✨</span>
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">Excellence in every bite</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            Why Choose <span className="text-primary-green">Us</span>
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-white/10 transition-smooth group text-left"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-[1.5rem] flex items-center justify-center mb-8 text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
