"use client";
import { motion } from 'framer-motion';
import { UtensilsCrossed, Sparkles } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'menu',
  variant: 'v1',
  label: 'Lista de Itens (v1)',
  defaultData: {
    headline: 'Nosso {Cardápio}',
    categories: [{ name: 'Entradas', items: [{ name: 'Bruschetta', price: 'R$ 25', description: 'Tomates frescos.' }] }],
    style: {}
  }
};

export const schema = [
  { 
    group: '2. Conteúdo', 
    fields: [ 
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'visibility.showHeadline', label: 'Mostrar Título', type: 'toggle', default: true },
      { key: 'headline', label: 'Título {Destaque}', type: 'text', condition: 'visibility.showHeadline' }, 
      { key: 'visibility.showSubtitle', label: 'Mostrar Subtítulo', type: 'toggle', default: true },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', condition: 'visibility.showSubtitle' },
      { key: 'categories', label: 'Categorias do Menu', type: 'array', itemFields: [
        { key: 'name', label: 'Nome da Categoria', type: 'text' },
        { key: 'items', label: 'Itens', type: 'array', itemFields: [
          { key: 'name', label: 'Nome do Prato', type: 'text' },
          { key: 'price', label: 'Preço', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'featured', label: 'Destaque (Favorito)', type: 'toggle' }
        ]}
      ]}
    ] 
  },
  ...commonFineTuning
];

export default function Menu_V1({ data }) {
  if (!data) return null;

  const { 
    title = "Nosso {Cardápio} Exclusivo", 
    subtitle = "Uma experiência gastronômica artesanal com ingredientes selecionados.", 
    categories = [], 
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="text-brand-primary">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden bg-zinc-950" 
      style={{ backgroundColor: style.customBg || 'transparent' }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
          >
            <UtensilsCrossed size={14} className="text-brand-primary" />
            <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">Gastronomy Elite</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8"
          >
            {renderTitle(title)}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="space-y-24">
          {categories.map((cat, idx) => (
            <div key={idx} className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6 mb-12"
              >
                <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter shrink-0">
                  {cat.name}
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-brand-primary/40 to-transparent" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {cat.items?.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    <div className="flex justify-between items-end mb-2 gap-4">
                      <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
                        {item.name}
                      </h4>
                      <div className="h-px flex-grow border-t border-dashed border-zinc-800 group-hover:border-brand-primary/30 transition-colors mb-2" />
                      <span className="text-lg md:text-xl font-black text-brand-primary" style={{ color: accentColor }}>
                        {item.price}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed max-w-[90%]">
                      {item.description}
                    </p>
                    {item.featured && (
                      <div className="mt-3 flex items-center gap-2 text-brand-primary/60">
                        <Sparkles size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Favorito do Chef</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
