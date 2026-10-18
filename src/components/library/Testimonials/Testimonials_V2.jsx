"use client";
// src/components/library/Testimonials/Testimonials_V2.jsx
import { motion } from 'framer-motion';
import { Star, MessageCircle } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'testimonials',
  variant: 'v2',
  label: 'Testimonials Cards (v2)',
  defaultData: {
    badge: 'Feedback',
    headline: 'Resultados que {falam} por nós',
    items: [
      { name: 'Alice Walker', role: 'Designer', text: 'Design impecável e performance fluida.', rating: '5' }
    ],
    layout: { align: 'start', columns: '2' },
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
      { key: 'items', label: 'Depoimentos', type: 'array', itemFields: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'role', label: 'Cargo', type: 'text' },
        { key: 'text', label: 'Depoimento', type: 'textarea' },
        { key: 'image', label: 'Foto/Avatar', type: 'image' },
        { key: 'rating', label: 'Estrelas (1-5)', type: 'select', options: [
          { value: '5', label: '5 Estrelas' },
          { value: '4', label: '4 Estrelas' },
          { value: '3', label: '3 Estrelas' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Testimonials_V2({ data }) {
  if (!data) return null;

  const { badge, headline, items = [], layout = {}, style = {} } = data;
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
      className="py-20 relative bg-zinc-950"
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className="container mx-auto px-6">
        <div className="mb-16">
          {badge && <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{renderHighlightedText(headline)}</h2>
        </div>

        <div className={`grid gap-6 ${layout.columns === '2' ? 'md:grid-cols-2' : layout.columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 flex flex-col gap-6"
            >
              <div className="flex gap-1">
                {[...Array(parseInt(item.rating) || 5)].map((_, i) => (
                  <Star key={i} size={12} fill={accentColor} color={accentColor} />
                ))}
              </div>
              <p className="text-lg font-medium text-zinc-300 flex-1 italic">"{item.text}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-black text-white uppercase text-sm tracking-tight">{item.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
