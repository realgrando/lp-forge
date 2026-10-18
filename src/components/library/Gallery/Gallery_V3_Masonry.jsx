"use client";
// src/components/library/Gallery/Gallery_V3_Masonry.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'gallery',
  variant: 'v3',
  label: 'Masonry Elegante (v3)',
  defaultData: {
    badge: 'Portfólio',
    headline: 'Arte em cada {detalhe}',
    subtitle: 'Navegue por nossa galeria e inspire-se com as criações que já entregamos.',
    items: [
      { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600', category: 'Construção', title: 'Residência Villa' },
      { image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', category: 'Design', title: 'Interior Minimalista' },
      { image: 'https://images.unsplash.com/photo-1600566753086-00f18efc2207?auto=format&fit=crop&q=80&w=600', category: 'Construção', title: 'Área Externa' },
      { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', category: 'Decor', title: 'Sala de Estar' },
      { image: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?auto=format&fit=crop&q=80&w=600', category: 'Construção', title: 'Cozinha Gourmet' },
    ],
    layout: { paddingY: 'py-24', grayscale: false },
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] },
      { key: 'layout.grayscale', label: 'Imagens em P&B', type: 'toggle', default: false }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'items', label: 'Imagens da Galeria', type: 'array', itemFields: [
        { key: 'image', label: 'Foto', type: 'image' },
        { key: 'title', label: 'Título da Foto', type: 'text' },
        { key: 'category', label: 'Categoria (Ex: Gourmet)', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Gallery_V3_Masonry({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!data) return null;

  const { badge, headline, subtitle, items = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  const grayscale = layout.grayscale || false;

  const renderHighlightedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const content = part.slice(1, -1);
        return <span key={i} style={{ color: accentColor }}>{content}</span>;
      }
      return part;
    });
  };

  return (
    <section 
      className={`${layout.paddingY || 'py-24'} relative bg-zinc-950 text-white`}
      style={{ backgroundColor: style.customBg || undefined, color: style.customText || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {visibility.showBadge !== false && badge && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10 bg-white/5"
              style={{ color: accentColor }}
            >
              {badge}
            </motion.span>
          )}
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter mb-6 leading-tight`}
          >
            {renderHighlightedText(headline)}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg font-medium"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="relative rounded-3xl overflow-hidden group cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImage(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className={`w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105 ${grayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: accentColor }}>{item.category}</span>
                <h3 className="text-2xl font-black text-white leading-tight">{item.title}</h3>
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ZoomIn size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
            />
            {(selectedImage.title || selectedImage.category) && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
              >
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{selectedImage.category}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{selectedImage.title}</h3>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
