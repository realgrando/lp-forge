"use client";
// src/components/library/Portfolio/Showcase_Hotspots_V1.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Info, Target, Sparkles } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'portfolio',
  variant: 'v3',
  label: 'Showcase com Hotspots (v3)',
  defaultData: {
    badge: "Anatomia da Qualidade",
    headline: "A perfeição está nos {detalhes}",
    subtitle: "Toque nos pontos destacados para descobrir o que torna nossos projetos únicos.",
    mainImage: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=1200",
    hotspots: [
      { x: 30, y: 40, title: "Massa Artesanal", description: "Fermentação natural de 48h para máxima leveza e sabor.", icon: "sparkles" },
      { x: 65, y: 30, title: "Tomate San Marzano", description: "Importados diretamente da Itália para um molho autêntico.", icon: "target" },
      { x: 50, y: 70, title: "Forno a Lenha", description: "Temperatura constante de 450°C para o selamento perfeito.", icon: "info" }
    ],
    layout: { paddingY: 'py-24' },
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] }
    ]
  },
  {
    group: '2. Conteúdo Principal',
    fields: [
      { key: 'badge', label: 'Texto da Badge', type: 'text' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'mainImage', label: 'Imagem Imersiva', type: 'image' }
    ]
  },
  {
    group: '3. Pontos de Interação (Hotspots)',
    fields: [
      { key: 'hotspots', label: 'Hotspots', type: 'array', itemFields: [
        { key: 'title', label: 'Título do Detalhe', type: 'text' },
        { key: 'description', label: 'Descrição Curta', type: 'textarea' },
        { key: 'x', label: 'Posição Horizontal (0-100%)', type: 'text' },
        { key: 'y', label: 'Posição Vertical (0-100%)', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

const ICON_MAP = {
  plus: Plus,
  info: Info,
  target: Target,
  sparkles: Sparkles
};

export default function Showcase_Hotspots_V1({ data }) {
  const [activeSpot, setActiveSpot] = useState(null);

  if (!data) return null;

  const { badge, headline, subtitle, mainImage, hotspots = [], layout = {}, style = {} } = data;
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
      className={`${layout.paddingY || 'py-24'} relative overflow-hidden bg-zinc-950 text-white`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {badge && <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
          <h2 className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter mb-4`}>{renderHighlightedText(headline)}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl group">
           <img src={mainImage} alt="Showcase" className="w-full h-auto" />
           
           {/* Hotspots Container */}
           <div className="absolute inset-0">
              {hotspots.map((spot, idx) => (
                <div 
                  key={idx} 
                  className="absolute" 
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                   <button 
                     onClick={() => setActiveSpot(activeSpot === idx ? null : idx)}
                     className="relative flex items-center justify-center group/btn"
                   >
                      <span className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full animate-ping opacity-20" style={{ backgroundColor: accentColor }} />
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${activeSpot === idx ? 'bg-white scale-125' : 'bg-black/50 backdrop-blur-xl border-white/50'}`} style={{ backgroundColor: activeSpot === idx ? accentColor : undefined, color: activeSpot === idx ? '#000' : '#fff' }}>
                         {activeSpot === idx ? <X size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                      </div>
                   </button>

                   <AnimatePresence>
                      {activeSpot === idx && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className={`absolute z-30 w-64 p-6 rounded-3xl bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl 
                            ${parseFloat(spot.x) > 50 ? '-left-64 ml-[-20px]' : 'left-full ml-5'}
                            ${parseFloat(spot.y) > 50 ? '-bottom-10' : 'top-[-20px]'}
                          `}
                        >
                           <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tighter" style={{ color: undefined }}>{spot.title}</h4>
                           <p className="text-sm text-zinc-400 font-medium leading-relaxed">{spot.description}</p>
                           <div className="mt-4 h-1 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}
           </div>

           <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
              Showcase Interativo
           </div>
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
