import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ShoppingBag, MapPin, User, Phone } from 'lucide-react';
import { OUTLETS, MENU_ITEMS } from '../constants';

const OrderSystem: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    outlet: OUTLETS[0].id,
    items: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const outlet = OUTLETS.find(o => o.id === formData.outlet) || OUTLETS[0];
    const message = `*KACCHI DARBAR ORDER REQUEST*\n\n` +
      `*Outlet:* ${outlet.name}\n` +
      `*Customer:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Items:* ${formData.items}\n\n` +
      `Please confirm the order. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${outlet.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="order" className="py-24 relative bg-charcoal overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gold/5 -skew-x-12 translate-x-1/2 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold uppercase tracking-[0.2em] font-medium text-sm mb-4 block">Fast Delivery</span>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Order Your Favorite <span className="text-gold">Biryani</span></h2>
              <p className="text-white/60 mb-10 text-lg">
                Can't come to us? We'll bring the taste of Kacchi Darbar to your doorstep. Fill out the form and we'll connect via WhatsApp to confirm your delivery.
              </p>
              
              <div className="space-y-6">
                {OUTLETS.map((outlet) => (
                  <div key={outlet.id} className="flex items-start gap-4 p-6 rounded-2xl bg-charcoal-light border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{outlet.name} Branch</h4>
                      <p className="text-white/40 text-sm mb-2">{outlet.address}</p>
                      <p className="text-gold text-sm font-bold">{outlet.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-charcoal-light p-8 md:p-12 rounded-[2rem] border border-gold/20 shadow-2xl relative"
            >
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <ShoppingBag className="w-8 h-8" />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Customer Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name"
                      className="w-full bg-charcoal border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-gold outline-none transition-smooth"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                    <input 
                      type="tel" 
                      required
                      placeholder="8801XXXXXXXXX"
                      className="w-full bg-charcoal border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-gold outline-none transition-smooth"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Select Outlet</label>
                  <div className="grid grid-cols-2 gap-4">
                    {OUTLETS.map((outlet) => (
                      <button
                        key={outlet.id}
                        type="button"
                        onClick={() => setFormData({...formData, outlet: outlet.id})}
                        className={`py-4 rounded-xl border text-sm font-bold transition-smooth ${
                          formData.outlet === outlet.id ? 'bg-gold text-charcoal border-gold shadow-lg shadow-gold/20' : 'border-white/10 hover:border-gold/50'
                        }`}
                      >
                        {outlet.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Items To Order</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="e.g. 2x Kacchi Combo, 1x Borhani"
                    className="w-full bg-charcoal border border-white/10 rounded-xl py-4 px-4 focus:border-gold outline-none transition-smooth resize-none"
                    value={formData.items}
                    onChange={(e) => setFormData({...formData, items: e.target.value})}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-gold text-charcoal font-bold rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  <MessageCircle className="w-6 h-6" />
                  Order via WhatsApp
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSystem;
