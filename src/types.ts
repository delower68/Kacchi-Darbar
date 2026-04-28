export type Category = 'Kacchi' | 'Polao' | 'Tehri' | 'Others' | 'Drinks & Dessert';

export type Portion = 'p1' | 'p3' | 'p5';

export interface MenuItem {
  id: string;
  name: string;
  price: {
    p1: number;
    p3?: number;
    p5?: number;
  };
  description: string;
  category: Category;
  image: string;
  rating: number;
  reviews: { name: string; rating: number; comment: string }[];
}

export interface Outlet {
  id: string;
  name: string;
  whatsapp: string;
  address: string;
  phone: string;
  mapUrl: string;
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  rating: number;
}
