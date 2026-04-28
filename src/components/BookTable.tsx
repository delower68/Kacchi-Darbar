import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, Send, MapPin } from 'lucide-react';
import { OUTLETS } from '../constants';
import { Outlet } from '../types';

const BookTable: React.FC = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(OUTLETS[0]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    people: '2'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Hi Kacchi Darbar!* I would like to book a table:
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Guests:* ${formData.people} Persons
*Branch:* ${selectedOutlet.name}`;
    
    window.open(`https://wa.me/${selectedOutlet.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="reservations" className="py-24 relative bg-charcoal overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-red/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-green/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Content Side */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-12 h-[1px] bg-primary-red" />
                  <span className="text-primary-red uppercase tracking-[0.3em] font-black text-[10px]">Reservations</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-none">
                  Book A <br />
                  <span className="text-white/20">Royal</span> <span className="text-primary-green">Table</span>
                </h2>
                <p className="text-white/40 mb-12 text-lg leading-relaxed max-w-sm">
                  Experience true royal hospitality. Reserve your spot at any of our premium outlets.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-green shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Serving Hours</h4>
                      <p className="text-white/30 text-sm">12:30 PM - 11:30 PM Daily</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-red shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Multiple Outlets</h4>
                      <p className="text-white/30 text-sm">Dhanmondi, Bairy Road & more</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-3 bg-white/5 rounded-[3rem] p-8 lg:p-12 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/10 blur-3xl -z-10 group-hover:bg-primary-green/20 transition-colors" />
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Outlet Selection */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/30 font-black flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Select Branch
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {OUTLETS.map((outlet) => (
                      <button
                        key={outlet.id}
                        type="button"
                        onClick={() => setSelectedOutlet(outlet)}
                        className={`py-4 px-4 rounded-2xl border-2 text-xs font-black transition-smooth ${
                          selectedOutlet.id === outlet.id 
                          ? 'border-primary-green bg-primary-green/10 text-primary-green' 
                          : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {outlet.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:border-primary-green outline-none transition-smooth text-white placeholder:text-white/10"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="017XXXXXXXX"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:border-primary-green outline-none transition-smooth text-white placeholder:text-white/10"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Date
                    </label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-4 focus:border-primary-green outline-none transition-smooth text-white text-sm [color-scheme:dark]"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Time
                    </label>
                    <input 
                      type="time" 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-4 focus:border-primary-green outline-none transition-smooth text-white text-sm [color-scheme:dark]"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4 col-span-2 md:col-span-1">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-black flex items-center gap-2">
                      <Users className="w-3 h-3" /> Guests
                    </label>
                    <select 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-4 focus:border-primary-green outline-none transition-smooth text-white text-sm appearance-none cursor-pointer"
                      value={formData.people}
                      onChange={(e) => setFormData({...formData, people: e.target.value})}
                    >
                      {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => <option key={n} value={n} className="bg-charcoal">{n} Persons</option>)}
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-6 bg-primary-green text-white font-black rounded-2xl flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-xs mt-4 shadow-2xl green-glow"
                >
                  <Send className="w-5 h-5" />
                  Request Booking via WhatsApp
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookTable;
