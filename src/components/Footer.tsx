import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold tracking-tight text-white mb-8 block">
              Kacchi <span className="text-primary-green">Darbar</span>
            </span>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Dhaka's most authentic premium Kacchi Biryani destination. We preserve the royal culinary traditions with a modern touch.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary-green transition-smooth border border-white/5">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-primary-red transition-smooth border border-white/5">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-accent-yellow hover:text-charcoal transition-smooth border border-white/5">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Explore</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-primary-green transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary-green transition-colors">Our Story</a></li>
              <li><a href="#menu" className="hover:text-primary-green transition-colors">Royal Menu</a></li>
              <li><a href="#contact" className="hover:text-primary-green transition-colors">Locations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Outlets</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li>Dhanmondi, Road 27</li>
              <li>Mirpur 12, Main Road</li>
              <li>Banani (Coming Soon)</li>
              <li>Uttara (Coming Soon)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Join Our List</h4>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">Get royal offers and new menu updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-primary-green outline-none w-full transition-smooth"
              />
              <button className="bg-primary-red text-white p-4 rounded-2xl font-bold shadow-lg red-glow">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          <p>© 2024 Kacchi Darbar. Handcrafted with ❤️ in Dhaka.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
