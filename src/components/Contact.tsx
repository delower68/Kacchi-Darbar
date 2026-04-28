import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ChevronRight, MessageCircle } from 'lucide-react';
import { OUTLETS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-charcoal relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-green/5 -skew-x-12 -z-10 translate-x-32" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-[1px] bg-primary-red" />
              <span className="text-primary-red uppercase tracking-[0.3em] font-black text-[10px]">Our Locations</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black leading-none">
              Where to <br />
              <span className="text-white/20">Find</span> <span className="text-white">Us</span>
            </h2>
          </div>
          <div className="lg:max-w-md text-right">
            <p className="text-white/40 text-lg mb-6">
              Visit any of our premium branches to experience the royal taste of Kacchi Biryani.
            </p>
            <div className="flex justify-end gap-6 text-sm font-black uppercase tracking-widest text-primary-green">
              <a href="mailto:info@kacchidarbar.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> info@kacchidarbar.com
              </a>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {OUTLETS.map((outlet, idx) => (
            <motion.div
              key={outlet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white/5 border border-white/10 rounded-[3rem] p-10 hover:bg-white/[0.08] transition-smooth relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 blur-3xl group-hover:bg-primary-green/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center text-primary-green group-hover:scale-110 group-hover:text-white group-hover:bg-primary-green transition-smooth">
                  <MapPin className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full">
                  Outlet 0{idx + 1}
                </span>
              </div>

              <h3 className="text-3xl font-black text-white mb-4 group-hover:text-primary-green transition-colors">{outlet.name}</h3>
              <p className="text-white/40 mb-8 text-sm leading-relaxed">{outlet.address}</p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-white/60">
                  <Phone className="w-4 h-4 text-primary-green" />
                  <span className="font-bold">{outlet.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Clock className="w-4 h-4 text-primary-red" />
                  <span className="text-xs uppercase tracking-widest font-black">12:30 PM - 11:30 PM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => window.open(`https://wa.me/${outlet.whatsapp}`, '_blank')}
                  className="flex-1 py-4 bg-primary-green/10 text-primary-green font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-green hover:text-white transition-smooth"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
                <button 
                  className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-white/30 transition-smooth"
                  title="View on Map"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 p-12 rounded-[4rem] bg-gradient-to-r from-primary-green/20 to-primary-red/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-charcoal shadow-2xl">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-white">Need Support?</h4>
              <p className="text-white/60">Our team is here to assist you 24/7</p>
            </div>
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-5 bg-white text-charcoal font-black rounded-2xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-smooth"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
