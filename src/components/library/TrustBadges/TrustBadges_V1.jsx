"use client";
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Award, CheckCircle } from '@/lib/lucide-shim';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'trustbadges',
  variant: 'v1',
  label: 'Selos de Confiança (v1)',
  defaultData: {
    title: 'Nossa {Garantia}',
    items: [{ text: 'Garantia de 1 Ano', icon: 'shield' }],
    layout: { align: 'center' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura',
    fields: [
      { key: 'layout.align', label: 'Alinhamento', type: 'select', options: [{value:'left', label:'Esquerda'}, {value:'center', label:'Centro'}, {value:'right', label:'Direita'}] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'title', label: 'Título {Destaque}', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'items', label: 'Selos', type: 'array', itemFields: [
        { key: 'text', label: 'Texto do Selo', type: 'text' },
        { key: 'icon', label: 'Ícone', type: 'select', options: [
          { value: 'shield', label: 'Escudo' },
          { value: 'lock', label: 'Cadeado' },
          { value: 'award', label: 'Troféu' },
          { value: 'check', label: 'Check' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function TrustBadges_V1({ data }) {
  if (!data) return null;

  const { 
    title = "Sua Segurança é nossa {Prioridade}", 
    subtitle = "Trabalhamos com os mais altos padrões de qualidade e segurança do mercado.", 
    items = [
      { icon: 'shield', text: 'Garantia de 1 Ano' },
      { icon: 'lock', text: 'Pagamento Seguro' },
      { icon: 'award', text: 'Material Premium' },
      { icon: 'check', text: 'Profissionais Certificados' }
    ], 
    style = {},
    layout = {}
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const iconMap = {
    shield: ShieldCheck,
    lock: Lock,
    award: Award,
    check: CheckCircle
  };

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} style={{ color: accentColor }}>
          {part}
        </span>
      ) : part
    );
  };

  return (
    <section className="py-16 md:py-24 px-8 md:px-16 relative overflow-hidden" style={{ backgroundColor: style.customBg || 'transparent' }}>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`flex flex-col gap-12 ${layout.align === 'center' ? 'items-center text-center' : layout.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
          
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${style.headlineSize || 'text-3xl md:text-5xl'} ${style.headlineWeight || 'font-black'} uppercase tracking-tighter mb-4 leading-tight`}
              style={{ color: style.customText || '#fff' }}
            >
              {renderTitle(title)}
            </motion.h2>
            <p className="text-zinc-500 text-base md:text-lg font-medium opacity-80" style={{ color: style.customText || '#fff', opacity: 0.6 }}>
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full">
            {items.map((item, idx) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-white/10 transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs md:text-sm font-black uppercase tracking-widest text-center" style={{ color: style.customText || '#fff' }}>
                    {item.text}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
