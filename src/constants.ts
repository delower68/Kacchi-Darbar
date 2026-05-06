import { MenuItem, Outlet, Chef, Testimonial } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Kacchi
  {
    id: 'basmati-kacchi',
    name: 'Basmati Kacchi',
    price: { p1: 320, p3: 950, p5: 1580 },
    description: 'Authentic Basmati Kacchi Biryani with tender mutton pieces.',
    category: 'Kacchi',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: []
  },
  {
    id: 'basmati-kacchi-shorbot-kabab',
    name: 'Basmati Kacchi, Badam Shorbot, Jali Kabab',
    price: { p1: 440, p3: 1300, p5: 2200 },
    description: 'Kacchi served with refreshing badam shorbot and crispy jali kabab.',
    category: 'Kacchi',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: []
  },
  {
    id: 'basmati-kacchi-roast-borhani-kabab',
    name: 'Basmati Kacchi, Murgir Roast, Borhani, Jali Kabab',
    price: { p1: 550, p3: 1630, p5: 2690 },
    description: 'Full royal experience with kacchi, chicken roast, borhani and kabab.',
    category: 'Kacchi',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviews: []
  },
  
  // Polao

  // Tehri

  // Others
  {
    id: 'plain-polao',
    name: 'Plain Polao',
    price: { p1: 100 },
    description: 'Fragrant aromatic rice cooked with ghee.',
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: []
  },
  {
    id: 'khasir-rezala',
    name: 'Khasir Rezala',
    price: { p1: 200 },
    description: 'Premium mutton rezala with traditional flavors.',
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: []
  },
  {
    id: 'jali-kabab',
    name: 'Jali Kabab',
    price: { p1: 60 },
    description: 'Crispy fried net-like beef kabab.',
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: []
  },
  {
    id: 'chatni',
    name: 'Chatni',
    price: { p1: 20 },
    description: 'Refreshing tangy tomato chatni.',
    category: 'Others',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviews: []
  },

  // Drinks & Dessert
  {
    id: 'badam-shorbot',
    name: 'Badam Shorbot',
    price: { p1: 90 },
    description: 'Refreshing almond milk drink with saffron.',
    category: 'Drinks & Dessert',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: []
  }
];

export const OUTLETS: Outlet[] = [
  {
    id: 'mirpur',
    name: 'Mirpur Branch',
    whatsapp: '8801871018048',
    address: 'Plot 10, Block C, Mirpur 12, Dhaka',
    phone: '+880 1871-018048',
    mapUrl: 'https://www.google.com/maps/embed?pb=...'
  },
  {
    id: 'dhanmondi',
    name: 'Dhanmondi Branch',
    whatsapp: '8801968136686',
    address: 'House 54, Road 27, Dhanmondi, Dhaka',
    phone: '+880 1968-136686',
    mapUrl: 'https://www.google.com/maps/embed?pb=...'
  }
];

export const CHEFS: Chef[] = [
  {
    id: '1',
    name: 'Chef Karim Ullah',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Chef Ahmed Safat',
    role: 'Biryani Specialist',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Fahim Faisal',
    feedback: 'The aroma itself is enough to make you hungry. Authentic taste!',
    rating: 5
  },
  {
    id: '2',
    name: 'Sara Khan',
    feedback: 'Best mutton results in Dhaka. High quality ingredients used for sure.',
    rating: 5
  },
  {
    id: '3',
    name: 'Tanvir Hasan',
    feedback: 'Great ambiance and even better food. The combo is a must-try.',
    rating: 4
  }
];
