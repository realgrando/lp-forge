"use client";
// src/components/library/Narrative/Comparison_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, AlertCircle } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'narrative',
  variant: 'v2',
  label: 'Tabela de Superioridade (v2)',
  defaultData: {
    badge: "Por que nós?",
    headline: "O padrão {Nivix} vs. O Mercado",
    subtitle: "Não comparamos apenas preços, comparamos qualidade, segurança e entrega.",
    ourName: "Nivix Elite",
    otherName: "Concorrência Comum",
    points: [
      { feature: "Mão de Obra Especializada", ours: true, others: false, desc: "Profissionais certificados e treinados mensalmente." },
      { feature: "Materiais Premium", ours: true, others: true, desc: "Usamos apenas as marcas líderes mundiais." },
      { feature: "Garantia Estendida", ours: true, others: false, desc: "5 anos de cobertura total sem letras miúdas." },
      { feature: "Suporte 24/7", ours: true, others: false, desc: "Atendimento imediato via canal exclusivo." }
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
      { key: 'ourName', label: 'Nome da Sua Empresa', type: 'text' },
      { key: 'otherName', label: 'Nome do Comparativo', type: 'text' },
      { key: 'points', label: 'Pontos de Comparação', type: 'array', itemFields: [
        { key: 'feature', label: 'Característica', type: 'text' },
        { key: 'ours', label: 'Nós temos?', type: 'toggle' },
        { key: 'others', label: 'Eles têm?', type: 'toggle' },
        { key: 'desc', label: 'Pequeno Detalhe', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Comparison_V1({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, ourName, otherName, points = [], layout = {}, style = {} } = data;
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
          <h2 className={`${style.titleSize || 'text-4xl md:text-5xl'} font-black tracking-tighter mb-4`}>{renderHighlightedText(headline)}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto lg:overflow-visible pb-10">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-white/5">
                    <th className="py-8 px-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">Diferenciais Técnicos</th>
                    <th className="py-8 px-6 text-center">
                       <div className="inline-flex flex-col items-center">
                          <ShieldCheck size={24} style={{ color: accentColor }} className="mb-2" />
                          <span className="text-sm font-black uppercase tracking-tighter text-white">{ourName}</span>
                       </div>
                    </th>
                    <th className="py-8 px-6 text-center">
                       <div className="inline-flex flex-col items-center">
                          <AlertCircle size={24} className="text-zinc-700 mb-2" />
                          <span className="text-sm font-black uppercase tracking-tighter text-zinc-700">{otherName}</span>
                       </div>
                    </th>
                 </tr>
              </thead>
              <tbody>
                 {points.map((p, idx) => (
                   <motion.tr 
                     key={idx}
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors"
                   >
                     <td className="py-8 px-6">
                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#EAB308] transition-colors">{p.feature}</h4>
                        <p className="text-xs text-zinc-500 font-medium">{p.desc}</p>
                     </td>
                     <td className="py-8 px-6 text-center">
                        <div className="flex justify-center">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.ours ? 'bg-zinc-900 border border-white/10 shadow-lg' : 'opacity-20'}`}>
                              {p.ours ? <Check size={20} style={{ color: accentColor }} strokeWidth={3} /> : <X size={20} className="text-zinc-600" />}
                           </div>
                        </div>
                     </td>
                     <td className="py-8 px-6 text-center">
                        <div className="flex justify-center">
                           <div className="w-10 h-10 rounded-xl flex items-center justify-center opacity-20">
                              {p.others ? <Check size={20} className="text-zinc-600" /> : <X size={20} className="text-zinc-600" />}
                           </div>
                        </div>
                     </td>
                   </motion.tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
