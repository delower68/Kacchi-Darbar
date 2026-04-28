import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-32 bg-charcoal relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-red/5 blur-[100px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Header Area */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[1px] bg-primary-green" />
              <span className="text-primary-green uppercase tracking-[0.3em] font-black text-[10px]">Testimonials</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-[0.9]">
              What Our <br />
              <span className="text-white/20">Royal</span> <br />
              <span className="text-white">Guests</span> Say
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-xs">
              Voices of satisfaction from those who have experienced the true taste of tradition.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-smooth active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next}
                className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-charcoal shadow-2xl hover:scale-110 active:scale-95 transition-smooth"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Testimonial Card Area */}
          <div className="lg:w-2/3 w-full">
            <div className="relative min-h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 lg:p-16 rounded-[4rem] relative"
                >
                  <Quote className="absolute top-10 right-10 w-20 h-20 text-white/5 -z-10" />
                  
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < TESTIMONIALS[activeIdx].rating ? 'text-primary-green fill-primary-green' : 'text-white/10'}`} />
                    ))}
                  </div>

                  <p className="text-2xl lg:text-4xl font-bold text-white mb-12 leading-snug tracking-tight">
                    "{TESTIMONIALS[activeIdx].feedback}"
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-green to-primary-red flex items-center justify-center text-white font-black text-2xl shadow-xl">
                      {TESTIMONIALS[activeIdx].name[0]}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-wider">{TESTIMONIALS[activeIdx].name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-primary-green" />
                        <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Verified Guest</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative Indicators */}
              <div className="absolute -bottom-10 right-10 flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 transition-smooth rounded-full ${activeIdx === i ? 'w-10 bg-primary-green' : 'w-4 bg-white/10 hover:bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
