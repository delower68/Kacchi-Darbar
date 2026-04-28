import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageCircle, User, MapPin, Phone, Minus, Plus, Trash2 } from 'lucide-react';
import { MenuItem, Outlet, Portion } from '../types';
import { OUTLETS } from '../constants';

interface CheckoutProps {
  items: { item: MenuItem; quantity: number; portion: Portion }[];
  onBack: () => void;
  onUpdateQuantity: (id: string, portion: Portion, delta: number) => void;
  onUpdatePortion: (id: string, oldPortion: Portion, newPortion: Portion) => void;
  onRemove: (id: string, portion: Portion) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ 
  items, 
  onBack, 
  onUpdateQuantity, 
  onUpdatePortion, 
  onRemove 
}) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(OUTLETS[0]);

  const portionLabels = {
    p1: 'Single',
    p3: 'Double',
    p5: 'Family'
  };

  const calculateTotal = () => {
    return items.reduce((acc, curr) => acc + ((curr.item.price[curr.portion] || curr.item.price.p1) * curr.quantity), 0);
  };

  const handleOrder = () => {
    if (!customerName || !address) {
      alert('Please fill in your name and address.');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const itemsSummary = items
      .map(i => `\n*Item:* ${i.item.name}\n*Portion:* ${portionLabels[i.portion]}\n*Quantity:* ${i.quantity}\n*Price:* ৳${(i.item.price[i.portion] || i.item.price.p1) * i.quantity}`)
      .join('\n---');

    const message = `*Hi Kacchi Darbar!* I would like to place an order: ${itemsSummary}\n\n*Total Order Price:* ৳${calculateTotal()}\n\n*Customer Details:*\n*Name:* ${customerName}\n*Address:* ${address}\n*Phone:* ${phone || 'N/A'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${selectedOutlet.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-charcoal overflow-y-auto">
      {/* Decorative Gradients */}
      <div className="fixed top-0 right-0 w-[40%] h-full bg-primary-red/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[40%] h-full bg-primary-green/5 blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 py-12 max-w-5xl relative">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-12 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-black uppercase tracking-[0.2em] text-xs">Back to Menu</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white/5 rounded-[2.5rem] p-8 lg:p-10 border border-white/5 backdrop-blur-md">
              <h3 className="text-primary-green font-black uppercase tracking-[0.3em] text-xs mb-10">Your Selection</h3>
              
              <div className="space-y-6 mb-12 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {items.length === 0 ? (
                  <p className="text-white/20 text-center py-10 font-bold italic">No items in your cart.</p>
                ) : (
                  items.map(({ item, quantity, portion }, idx) => {
                    const price = item.price[portion] || item.price.p1;
                    return (
                      <div key={`${item.id}-${portion}`} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                        <div className="flex gap-4 items-center">
                          <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-white leading-tight">{item.name}</h4>
                              <button 
                                onClick={() => onRemove(item.id, portion)}
                                className="text-white/20 hover:text-primary-red transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <span className="text-primary-red font-black text-sm block mt-1">৳{price * quantity}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {(['p1', 'p3', 'p5'] as Portion[]).map((p) => (
                            item.price[p] && (
                              <button
                                key={p}
                                onClick={() => onUpdatePortion(item.id, portion, p)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-smooth border ${
                                  portion === p 
                                    ? 'bg-primary-green text-white border-primary-green' 
                                    : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                                }`}
                              >
                                {p === 'p1' ? 'Single' : p === 'p3' ? 'Double' : 'Family'}
                              </button>
                            )
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-1 border border-white/5">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, portion, -1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-black text-white min-w-[20px] text-center">{quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, portion, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
                            Unit: ৳{price}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/40 font-bold">Subtotal</span>
                  <span className="text-white font-bold">৳{calculateTotal()}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/40 font-bold">Delivery Fee</span>
                  <span className="text-primary-green font-bold">Calculated on WhatsApp</span>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <div>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black block mb-1">Total Payable</span>
                    <span className="text-4xl font-black text-white">৳{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-[1px] bg-primary-green" />
                <span className="text-primary-green uppercase tracking-[0.2em] text-[10px] font-black">Fast Delivery</span>
              </div>
              <h1 className="text-4xl font-black mb-4">Complete Your <span className="text-white/20">Royal</span> <span className="text-primary-green">Order</span></h1>
              <p className="text-white/40 mb-10 max-w-sm">Experience the authentic taste of tradition delivered right to your doorstep. Fill in your details to proceed.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white/30 font-black uppercase tracking-[0.2em] text-[10px]">
                  <User className="w-3 h-3 text-primary-green" /> Customer Name
                </label>
                <input 
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Delower Hossain"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-primary-green outline-none transition-smooth placeholder:text-white/10"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white/30 font-black uppercase tracking-[0.2em] text-[10px]">
                  <MapPin className="w-3 h-3 text-primary-red" /> Delivery Address
                </label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name, Apartment, House no."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-primary-green outline-none transition-smooth h-32 resize-none placeholder:text-white/10"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white/30 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Phone className="w-3 h-3" /> Phone Number
                </label>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:border-primary-green outline-none transition-smooth placeholder:text-white/10"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-white/30 font-black uppercase tracking-[0.2em] text-[10px]">
                   Select Nearest Branch
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {OUTLETS.map((outlet) => (
                    <button
                      key={outlet.id}
                      onClick={() => setSelectedOutlet(outlet)}
                      className={`p-5 rounded-2xl border-2 text-xs font-black transition-smooth tracking-widest uppercase ${
                        selectedOutlet.id === outlet.id ? 'bg-primary-green/10 text-primary-green border-primary-green' : 'border-white/5 text-white/20 hover:border-white/20'
                      }`}
                    >
                      {outlet.name}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrder}
                className="w-full py-6 bg-primary-green text-white font-black rounded-3xl flex items-center justify-center gap-4 shadow-2xl green-glow tracking-[0.3em] uppercase text-xs mt-12"
              >
                <MessageCircle className="w-6 h-6" />
                Place Order via WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
