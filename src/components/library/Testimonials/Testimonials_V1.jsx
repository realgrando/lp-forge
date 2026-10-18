"use client";
// src/components/library/Testimonials/Testimonials_V1.jsx
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'testimonials',
  variant: 'v1',
  label: 'Testimonials Elite (v1)',
  defaultData: {
    badge: 'Social Proof',
    headline: 'O que nossos {clientes} dizem',
    items: [
      { name: 'John Doe', role: 'CEO', text: 'Incrível trabalho!', rating: '5' }
    ],
    layout: { align: 'center', columns: '3' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.align', label: 'Alinhamento Global', type: 'align' },
      { key: 'layout.columns', label: 'Colunas', type: 'select', options: [
        { value: '2', label: '2 Colunas' },
        { value: '3', label: '3 Colunas' },
        { value: '4', label: '4 Colunas' }
      ]}
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'visibility.showHeadline', label: 'Mostrar Título', type: 'toggle', default: true },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea', condition: 'visibility.showHeadline' },
      { key: 'visibility.showSubtitle', label: 'Mostrar Subtítulo', type: 'toggle', default: true },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', condition: 'visibility.showSubtitle' },
      { key: 'items', label: 'Depoimentos', type: 'array', itemFields: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'role', label: 'Cargo', type: 'text' },
        { key: 'text', label: 'Depoimento', type: 'textarea' },
        { key: 'image', label: 'Foto/Avatar', type: 'image' },
        { key: 'rating', label: 'Estrelas (1-5)', type: 'select', options: [
          { value: '5', label: '5 Estrelas' },
          { value: '4', label: '4 Estrelas' },
          { value: '3', label: '3 Estrelas' },
          { value: 'none', label: 'Sem Estrelas' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Testimonials_V1({ data }) {
  if (!data) return null;

  const { 
    badge, 
    headline, 
    subtitle, 
    items = [], 
    layout = {}, 
    visibility = {}, 
    style = {} 
  } = data;

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

  const textAlign = layout.align === 'center' ? 'text-center' : layout.align === 'right' ? 'text-right' : 'text-left';

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: style.customBg || 'transparent' }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className={`mb-16 ${textAlign}`}>
          {visibility.showBadge !== false && badge && (
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: accentColor }}>
              {badge}
            </span>
          )}
          {visibility.showHeadline !== false && (
            <h2 className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter leading-none mb-6`} style={{ color: style.customText || '#fff' }}>
              {renderHighlightedText(headline)}
            </h2>
          )}
        </div>

        <div className={`grid gap-8 ${layout.columns === '2' ? 'md:grid-cols-2' : layout.columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 relative"
            >
              <Quote className="absolute top-8 right-8 text-white/5" size={40} />
              <div className="flex gap-1 mb-6">
                {[...Array(parseInt(item.rating) || 5)].map((_, i) => (
                  <Star key={i} size={14} fill={accentColor} color={accentColor} />
                ))}
              </div>
              <p className="text-zinc-300 font-medium mb-8 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                {item.image && <img src={item.image} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" alt={item.name} />}
                <div>
                  <h4 className="font-black text-white uppercase text-sm tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
