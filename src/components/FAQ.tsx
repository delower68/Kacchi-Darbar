import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "What makes Kacchi Darbar's biryani special?",
    answer: "We use the traditional Dum Pukht method, matching premium Basmati rice with tender, locally-sourced mutton and our secret blend of 21 spices. Our Kacchi is cooked for 6+ hours in heavy copper pots sealed with dough to lock in every ounce of flavor."
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes! We offer home delivery across all our outlet areas. You can place your order directly through our website or via WhatsApp. Delivery typically takes 30-45 minutes depending on your location."
  },
  {
    question: "Can I host a large event or party at your outlets?",
    answer: "Absolutely! Most of our outlets feature spacious, premium dining halls perfect for birthdays, corporate events, and wedding parties. We also offer specialized catering packages for external venues."
  },
  {
    question: "Are your meat sources Halal certified?",
    answer: "Yes, every single item at Kacchi Darbar is prepared using 100% Halal certified meat and ingredients. We maintain strict hygiene and quality standards across all our kitchens."
  },
  {
    question: "Do you have options for children or non-mutton lovers?",
    answer: "Certainly! While we are famous for Kacchi, we also serve delicious Chicken Roast, Beef Rezala, and Polao. We also have mild flavor profiles suitable for children and high-quality desserts like Shahi Firni and sweet yogurt."
  }
];

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}) => {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-6 rounded-3xl transition-smooth text-left border ${
          isOpen 
            ? 'bg-primary-green/10 border-primary-green/30' 
            : 'bg-white/5 border-white/5 hover:bg-white/10'
        }`}
      >
        <span className={`text-lg font-bold ${isOpen ? 'text-primary-green' : 'text-white'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className={`p-2 rounded-full ${isOpen ? 'bg-primary-green text-white' : 'text-white/40'}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-8 text-white/60 leading-relaxed text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden bg-charcoal" id="faq">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary-green/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-red/5 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary-green/20 rounded-2xl flex items-center justify-center mb-6"
          >
            <HelpCircle className="w-8 h-8 text-primary-green" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
            Common <span className="text-primary-green">Questions</span>
          </h2>
          <p className="text-white/40 max-w-xl text-lg">
            Everything you need to know about our service, quality, and dining experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm">
            Still have questions? <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-primary-green font-bold hover:underline"
            >
              Contact our support team
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
