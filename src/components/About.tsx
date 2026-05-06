import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-charcoal">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden border-2 border-white/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=1000" 
              alt="Restaurant Ambiance"
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl -z-10" />
          <div className="absolute top-10 -left-10 w-48 h-48 bg-primary-red/10 -z-10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-primary-red uppercase tracking-[0.2em] font-black text-xs mb-4 block">Our Story</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Our Art of <span className="text-primary-green">Traditional Kacchi</span>
          </h2>
          <p className="text-white/50 text-lg mb-6 leading-relaxed">
            Kacchi Darbar was founded on the belief that authenticity cannot be rushed. Our journey began in a small kitchen, where we spent years perfecting the balance of spices and the secret of slow-cooking meat and rice in a sealed pot.
          </p>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Today, we are proud to serve thousands of happy customers across Dhaka, staying true to our roots while providing a premium dining experience that honors the heritage.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-6 text-white font-bold group tracking-widest text-sm bg-white/5 pr-2 pl-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-smooth"
          >
            Learn More About Us
            <div className="w-12 h-12 bg-primary-green text-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-smooth shadow-lg green-glow">
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
