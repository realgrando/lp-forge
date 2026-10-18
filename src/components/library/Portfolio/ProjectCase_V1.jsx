"use client";
// src/components/library/Portfolio/ProjectCase_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, CheckCircle2, TrendingUp } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'portfolio',
  variant: 'v1',
  label: 'Estudo de Caso Elite (v1)',
  defaultData: {
    badge: "Case de Sucesso",
    headline: "Reforma Estrutural na {Mansão} Alpha",
    subtitle: "Como transformamos um imóvel antigo em uma referência de modernidade em 90 dias.",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    challenge: "O cliente buscava modernização total sem comprometer a estrutura original datada de 1980.",
    solution: "Implementamos reforço em fibra de carbono e sistemas inteligentes de automação integrada.",
    result: "Entrega 15 dias antes do prazo com valorização de 40% no valor venal do imóvel.",
    stats: [
      { label: "Área Total", value: "450m²" },
      { label: "Investimento", value: "R$ 1.2M" },
      { label: "Equipe", value: "24 pessoas" }
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
      { key: 'headline', label: 'Título do Case {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'mainImage', label: 'Imagem Principal do Projeto', type: 'image' }
    ]
  },
  {
    group: '3. Narrativa do Projeto',
    fields: [
      { key: 'challenge', label: 'O Desafio', type: 'textarea' },
      { key: 'solution', label: 'A Solução', type: 'textarea' },
      { key: 'result', label: 'O Resultado', type: 'textarea' },
      { key: 'stats', label: 'Métricas do Projeto', type: 'array', itemFields: [
        { key: 'label', label: 'Rótulo', type: 'text' },
        { key: 'value', label: 'Valor', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function ProjectCase_V1({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, mainImage, challenge, solution, result, stats = [], layout = {}, style = {} } = data;
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
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
           <div className="max-w-2xl">
              {badge && <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
              <h2 className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter leading-tight`}>{renderHighlightedText(headline)}</h2>
           </div>
           <p className="text-zinc-500 font-medium text-lg max-w-sm ml-auto lg:text-right">{subtitle}</p>
        </div>

        {/* IMAGE HERO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/5 mb-16 shadow-2xl"
        >
          <img src={mainImage} alt="Project" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
          
          <div className="absolute bottom-10 left-10 right-10 grid grid-cols-1 md:grid-cols-3 gap-8">
             {stats.map((s, idx) => (
               <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">{s.label}</span>
                  <span className="text-2xl font-black" style={{ color: accentColor }}>{s.value}</span>
               </div>
             ))}
          </div>
        </motion.div>

        {/* NARRATIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-white/5">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                 <Target size={20} style={{ color: accentColor }} />
                 <h4 className="text-sm font-black uppercase tracking-widest text-white">Desafio</h4>
              </div>
              <p className="text-zinc-400 font-medium leading-relaxed">{challenge}</p>
           </motion.div>
           
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-6">
                 <Lightbulb size={20} style={{ color: accentColor }} />
                 <h4 className="text-sm font-black uppercase tracking-widest text-white">Solução</h4>
              </div>
              <p className="text-zinc-400 font-medium leading-relaxed">{solution}</p>
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 mb-6">
                 <TrendingUp size={20} style={{ color: accentColor }} />
                 <h4 className="text-sm font-black uppercase tracking-widest text-white">Resultado</h4>
              </div>
              <p className="text-zinc-400 font-medium leading-relaxed">{result}</p>
           </motion.div>
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
