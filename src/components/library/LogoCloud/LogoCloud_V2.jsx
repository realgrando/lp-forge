"use client";
// src/components/library/LogoCloud/LogoCloud_V2.jsx
import { motion } from 'framer-motion';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'logocloud',
  variant: 'v2',
  label: 'Grade de Parceiros (v2)',
  defaultData: {
    headline: "Marcas que {confiam} em nosso trabalho",
    subtitle: "Parcerias sólidas que geram resultados extraordinários.",
    items: [
      { name: 'Google', image: 'https://cdn.worldvectorlogo.com/logos/google-2015.svg' },
      { name: 'Apple', image: 'https://cdn.worldvectorlogo.com/logos/apple-11.svg' }
    ],
    layout: { columns: 'grid-cols-2 md:grid-cols-4', gap: 'gap-8' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.width', label: 'Largura da Área', type: 'select', options: [{ value: 'container', label: 'Limitada (Container)' }, { value: 'full', label: 'Total (Full Width)' }] },
      { key: 'layout.columns', label: 'Colunas', type: 'select', options: [{ value: 'grid-cols-2 md:grid-cols-3', label: '3 Colunas' }, { value: 'grid-cols-2 md:grid-cols-4', label: '4 Colunas' }, { value: 'grid-cols-2 md:grid-cols-6', label: '6 Colunas' }] },
      { key: 'layout.gap', label: 'Espaçamento', type: 'select', options: [{ value: 'gap-4', label: 'Pequeno' }, { value: 'gap-8', label: 'Normal' }, { value: 'gap-12', label: 'Grande' }] }
    ]
  },
  {
    group: '2. Conteúdo Moderno',
    fields: [
      { key: 'headline', label: 'Título {Destaque}', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'items', label: 'Cards de Logo', type: 'array', itemFields: [
        { key: 'image', label: 'Imagem da Logo', type: 'image' },
        { key: 'name', label: 'Nome da Marca', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function LogoCloud_V2({ data }) {
  if (!data) return null;
  const { headline, subtitle, items = [], layout = {}, style = {} } = data;
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
    <section className="py-24 relative bg-zinc-950 text-white" style={{ backgroundColor: style.customBg || undefined }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">{renderHighlightedText(headline)}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>
        <div className={`grid ${layout.columns || 'grid-cols-2 md:grid-cols-4'} ${layout.gap || 'gap-8'}`}>
          {items.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="h-32 rounded-3xl bg-zinc-900/50 border border-white/5 flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all group">
              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
