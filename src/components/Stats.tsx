import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useMotionValueEvent } from 'motion/react';

const CounterItem = ({ target, label, color }: { target: number; label: string; color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  
  const count = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: 2
  });

  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(Math.floor(latest));
  });

  useEffect(() => {
    if (isInView) {
      count.set(target);
    }
  }, [isInView, count, target]);

  return (
    <div ref={ref} className="text-center p-8 group">
      <motion.div className={`text-5xl md:text-6xl font-black mb-4 tracking-tighter ${color} drop-shadow-lg`}>
        {displayValue.toLocaleString()}<span className="text-white">+</span>
      </motion.div>
      <div className="text-white/40 uppercase tracking-widest text-[10px] font-black">{label}</div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="relative py-32 bg-charcoal border-y border-white/5 overflow-hidden group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600" 
          alt="Kitchen Background" 
          className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[10s] ease-linear"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <CounterItem target={1489} label="Happy Clients" color="text-primary-green" />
          <CounterItem target={521} label="Special Events" color="text-primary-red" />
          <CounterItem target={1453} label="Hours Of Cooking" color="text-accent-yellow" />
          <CounterItem target={32} label="Master Chefs" color="text-primary-green" />
        </div>
      </div>
    </section>
  );
};

export default Stats;
