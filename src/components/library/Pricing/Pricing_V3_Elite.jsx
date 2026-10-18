"use client";
// src/components/library/Pricing/Pricing_V3_Elite.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Star } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'pricing',
  variant: 'v3',
  label: 'Elite Enterprise (v3)',
  defaultData: {
    badge: "Enterprise Solutions",
    headline: "Potencialize sua operação com {autoridade}",
    subtitle: "Planos robustos desenhados para grandes volumes e alta performance.",
    plans: [
      { 
        name: "Corporativo", 
        price: "1.490", 
        currency: "R$", 
        period: "/mês", 
        description: "A base sólida para sua expansão digital.",
        buttonLabel: "Falar com Consultor",
        isPopular: false,
        features: [
          { text: "Infraestrutura Dedicada", included: true },
          { text: "API de Integração", included: true },
          { text: "SLA de 99.9%", included: true }
        ]
      },
      { 
        name: "Enterprise Pro", 
        price: "3.200", 
        currency: "R$", 
        period: "/mês", 
        description: "O auge da tecnologia e suporte personalizado.",
        buttonLabel: "Upgrade Elite",
        isPopular: true,
        features: [
          { text: "Gerente de Conta Dedicado", included: true },
          { text: "Segurança Nível Bancário", included: true },
          { text: "Customização de Código", included: true },
          { text: "Treinamento In-company", included: true }
        ]
      }
    ],
    layout: { width: 'container', paddingY: 'py-32', columns: 'grid-cols-1 md:grid-cols-2' },
    style: { showAmbientLight: true, titleSize: 'text-6xl' }
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

export default function Pricing_V3_Elite({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, plans = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-32';

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
      className={`${paddingY} relative overflow-hidden bg-zinc-950`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className={`${width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'} relative z-10`}>
        <div className="text-center mb-24">
          {visibility.showBadge !== false && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-zinc-500 mb-6"
            >
              <div className="h-px w-8 bg-zinc-800" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{badge}</span>
              <div className="h-px w-8 bg-zinc-800" />
            </motion.div>
          )}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`${style.titleSize || 'text-5xl md:text-7xl'} font-black tracking-tighter text-white mb-8`}
          >
            {renderHighlightedText(headline)}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-400 text-xl font-medium max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`p-10 md:p-14 rounded-[3.5rem] border border-white/5 flex flex-col relative transition-all duration-700 ${
                plan.isPopular ? 'bg-zinc-900/40 shadow-3xl' : 'bg-zinc-950/80 backdrop-blur-xl'
              }`}
              style={{ borderColor: plan.isPopular ? `${accentColor}33` : undefined }}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 right-10 px-6 py-2 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl" style={{ backgroundColor: accentColor }}>
                  <Star size={12} fill="currentColor" /> Recomendado
                </div>
              )}

              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck size={20} style={{ color: accentColor }} />
                  <h3 className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-zinc-600 text-2xl font-bold">{plan.currency}</span>
                  <span className="text-7xl font-black tracking-tighter text-white leading-none">{plan.price}</span>
                  <span className="text-zinc-600 font-bold ml-2">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-6 mb-16 flex-1">
                {plan.features?.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-4 group/item">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/item:scale-150 transition-transform" style={{ backgroundColor: accentColor }} />
                    <span className="text-zinc-400 text-sm font-bold group-hover/item:text-zinc-200 transition-colors">{f.text}</span>
                  </div>
                ))}
              </div>

              <a 
                href={plan.buttonUrl || '#'}
                className="group/btn relative flex items-center justify-between p-6 rounded-[2rem] border border-white/10 transition-all duration-500 overflow-hidden"
                style={{ backgroundColor: plan.isPopular ? `${accentColor}11` : undefined }}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest text-white relative z-10">{plan.buttonLabel}</span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform relative z-10" style={{ backgroundColor: plan.isPopular ? accentColor : undefined, color: plan.isPopular ? '#000' : undefined }}>
                  <ArrowRight size={18} />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
