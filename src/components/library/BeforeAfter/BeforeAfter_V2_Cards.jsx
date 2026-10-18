"use client";
// src/components/library/BeforeAfter/BeforeAfter_V2_Cards.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'beforeafter',
  variant: 'v2',
  label: 'Grid de Obras / Pratos (v2)',
  defaultData: {
    badge: 'Resultados',
    headline: 'O poder da {transformação}',
    subtitle: 'Navegue pelos nossos cases de sucesso e comprove a qualidade.',
    items: [
      {
        title: "Reforma Gourmet",
        description: "Modernização completa com foco na experiência e no fluxo de trabalho.",
        beforeImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "Fachada Comercial",
        description: "Design atrativo para aumentar o fluxo de clientes.",
        beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      }
    ],
    layout: { columns: 'grid-cols-1 md:grid-cols-2', paddingY: 'py-24' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] },
      { key: 'layout.columns', label: 'Colunas', type: 'select', options: [{value: 'grid-cols-1 md:grid-cols-2', label: '2 Colunas'}, {value: 'grid-cols-1 lg:grid-cols-3', label: '3 Colunas'}] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'items', label: 'Casos (Antes/Depois)', type: 'array', itemFields: [
        { key: 'title', label: 'Título do Caso', type: 'text' },
        { key: 'description', label: 'Breve Descrição', type: 'textarea' },
        { key: 'beforeImage', label: 'Imagem ANTES', type: 'image' },
        { key: 'afterImage', label: 'Imagem DEPOIS', type: 'image' }
      ]}
    ]
  },
  ...commonFineTuning
];

// Subcomponente de Slider Simples para o Card
const CardSlider = ({ item, accentColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 cursor-ew-resize group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={item.afterImage} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
      
      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-700 ease-in-out"
        style={{ width: isHovered ? '0%' : '100%' }}
      >
        <img src={item.beforeImage} alt="Antes" className="absolute inset-0 w-full h-full object-cover max-w-none" style={{ width: '200%' }} />
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-2' : 'bg-black/50 text-white opacity-100'}`}>Antes</span>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 transition-all duration-500 ${!isHovered ? 'opacity-0 -translate-y-2' : 'opacity-100'}`} style={{ backgroundColor: accentColor, color: '#000' }}>Depois</span>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-100 group-hover/slider:opacity-0 transition-opacity">
        <ArrowRightLeft size={12} /> Passe o mouse
      </div>
    </div>
  );
};

export default function BeforeAfter_V2_Cards({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, items = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';

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
      className={`${layout.paddingY || 'py-24'} relative bg-zinc-950 text-white overflow-hidden`}
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

        <div className={`grid gap-12 ${layout.columns || 'grid-cols-1 md:grid-cols-2'}`}>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-6"
            >
              <CardSlider item={item} accentColor={accentColor} />
              
              <div className="px-2">
                <h3 className="text-2xl font-black tracking-tight mb-2">{item.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
