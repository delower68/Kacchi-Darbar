import React from 'react';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';
import { X, Calendar, MapPin, Phone, CreditCard, Banknote, Package, Clock, ChevronRight, Trash2 } from 'lucide-react';

interface OrderHistoryProps {
  onClose: () => void;
}

interface SavedOrder {
  id: string;
  items: {
    name: string;
    portion: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  payment: {
    method: string;
    transactionId: string | null;
  };
  branch: string;
  createdAt: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ onClose }) => {
  const [orders, setOrders] = React.useState<SavedOrder[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('kacchi_darbar_orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const deleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('kacchi_darbar_orders', JSON.stringify(updatedOrders));
    toast.error('Order history removed');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[85vh] bg-charcoal border border-white/5 rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">My <span className="text-primary-green">Orders</span></h2>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Previous Feastings at Kacchi Darbar</p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 rounded-full bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-10 md:px-10 custom-scrollbar">
          {orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8">
                <Package className="w-10 h-10 text-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No orders found</h3>
              <p className="text-white/30 text-sm max-w-xs">Looks like you haven't placed any orders yet. Head over to our menu and start feasting!</p>
              <button 
                onClick={onClose}
                className="mt-10 px-8 py-4 bg-primary-green text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg green-glow"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden group hover:border-primary-green/30 transition-smooth">
                  <div className="p-6 md:p-8 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary-green" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{order.id}</h4>
                        <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase font-black tracking-widest mt-1">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-3 rounded-xl bg-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/20 transition-all"
                        title="Delete Order History"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="text-right">
                        <div className="text-primary-green font-black text-2xl">৳{order.total}</div>
                        <div className="text-white/30 text-[10px] uppercase font-black tracking-widest mt-1">Total Paid</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 grid md:grid-cols-2 gap-10">
                    <div>
                      <h5 className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Order Items</h5>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-4">
                              <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-white/40">{item.quantity}x</span>
                              <div>
                                <div className="text-white font-medium">{item.name}</div>
                                <div className="text-[10px] text-white/30 uppercase tracking-widest font-black">{item.portion}</div>
                              </div>
                            </div>
                            <div className="text-white/60 font-bold">৳{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h5 className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Delivery & Payment</h5>
                        <div className="space-y-3">
                          <div className="flex items-start gap-4">
                            <MapPin className="w-4 h-4 text-primary-green mt-1 shrink-0" />
                            <div>
                              <div className="text-white text-sm font-medium">{order.branch}</div>
                              <div className="text-xs text-white/40 mt-1">{order.customer.address}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-4 h-4 flex items-center justify-center">
                              {order.payment.method.toLowerCase().includes('cash') ? <Banknote className="w-4 h-4 text-primary-green" /> : <CreditCard className="w-4 h-4 text-primary-green" />}
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">{order.payment.method}</div>
                              {order.payment.transactionId && (
                                <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">TXID: {order.payment.transactionId}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-white/5 bg-white/5 text-center">
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Thank you for choosing Kacchi Darbar!</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderHistory;
