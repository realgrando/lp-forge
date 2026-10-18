"use client";
// src/components/library/LeadGen/LeadMagnet_V1.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle2, Send } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'leadgen',
  variant: 'v2',
  label: 'Lead Magnet / E-book (v2)',
  defaultData: {
    badge: "Recurso Gratuito",
    headline: "O Guia Definitivo para sua {Reforma} de Luxo",
    subtitle: "Aprenda como planejar e executar sua obra sem dores de cabeça e com economia.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
    benefits: [
      "Checklist de materiais essenciais",
      "Como escolher o mestre de obras",
      "Cronograma de execução sugerido",
      "Evite os 5 erros mais comuns"
    ],
    formPlaceholder: "Seu melhor e-mail",
    buttonLabel: "Baixar Guia Agora",
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] },
      { key: 'layout.reverse', label: 'Inverter Lados', type: 'toggle', default: false }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'badge', label: 'Texto da Badge', type: 'text' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'image', label: 'Imagem do Ímã (Capa)', type: 'image' },
      { key: 'benefits', label: 'O que o usuário leva', type: 'array', itemFields: [{ key: 'text', label: 'Texto do Benefício', type: 'text' }] },
      { key: 'formPlaceholder', label: 'Placeholder do E-mail', type: 'text' },
      { key: 'buttonLabel', label: 'Texto do Botão', type: 'text' }
    ]
  },
  ...commonFineTuning
];

export default function LeadMagnet_V1({ data }) {
  const [formState, setFormState] = useState('idle');

  if (!data) return null;

  const { badge, headline, subtitle, image, benefits = [], formPlaceholder, buttonLabel, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  const reverse = layout.reverse || false;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section 
      className={`${layout.paddingY || 'py-24'} relative overflow-hidden bg-zinc-950 text-white`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Lado da Imagem */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 relative group"
          >
            <div className="absolute inset-0 bg-[#EAB308]/20 blur-[120px] rounded-full pointer-events-none transition-all group-hover:bg-[#EAB308]/30" style={{ backgroundColor: `${accentColor}33` }} />
            <div className="relative">
               <img 
                 src={image} 
                 alt="Lead Magnet" 
                 className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl border border-white/10 transform rotate-2 group-hover:rotate-0 transition-transform duration-700"
               />
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Download size={32} style={{ color: accentColor }} />
               </div>
            </div>
          </motion.div>

          {/* Lado do Conteúdo */}
          <div className="flex-1 max-w-2xl">
            {badge && (
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10 bg-white/5"
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
              className="text-zinc-400 text-lg font-medium mb-10"
            >
              {subtitle}
            </motion.p>

            <ul className="space-y-4 mb-12">
               {benefits.map((benefit, idx) => (
                 <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-center gap-4 group"
                 >
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all group-hover:scale-110" style={{ borderColor: `${accentColor}44` }}>
                       <CheckCircle2 size={12} style={{ color: accentColor }} />
                    </div>
                    <span className="text-zinc-300 font-bold group-hover:text-white transition-colors">{typeof benefit === 'string' ? benefit : benefit.text}</span>
                 </motion.li>
               ))}
            </ul>

            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input 
                type="email" 
                placeholder={formPlaceholder} 
                required
                disabled={formState === 'success'}
                className="flex-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-5 text-sm font-medium outline-none focus:border-[#EAB308]/50 transition-colors disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={formState === 'loading' || formState === 'success'}
                className="px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all whitespace-nowrap"
                style={{ backgroundColor: accentColor, color: '#000' }}
              >
                {formState === 'idle' ? (
                  <><Download size={16} /> {buttonLabel}</>
                ) : formState === 'loading' ? (
                  <span className="animate-pulse">Gerando Link...</span>
                ) : (
                  'E-mail Enviado!'
                )}
              </button>
            </motion.form>
          </div>

        </div>
      </div>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-[0.02] blur-[200px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
