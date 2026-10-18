"use client";
// src/components/library/Pricing/Pricing_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'pricing',
  variant: 'v1',
  label: 'Tabela de Preços (v1)',
  defaultData: {
    badge: "Planos & Preços",
    headline: "O plano ideal para o seu {sucesso}",
    subtitle: "Escolha a opção que melhor se adapta ao momento da sua empresa.",
    plans: [
      { 
        name: "Starter", 
        price: "0", 
        currency: "R$", 
        period: "/mês", 
        description: "Ideal para quem está começando agora.",
        buttonLabel: "Começar Grátis",
        isPopular: false,
        features: [
          { text: "Até 3 projetos", included: true },
          { text: "Suporte básico", included: true },
          { text: "Componentes básicos", included: true },
          { text: "Domínio personalizado", included: false }
        ]
      },
      { 
        name: "Pro", 
        price: "97", 
        currency: "R$", 
        period: "/mês", 
        description: "Para empresas que precisam de escala.",
        buttonLabel: "Assinar Agora",
        isPopular: true,
        features: [
          { text: "Projetos ilimitados", included: true },
          { text: "Suporte prioritário", included: true },
          { text: "Todos os componentes", included: true },
          { text: "Domínio personalizado", included: true }
        ]
      }
    ],
    layout: { width: 'container', paddingY: 'py-20', columns: 'grid-cols-1 md:grid-cols-2' },
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.width', label: 'Largura da Área', type: 'select', options: [
        { value: 'container', label: 'Limitada (Container)' },
        { value: 'full', label: 'Total (Full Width)' }
      ]},
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [
        { value: 'py-12', label: 'Pequeno' },
        { value: 'py-20', label: 'Normal' },
        { value: 'py-32', label: 'Grande' }
      ]},
      { key: 'layout.columns', label: 'Colunas (Desktop)', type: 'select', options: [
        { value: 'grid-cols-1 md:grid-cols-2', label: '2 Colunas' },
        { value: 'grid-cols-1 md:grid-cols-3', label: '3 Colunas' },
        { value: 'grid-cols-1 md:grid-cols-4', label: '4 Colunas' }
      ]}
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'plans', label: 'Planos de Preço', type: 'array', itemFields: [
        { key: 'name', label: 'Nome do Plano', type: 'text' },
        { key: 'price', label: 'Preço (Ex: 99)', type: 'text' },
        { key: 'currency', label: 'Moeda (Ex: R$)', type: 'text' },
        { key: 'period', label: 'Período (Ex: /mês)', type: 'text' },
        { key: 'description', label: 'Descrição Curta', type: 'text' },
        { key: 'isPopular', label: 'Destaque (Popular)', type: 'toggle' },
        { key: 'buttonLabel', label: 'Texto do Botão', type: 'text' },
        { key: 'buttonUrl', label: 'Link do Botão', type: 'text' },
        { key: 'features', label: 'Vantagens', type: 'array', itemFields: [
          { key: 'text', label: 'Texto da Vantagem', type: 'text' },
          { key: 'included', label: 'Incluído?', type: 'toggle' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Pricing_V1({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, plans = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-20';
  const columns = layout.columns || 'grid-cols-1 md:grid-cols-3';

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
      className={`${paddingY} relative overflow-hidden`}
      style={{ backgroundColor: style.customBg || 'transparent' }}
    >
      <div className={`${width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'} relative z-10`}>
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {visibility.showBadge !== false && badge && (
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10 bg-white/5"
              style={{ color: accentColor, borderColor: `${accentColor}33` }}
            >
              {badge}
            </motion.span>
          )}
          
          {headline && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter mb-6 leading-[0.9]`}
              style={{ color: style.customText || '#fff' }}
            >
              {renderHighlightedText(headline)}
            </motion.h2>
          )}

          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* PRICING GRID */}
        <div className={`grid ${columns} gap-8 items-stretch`}>
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className={`relative p-8 md:p-10 rounded-[3rem] border transition-all duration-500 flex flex-col h-full ${
                plan.isPopular 
                  ? 'bg-zinc-900/50 border-white/10 shadow-2xl scale-105 z-20' 
                  : 'bg-zinc-950/50 border-white/5 hover:border-white/10'
              }`}
              style={{ 
                borderColor: plan.isPopular ? `${accentColor}44` : undefined,
                boxShadow: plan.isPopular ? `0 25px 50px -12px ${accentColor}11` : undefined
              }}
            >
              {plan.isPopular && (
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-black"
                  style={{ backgroundColor: accentColor }}
                >
                  Mais Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-zinc-500">{plan.currency}</span>
                  <span className="text-6xl font-black tracking-tighter text-white leading-none">{plan.price}</span>
                  <span className="text-zinc-500 font-bold">{plan.period}</span>
                </div>
                <p className="text-zinc-500 text-sm font-medium">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features?.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${feat.included ? '' : 'opacity-20 grayscale'}`} 
                      style={{ backgroundColor: feat.included ? `${accentColor}22` : '#333', color: feat.included ? accentColor : '#666' }}>
                      {feat.included ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-medium ${feat.included ? 'text-zinc-300' : 'text-zinc-600 line-through'}`}>
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href={plan.buttonUrl || '#'}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-300 ${
                  plan.isPopular 
                    ? 'text-black shadow-lg shadow-accent/20 hover:scale-[1.02]' 
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
                }`}
                style={{ 
                  backgroundColor: plan.isPopular ? accentColor : undefined,
                  boxShadow: plan.isPopular ? `0 10px 20px -5px ${accentColor}44` : undefined
                }}
              >
                {plan.buttonLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
