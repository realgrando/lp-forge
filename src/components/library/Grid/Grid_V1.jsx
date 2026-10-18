"use client";
// src/components/sections/GridBlock.jsx
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, ExternalLink } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'grid',
  variant: 'v1',
  label: 'Grid Base (v1)',
  defaultData: {
    style: {}
  }
};

export const schema = [...commonFineTuning];

export default function Grid_V1({ data }) {
  if (!data) return null;

  const { 
    title, 
    subtitle, 
    items = [], 
    layout = {}, 
    visibility = {},
    labels = {} // Adicionando suporte a labels customizadas
  } = data;

  const cols = layout.columnsDesktop || 3;
  const renderOrder = layout.cardRenderOrder || ['image', 'header', 'description', 'action'];

  // Labels dinâmicas para suportar múltiplos nichos
  const actionLabel = labels.action || "Ver detalhes";

  const showPrice = visibility.showPrice !== false;
  const showButton = visibility.showButton !== false;
  const showBadges = visibility.showBadges !== false;
  const showDescription = visibility.showDescription !== false;

  const gridColsMap = {
    2: 'lg:grid-cols-2 max-w-4xl',
    3: 'lg:grid-cols-3 max-w-6xl',
    4: 'lg:grid-cols-4 max-w-7xl'
  };

  return (
    <section id="grid-section" className={`py-20 px-6`}>
      <div className={`container mx-auto`}>
        
        {/* HEADER DA SEÇÃO */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            {title}
          </motion.h2>
          <div className="h-1 w-24 bg-brand-primary mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>

        {/* GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsMap[cols]} gap-8 mx-auto`}>
          {items.map((item, index) => {
            
            const cardBlocks = {
              image: (
                <div key="image" className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {showBadges && item.badge && (
                    <div className="absolute top-4 left-4 bg-brand-primary text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10">
                      <Star size={12} fill="black" /> {item.badge}
                    </div>
                  )}
                </div>
              ),

              header: (
                <div key="header" className="px-6 pt-6 flex justify-between items-center shrink-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors leading-tight">
                    {item.name}
                  </h3>
                  {showPrice && item.price && (
                    <span className="text-brand-primary font-bold text-lg whitespace-nowrap ml-4 bg-white/5 px-2 py-1 rounded-md">
                      {item.price}
                    </span>
                  )}
                </div>
              ),

              description: showDescription && (
                <div key="description" className="px-6 py-3 flex-grow">
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              ),

              action: (
                <div key="action" className="px-6 pb-6 mt-auto shrink-0">
                  {showButton ? (
                    <a 
                      href={item.link} 
                      target="_blank"
                      className="w-full py-3 px-4 rounded-xl border border-white/10 text-white font-medium hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all flex items-center justify-center gap-2 group/btn shadow-lg"
                    >
                      {actionLabel === "Pedir Agora" ? <ShoppingBag size={18} /> : <ExternalLink size={18} />}
                      {actionLabel}
                    </a>
                  ) : (
                    <a href={item.link} className="text-brand-primary text-sm font-bold flex items-center gap-2 hover:underline">
                      {actionLabel} <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              )
            };

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-bg-main border border-white/5 rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-all hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
              >
                {renderOrder.map(blockKey => cardBlocks[blockKey])}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}