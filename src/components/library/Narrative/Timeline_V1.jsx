"use client";
// src/components/library/Narrative/Timeline_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, Star } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'narrative',
  variant: 'v1',
  label: 'Linha do Tempo (v1)',
  defaultData: {
    badge: "Trajetória",
    headline: "Uma história de {sucesso} e tradição",
    subtitle: "Desde o primeiro tijolo até a excelência reconhecida em todo o mercado.",
    milestones: [
      { year: "2010", title: "A Fundação", description: "O sonho começa com uma pequena equipe focada em acabamentos de alto padrão.", icon: "history" },
      { year: "2015", title: "Expansão Nacional", description: "Conquistamos nossos primeiros projetos corporativos de grande escala.", icon: "calendar" },
      { year: "2023", title: "Referência Elite", description: "Hoje somos a principal escolha para construções que exigem perfeição técnica.", icon: "star" }
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
    group: '2. Conteúdo',
    fields: [
      { key: 'badge', label: 'Texto da Badge', type: 'text' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'milestones', label: 'Marcos Históricos', type: 'array', itemFields: [
        { key: 'year', label: 'Ano / Data', type: 'text' },
        { key: 'title', label: 'Título do Marco', type: 'text' },
        { key: 'description', label: 'Descrição Detalhada', type: 'textarea' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Timeline_V1({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, milestones = [], layout = {}, style = {} } = data;
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
        <div className="text-center mb-24 max-w-3xl mx-auto">
          {badge && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10 bg-white/5"
              style={{ color: accentColor, borderColor: `${accentColor}33` }}
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
            className="text-zinc-500 text-lg font-medium"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
           {/* Vertical Line */}
           <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

           <div className="space-y-20 md:space-y-0">
             {milestones.map((m, idx) => {
               const isEven = idx % 2 === 0;
               return (
                 <div key={idx} className="relative flex flex-col md:flex-row items-center justify-center md:py-20 group">
                    {/* Circle Indicator */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center z-20 shadow-2xl transition-all group-hover:scale-110 hidden md:flex" style={{ borderColor: style.customBg || '#09090b' }}>
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                    </div>

                    <div className={`flex-1 w-full md:w-auto ${isEven ? 'md:pr-24 text-center md:text-right' : 'md:pl-24 text-center md:text-left order-last md:order-none'}`}>
                       <motion.div 
                         initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8, type: "spring" }}
                       >
                         <span className="text-4xl md:text-6xl font-black tracking-tighter mb-4 block" style={{ color: isEven ? '#fff' : accentColor }}>{m.year}</span>
                         <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-[#EAB308] transition-colors">{m.title}</h3>
                         <p className="text-zinc-500 font-medium leading-relaxed max-w-sm mx-auto md:ml-auto md:mr-0">{m.description}</p>
                       </motion.div>
                    </div>

                    <div className="hidden md:block flex-1" />
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
