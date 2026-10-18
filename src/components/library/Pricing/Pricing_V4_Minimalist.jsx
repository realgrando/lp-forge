"use client";
// src/components/library/Pricing/Pricing_V4_Minimalist.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'pricing',
  variant: 'v4',
  label: 'Boutique Minimalist (v4)',
  defaultData: {
    headline: "Simplicidade nos {preços}",
    subtitle: "Design limpo focado na transparência e experiência do usuário.",
    plans: [
      { 
        name: "Essencial", 
        price: "49", 
        currency: "$", 
        period: "/mo", 
        buttonLabel: "Get Started",
        features: [
          { text: "Core features", included: true },
          { text: "Email support", included: true },
          { text: "Analytics", included: true }
        ]
      },
      { 
        name: "Premium", 
        price: "99", 
        currency: "$", 
        period: "/mo", 
        buttonLabel: "Get Started",
        isPopular: true,
        features: [
          { text: "Core features", included: true },
          { text: "Priority support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "Custom domains", included: true }
        ]
      }
    ],
    layout: { width: 'container', paddingY: 'py-20', columns: 'grid-cols-1 md:grid-cols-2' },
    style: { titleSize: 'text-4xl' }
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

export default function Pricing_V4_Minimalist({ data }) {
  if (!data) return null;

  const { headline, subtitle, plans = [], layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-20';
  const columns = layout.columns || 'grid-cols-1 md:grid-cols-2';

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
      className={`${paddingY} relative bg-white text-black`}
      style={{ backgroundColor: style.customBg || '#fff', color: style.customText || '#000' }}
    >
      <div className={`${width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'}`}>
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${style.titleSize || 'text-4xl md:text-5xl'} font-black tracking-tight mb-4`}
          >
            {renderHighlightedText(headline)}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 font-medium max-w-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className={`grid ${columns} border-t border-black/5`}>
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`py-16 md:p-16 flex flex-col border-b border-black/5 ${idx % 2 === 0 ? 'md:border-r' : ''}`}
            >
              <div className="mb-12">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-7xl font-black tracking-tighter leading-none">{plan.currency}{plan.price}</span>
                  <span className="text-zinc-400 font-bold ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-16 flex-1">
                {plan.features?.map((f, fi) => (
                  <div key={fi} className="flex items-center justify-between group">
                    <span className={`text-sm font-bold ${f.included ? 'text-black' : 'text-zinc-300'}`}>{f.text}</span>
                    <div className="h-px flex-1 mx-4 bg-black/5 group-hover:bg-black/20 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: f.included ? accentColor : '#ccc' }}>
                      {f.included ? 'Yes' : 'No'}
                    </span>
                  </div>
                ))}
              </div>

              <a 
                href={plan.buttonUrl || '#'}
                className="group relative inline-flex items-center justify-between text-sm font-black uppercase tracking-widest transition-all"
              >
                <span>{plan.buttonLabel}</span>
                <div className="h-[2px] w-8 bg-black group-hover:w-12 transition-all" style={{ backgroundColor: accentColor }} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
