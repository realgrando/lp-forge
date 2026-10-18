"use client";
// src/components/library/Narrative/Awards_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, ShieldCheck, CheckCircle } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

const ICON_MAP = {
  award: Award,
  trophy: Trophy,
  shield: ShieldCheck,
  check: CheckCircle
};

export const metadata = {
  type: 'narrative',
  variant: 'v3',
  label: 'Certificações & Prêmios (v3)',
  defaultData: {
    badge: "Qualidade Comprovada",
    headline: "Nossa excelência é {reconhecida} no mercado",
    subtitle: "Certificações rigorosas e prêmios que atestam nosso compromisso com o melhor resultado.",
    awards: [
      { title: "ISO 9001", year: "2024", issuer: "Gestão de Qualidade", icon: "shield" },
      { title: "Melhor Pizzaria", year: "2023", issuer: "Guia Gastronômico", icon: "trophy" },
      { title: "Selo Obra Segura", year: "2024", issuer: "Segurança do Trabalho", icon: "award" },
      { title: "Top of Mind", year: "2022", issuer: "Pesquisa de Mercado", icon: "check" }
    ],
    layout: { columns: 'grid-cols-2 lg:grid-cols-4', paddingY: 'py-24' },
    style: { showAmbientLight: false }
  }
};

export const schema = [
  {
    group: '1. Estrutura',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] },
      { key: 'layout.columns', label: 'Colunas', type: 'select', options: [{value: 'grid-cols-2 md:grid-cols-3', label: '3 Colunas'}, {value: 'grid-cols-2 lg:grid-cols-4', label: '4 Colunas'}] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'badge', label: 'Texto da Badge', type: 'text' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'awards', label: 'Prêmios / Selos', type: 'array', itemFields: [
        { key: 'title', label: 'Nome do Selo', type: 'text' },
        { key: 'year', label: 'Ano', type: 'text' },
        { key: 'issuer', label: 'Órgão Emissor', type: 'text' },
        { key: 'icon', label: 'Ícone', type: 'select', options: [{value: 'award', label: 'Medalha'}, {value: 'trophy', label: 'Troféu'}, {value: 'shield', label: 'Escudo'}, {value: 'check', label: 'Check'}] }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Awards_V1({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, awards = [], layout = {}, style = {} } = data;
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
          {badge && <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
          <h2 className={`${style.titleSize || 'text-4xl md:text-5xl'} font-black tracking-tighter mb-6`}>{renderHighlightedText(headline)}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>

        <div className={`grid gap-6 ${layout.columns || 'grid-cols-2 lg:grid-cols-4'}`}>
           {awards.map((aw, idx) => {
             const Icon = ICON_MAP[aw.icon] || Award;
             return (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 flex flex-col items-center text-center group hover:bg-zinc-900/60 transition-colors"
               >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 flex items-center justify-center mb-8 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                     <Icon size={32} style={{ color: accentColor }} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">{aw.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">{aw.issuer}</p>
                  <div className="mt-auto px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors">
                     {aw.year}
                  </div>
               </motion.div>
             );
           })}
        </div>
      </div>
    </section>
  );
}
