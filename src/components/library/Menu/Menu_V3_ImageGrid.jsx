"use client";
// src/components/library/Menu/Menu_V3_ImageGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Star } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'menu',
  variant: 'v3',
  label: 'Menu com Imagens (v3)',
  defaultData: {
    headline: 'Nosso Menu {Visual}',
    subtitle: 'Explore nossas criações através dos olhos antes de provar com o paladar.',
    categories: [
      {
        name: 'Pizzas Especiais',
        items: [
          { 
            name: 'Margherita Elite', 
            price: 'R$ 75', 
            description: 'Massa de fermentação lenta, tomates San Marzano e manjericão fresco.', 
            featured: true,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400'
          },
          { 
            name: 'Truffle Mushroom', 
            price: 'R$ 95', 
            description: 'Mix de cogumelos, azeite trufado e queijo fontina.', 
            featured: false,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400'
          }
        ]
      }
    ],
    layout: { columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', paddingY: 'py-24' },
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] },
      { key: 'layout.columns', label: 'Colunas de Itens', type: 'select', options: [{value: 'grid-cols-1 md:grid-cols-2', label: '2 Colunas'}, {value: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', label: '3 Colunas'}, {value: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4', label: '4 Colunas'}] },
      { key: 'layout.grayscale', label: 'Imagens em Preto e Branco', type: 'toggle', default: false }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'categories', label: 'Categorias do Menu', type: 'array', itemFields: [
        { key: 'name', label: 'Nome da Categoria', type: 'text' },
        { key: 'items', label: 'Itens', type: 'array', itemFields: [
          { key: 'name', label: 'Nome do Prato/Serviço', type: 'text' },
          { key: 'price', label: 'Preço', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'image', label: 'Foto do Item', type: 'image' },
          { key: 'featured', label: 'Destaque (Favorito)', type: 'toggle' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Menu_V3_ImageGrid({ data }) {
  if (!data) return null;

  const { badge = "Menu", headline, subtitle, categories = [], visibility = {}, layout = {}, style = {} } = data;
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
      className={`${layout.paddingY || 'py-24'} relative overflow-hidden bg-zinc-950 text-white`}
      style={{ backgroundColor: style.customBg || undefined, color: style.customText || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {visibility.showBadge !== false && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 bg-white/5 border border-white/10"
              style={{ color: accentColor }}
            >
              <Utensils size={14} /> {badge}
            </motion.span>
          )}
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${style.titleSize || 'text-5xl md:text-7xl'} font-black tracking-tighter mb-6 leading-[0.9]`}
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

        <div className="space-y-32">
          {categories.map((category, cIdx) => (
            <div key={cIdx}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-12"
              >
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{category.name}</h3>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </motion.div>

              <div className={`grid gap-8 ${layout.columns || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {category.items?.map((item, iIdx) => (
                  <motion.div 
                    key={iIdx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: iIdx * 0.1 }}
                    className="group relative rounded-[2.5rem] bg-zinc-900/30 border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
                  >
                    {item.image && (
                      <div className="relative h-64 overflow-hidden bg-zinc-800">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${grayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        
                        {item.featured && (
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg" style={{ color: accentColor }}>
                            <Star size={18} fill="currentColor" />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <h4 className="text-xl font-black leading-tight text-white group-hover:text-[#EAB308] transition-colors" style={{ color: undefined }}>{item.name}</h4>
                        <span className="text-xl font-black whitespace-nowrap" style={{ color: accentColor }}>{item.price}</span>
                      </div>
                      <p className="text-zinc-500 font-medium text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
