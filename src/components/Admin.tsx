import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import { 
  Lock, 
  LayoutDashboard, 
  ShoppingBag, 
  Utensils, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Search,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  X,
  Eye,
  EyeOff,
  ChevronRight,
  TrendingDown,
  DollarSign,
  Package
} from 'lucide-react';

import { MenuItem, Category } from '../types';

interface AdminProps {
  onClose: () => void;
  menuItems: MenuItem[];
  onUpdateMenu: (items: MenuItem[]) => void;
}

const Admin: React.FC<AdminProps> = ({ onClose, menuItems, onUpdateMenu }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu' | 'customers'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Menu Management State
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    category: 'Kacchi',
    price: { p1: 0, p3: 0, p5: 0 },
    image: '',
    rating: 5,
    reviews: []
  });

  const categories: Category[] = ['Kacchi', 'Polao', 'Tehri', 'Others', 'Drinks & Dessert'];

  const handleAddItem = () => {
    if (!formData.name || !formData.price?.p1) return;
    
    const newItem: MenuItem = {
      id: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name!,
      description: formData.description || '',
      category: formData.category as Category,
      price: formData.price!,
      image: formData.image || 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800',
      rating: 5,
      reviews: []
    } as MenuItem;

    onUpdateMenu([...menuItems, newItem]);
    setIsAddingNew(false);
    resetForm();
    toast.success('Royal dish added successfully!');
  };

  const handleUpdateItem = () => {
    if (!editingItem || !formData.name) return;

    const updatedItems = menuItems.map(item => 
      item.id === editingItem.id ? { ...item, ...formData } as MenuItem : item
    );

    onUpdateMenu(updatedItems);
    setEditingItem(null);
    resetForm();
    toast.success('Dish updated successfully!');
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteItem = (id: string) => {
    onUpdateMenu(menuItems.filter(item => item.id !== id));
    setConfirmDeleteId(null);
    toast.error('Dish removed from menu');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Kacchi',
      price: { p1: 0, p3: 0, p5: 0 },
      image: '',
      rating: 5,
      reviews: []
    });
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsAddingNew(false);
  };

  // Mock Data for Admin
  const stats = [
    { label: 'Total Revenue', value: '৳1,24,500', trend: '+12.5%', icon: DollarSign, color: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Active Orders', value: '18', trend: '+5', icon: Clock, color: 'bg-primary-blue/10 text-primary-blue' },
    { label: 'Total Customers', value: '842', trend: '+24', icon: Users, color: 'bg-accent-yellow/10 text-accent-yellow' },
    { label: 'Menu Items', value: '32', trend: '0', icon: Utensils, color: 'bg-primary-red/10 text-primary-red' },
  ];

  const recentOrders = [
    { id: 'ORD-7291', customer: 'Arif Ahmed', total: 1250, status: 'Preparing', time: '10 mins ago' },
    { id: 'ORD-7290', customer: 'Sumi Khan', total: 850, status: 'Completed', time: '25 mins ago' },
    { id: 'ORD-7289', customer: 'Rahul Roy', total: 2400, status: 'Pending', time: '1 hour ago' },
    { id: 'ORD-7288', customer: 'Nisha Paul', total: 1800, status: 'Preparing', time: '2 hours ago' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@kacchidarbar.com' && password === 'admin') {
      setIsLoggedIn(true);
      toast.success('Welcome back, Admin!');
    } else {
      toast.error('Invalid credentials!');
    }
  };

  if (!isLoggedIn) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-2xl"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">ADMIN <span className="text-primary-green">LOGIN</span></h2>
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block ml-4">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kacchidarbar.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-primary-green transition-smooth"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest block ml-4">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-primary-green transition-smooth pr-14"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors p-2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full py-5 bg-primary-green text-charcoal font-black rounded-2xl text-xs uppercase tracking-[0.3em] shadow-xl green-glow hover:scale-[1.02] active:scale-[0.98] transition-smooth flex items-center justify-center gap-3"
            >
              <Lock className="w-4 h-4" /> Secure Login
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-charcoal text-white flex flex-col md:flex-row overflow-hidden"
    >
      {/* Sidebar - Hidden on mobile, Bottom Nav instead */}
      <div className="hidden md:flex w-80 bg-white/5 border-r border-white/5 flex-col pt-12">
        <div className="px-8 mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">KACCHI <span className="text-primary-green">DARBAR</span></h2>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-2">Admin Dashboard v1.0</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'menu', label: 'Menu Management', icon: Utensils },
            { id: 'customers', label: 'Customers', icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-smooth group ${activeTab === item.id ? 'bg-primary-green text-charcoal font-bold' : 'hover:bg-white/5 text-white/50'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
              {activeTab === item.id && <motion.div layoutId="activeTab" className="ml-auto w-1.5 h-1.5 rounded-full bg-charcoal" />}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-4 text-white/30 hover:text-primary-red transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-charcoal pb-32 md:pb-0">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-16">
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic mb-2">Welcome Back, <span className="text-primary-green">Admin</span></h1>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Everything is running smoothly today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="bg-white/5 border border-white/10 rounded-2xl pl-14 pr-8 py-4 text-sm focus:border-primary-green outline-none w-full md:w-64 transition-smooth"
                />
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/30 hover:bg-white/5 hover:text-white transition-smooth flex-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {activeTab === 'dashboard' && (
            <div className="space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={stat.label} 
                    className="p-4 md:p-8 bg-white/5 border border-white/5 rounded-[24px] md:rounded-[32px] hover:border-primary-green/20 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4 md:mb-8">
                      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <span className="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">{stat.trend}</span>
                    </div>
                    <div className="text-xl md:text-3xl font-black text-white mb-1 md:mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Section */}
              <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-[32px] md:rounded-[40px] overflow-hidden">
                  <div className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight italic">Recent <span className="text-primary-green">Orders</span></h3>
                    <button className="text-[10px] font-black text-white/30 hover:text-primary-green uppercase tracking-widest transition-colors">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Order ID</th>
                          <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Customer</th>
                          <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Amount</th>
                          <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 md:px-10 py-4 md:py-6 text-sm font-bold text-white tracking-widest">{order.id}</td>
                            <td className="px-6 md:px-10 py-4 md:py-6">
                              <div className="text-sm font-medium text-white">{order.customer}</div>
                              <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">{order.time}</div>
                            </td>
                            <td className="px-6 md:px-10 py-4 md:py-6 text-sm font-black text-primary-green italic tracking-tight">৳{order.total}</td>
                            <td className="px-6 md:px-10 py-4 md:py-6">
                              <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary-blue/10 text-primary-blue'}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6 md:space-y-8">
                  <div className="p-6 md:p-10 bg-white/5 border border-white/5 rounded-[32px] md:rounded-[40px]">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight italic mb-6 md:mb-8">Quick <span className="text-primary-red">Actions</span></h3>
                    <div className="space-y-4">
                      <button className="w-full p-4 md:p-6 bg-white/5 border border-white/5 rounded-2xl md:rounded-3xl flex items-center gap-4 md:gap-6 hover:border-primary-green/30 transition-smooth text-left group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-green/10 flex items-center justify-center text-primary-green flex-none">
                          <Plus className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Add New Item</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Expanding the menu</div>
                        </div>
                      </button>
                      <button className="w-full p-4 md:p-6 bg-white/5 border border-white/5 rounded-2xl md:rounded-3xl flex items-center gap-4 md:gap-6 hover:border-primary-blue/30 transition-smooth text-left group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue flex-none">
                          <Package className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">Stock Update</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Manage availability</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-8 md:space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight italic">Menu <span className="text-primary-green">Management</span></h3>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mt-1 pr-6">Add or edit items in the royal catalogue</p>
                </div>
                <button 
                  onClick={() => { setIsAddingNew(true); setEditingItem(null); resetForm(); }}
                  className="w-full md:w-auto px-8 py-4 bg-primary-green text-charcoal font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-3"
                >
                  <Plus className="w-4 h-4" /> Add New Dish
                </button>
              </div>

              {(isAddingNew || editingItem) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-primary-green/20 rounded-[32px] md:rounded-[40px] p-6 md:p-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 md:p-8">
                    <button onClick={() => { setIsAddingNew(false); setEditingItem(null); }} className="text-white/20 hover:text-white transition-colors">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <h4 className="text-lg md:text-xl font-bold mb-8 md:mb-10 italic uppercase">{editingItem ? 'Edit' : 'Add New'} <span className="text-primary-green">Dish</span></h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Dish Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="e.g. Basmati Kacchi Special"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary-green transition-smooth"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Description</label>
                        <textarea 
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          placeholder="Enter details..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary-green transition-smooth resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Category</label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary-green transition-smooth appearance-none cursor-pointer"
                          >
                            {categories.map(cat => <option key={cat} value={cat} className="bg-charcoal">{cat}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Image URL</label>
                          <input 
                            type="text" 
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary-green transition-smooth"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 md:p-8 bg-white/5 rounded-3xl space-y-6">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-primary-red">Pricing (BDT)</h5>
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest text-center block">Single</label>
                            <input 
                              type="number" 
                              value={formData.price?.p1}
                              onChange={(e) => setFormData({...formData, price: {...formData.price!, p1: parseInt(e.target.value) || 0}})}
                              className="w-full bg-charcoal border border-white/10 rounded-xl px-2 py-3 text-center text-sm outline-none focus:border-primary-green"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest text-center block">Double</label>
                            <input 
                              type="number" 
                              value={formData.price?.p3}
                              onChange={(e) => setFormData({...formData, price: {...formData.price!, p3: parseInt(e.target.value) || 0}})}
                              className="w-full bg-charcoal border border-white/10 rounded-xl px-2 py-3 text-center text-sm outline-none focus:border-primary-green"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest text-center block">Family</label>
                            <input 
                              type="number" 
                              value={formData.price?.p5}
                              onChange={(e) => setFormData({...formData, price: {...formData.price!, p5: parseInt(e.target.value) || 0}})}
                              className="w-full bg-charcoal border border-white/10 rounded-xl px-2 py-3 text-center text-sm outline-none focus:border-primary-green"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          onClick={editingItem ? handleUpdateItem : handleAddItem}
                          className="w-full py-5 bg-primary-green text-charcoal font-black rounded-2xl uppercase tracking-widest text-xs shadow-xl active:scale-[0.98] transition-smooth flex items-center justify-center gap-3"
                        >
                          {editingItem ? <><CheckCircle className="w-4 h-4" /> Update Dish</> : <><Plus className="w-4 h-4" /> Add to Menu</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Responsive Menu List */}
              <div className="hidden md:block bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Dish</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Category</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Price (Single)</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-white/20">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <img src={item.image} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt={item.name} />
                              <div>
                                <div className="text-sm font-bold text-white tracking-tight">{item.name}</div>
                                <div className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1 line-clamp-1 max-w-[200px]">{item.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="px-4 py-2 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-sm font-black text-primary-green italic tracking-tight">৳{item.price.p1}</td>
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-3">
                              {confirmDeleteId === item.id ? (
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="px-4 py-2 bg-primary-red text-white text-[10px] font-black uppercase rounded-xl hover:scale-105 transition-smooth"
                                  >
                                    Confirm
                                  </button>
                                  <button 
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-4 py-2 bg-white/5 text-white/40 text-[10px] font-black uppercase rounded-xl hover:text-white transition-smooth"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => startEdit(item)}
                                    className="p-3 rounded-xl bg-primary-blue/5 text-primary-blue hover:bg-primary-blue/10 transition-smooth"
                                    title="Edit Dish"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => setConfirmDeleteId(item.id)}
                                    className="p-3 rounded-xl bg-primary-red/5 text-primary-red hover:bg-primary-red/10 transition-smooth"
                                    title="Delete Dish"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card List */}
              <div className="md:hidden space-y-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt={item.name} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black text-white/20 uppercase tracking-widest mb-1">{item.category}</div>
                        <h4 className="font-bold text-white tracking-tight truncate">{item.name}</h4>
                        <div className="text-primary-green font-black text-sm italic mt-1">৳{item.price.p1}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                       {confirmDeleteId === item.id ? (
                         <div className="flex-1 flex gap-2">
                           <button 
                             onClick={() => handleDeleteItem(item.id)}
                             className="flex-1 py-3 bg-primary-red text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                           >
                             Yes, Delete
                           </button>
                           <button 
                             onClick={() => setConfirmDeleteId(null)}
                             className="flex-1 py-3 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                           >
                             Cancel
                           </button>
                         </div>
                       ) : (
                         <>
                           <button 
                             onClick={() => startEdit(item)}
                             className="flex-1 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center justify-center gap-2 active:bg-white/10"
                           >
                             <Edit2 className="w-3 h-3" /> Edit
                           </button>
                           <button 
                             onClick={() => setConfirmDeleteId(item.id)}
                             className="flex-1 py-3 bg-primary-red/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary-red flex items-center justify-center gap-2 active:bg-primary-red/20"
                           >
                             <Trash2 className="w-3 h-3" /> Delete
                           </button>
                         </>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'menu' && (
            <div className="h-full flex items-center justify-center py-20 md:py-40 border-2 border-dashed border-white/5 rounded-[32px] md:rounded-[40px]">
               <div className="text-center text-white/20 px-6">
                  <Clock className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" />
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest">Incoming Feature</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest mt-2">{activeTab} management is being cooked.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-24 bg-charcoal/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 z-[210]">
        {[
          { id: 'dashboard', icon: LayoutDashboard },
          { id: 'orders', icon: ShoppingBag },
          { id: 'menu', icon: Utensils },
          { id: 'customers', icon: Users },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-smooth ${activeTab === item.id ? 'bg-primary-green text-charcoal shadow-lg shadow-primary-green/20 scale-110' : 'text-white/20'}`}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary-red/40"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};

export default Admin;
