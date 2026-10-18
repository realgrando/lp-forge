"use client";
// src/components/library/Pricing/Pricing_V2_Bento.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'pricing',
  variant: 'v2',
  label: 'Bento Pricing (v2)',
  defaultData: {
    badge: "Oportunidade",
    headline: "Invista no seu {crescimento}",
    subtitle: "Estrutura moderna em grade para destacar seus diferenciais.",
    plans: [
      { 
        name: "Essencial", 
        price: "197", 
        currency: "R$", 
        period: "/mês", 
        description: "Tudo o que você precisa para começar com o pé direito.",
        buttonLabel: "Começar Agora",
        isPopular: false,
        features: [
          { text: "Suporte via WhatsApp", included: true },
          { text: "Dashboard de métricas", included: true },
          { text: "Acesso à comunidade", included: true }
        ]
      },
      { 
        name: "Diamond Elite", 
        price: "497", 
        currency: "R$", 
        period: "/mês", 
        description: "A solução completa para quem não aceita menos que o topo.",
        buttonLabel: "Seja Diamond",
        isPopular: true,
        features: [
          { text: "Consultoria mensal", included: true },
          { text: "Recursos exclusivos", included: true },
          { text: "Suporte 24/7 VIP", included: true },
          { text: "Customização total", included: true }
        ]
      }
    ],
    layout: { width: 'container', paddingY: 'py-20', columns: 'grid-cols-1 md:grid-cols-3' },
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

export default function Pricing_V2_Bento({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, plans = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-20';

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
        <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-20">
          <div className="max-w-2xl">
            {visibility.showBadge !== false && badge && (
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 bg-zinc-900 border border-white/5"
                style={{ color: accentColor }}
              >
                <Sparkles size={12} /> {badge}
              </motion.span>
            )}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter leading-none`}
              style={{ color: style.customText || '#fff' }}
            >
              {renderHighlightedText(headline)}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 font-medium text-lg max-w-sm ml-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {plans.map((plan, idx) => {
            const isMain = plan.isPopular;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-[2.5rem] border border-white/5 p-8 md:p-12 flex flex-col transition-all duration-500 group ${
                  isMain ? 'md:col-span-7 bg-zinc-900/40' : 'md:col-span-5 bg-zinc-950/40'
                }`}
                style={{ borderColor: isMain ? `${accentColor}33` : undefined }}
              >
                {isMain && (
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full" style={{ backgroundColor: accentColor }} />
                )}

                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black tracking-tighter text-white">{plan.currency}{plan.price}</span>
                      <span className="text-zinc-600 font-bold">{plan.period}</span>
                    </div>
                  </div>
                  {isMain && (
                    <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10 text-white" style={{ color: accentColor }}>
                      <Sparkles size={24} />
                    </div>
                  )}
                </div>

                <p className="text-zinc-400 font-medium mb-10 max-w-xs">{plan.description}</p>

                <div className={`grid gap-4 mb-12 ${isMain ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                  {plan.features?.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-lg flex items-center justify-center bg-white/5 text-white group-hover:bg-[#EAB308] group-hover:text-black transition-colors" style={{ backgroundColor: isMain ? `${accentColor}22` : undefined }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">{f.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <a 
                    href={plan.buttonUrl || '#'}
                    className="inline-block px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all relative overflow-hidden group/btn"
                    style={{ backgroundColor: isMain ? accentColor : 'transparent', color: isMain ? '#000' : '#fff', border: isMain ? 'none' : '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <span className="relative z-10">{plan.buttonLabel}</span>
                    {!isMain && <div className="absolute inset-0 bg-white/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
