"use client";
// src/components/library/LogoCloud/LogoCloud_V1.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'logocloud',
  variant: 'v1',
  label: 'Parceiros (v1)',
  defaultData: {
    items: [
      { name: 'Partner 1', image: 'https://cdn.worldvectorlogo.com/logos/google-2015.svg' },
      { name: 'Partner 2', image: 'https://cdn.worldvectorlogo.com/logos/apple-11.svg' }
    ],
    layout: { width: 'container', paddingY: 'py-20', logoHeight: 'h-8 md:h-12', showBorders: true, grayscale: true, marquee: false },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.width', label: 'Largura da Área', type: 'select', options: [{ value: 'container', label: 'Limitada (Container)' }, { value: 'full', label: 'Total (Full Width)' }] },
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{ value: 'py-12', label: 'Pequeno' }, { value: 'py-20', label: 'Normal' }, { value: 'py-32', label: 'Grande' }] },
      { key: 'layout.logoHeight', label: 'Tamanho dos Logos', type: 'select', options: [{ value: 'h-6 md:h-8', label: 'Pequeno' }, { value: 'h-8 md:h-12', label: 'Normal' }, { value: 'h-12 md:h-20', label: 'Grande' }] },
      { key: 'layout.showBorders', label: 'Linhas Divisórias', type: 'toggle', default: true },
      { key: 'layout.grayscale', label: 'Efeito Grayscale', type: 'toggle', default: true },
      { key: 'layout.marquee', label: 'Animação Infinita (Marquee)', type: 'toggle', default: false }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'items', label: 'Logos das Marcas', type: 'array', itemFields: [
        { key: 'image', label: 'Imagem da Logo', type: 'image' },
        { key: 'name', label: 'Nome da Marca', type: 'text' },
        { key: 'url', label: 'Link (Opcional)', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

const LogoGrid = ({ items, logoHeight, grayscale }) => (
  <div className={`flex flex-wrap justify-center items-center gap-12 md:gap-20 ${grayscale ? 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100' : ''} transition-all duration-700`}>
    {items.map((item, index) => (
      <motion.img 
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        src={item.image} 
        alt={item.name} 
        className={`${logoHeight} w-auto object-contain transition-transform hover:scale-110`}
      />
    ))}
  </div>
);

const Marquee = ({ items, logoHeight, grayscale }) => {
  const marqueeItems = [...items, ...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-4 select-none">
      <motion.div 
        className="flex gap-20 items-center whitespace-nowrap min-w-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            <img src={item.image} alt={item.name} className={`${logoHeight} w-auto object-contain ${grayscale ? 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100' : ''} transition-all duration-500`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function LogoCloud_V1({ data }) {
  if (!data) return null;
  const { title = "", items = [], layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-20';
  const logoHeight = layout.logoHeight || 'h-8 md:h-12';
  const grayscale = layout.grayscale !== false; 
  const marquee = layout.marquee || false;

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
    <section className={`${paddingY} relative overflow-hidden ${layout.showBorders ? 'border-y border-white/5' : ''}`} style={{ backgroundColor: style.customBg || 'transparent' }}>
      <div className={`${width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'}`}>
        {title && <h2 className={`${style.titleSize || 'text-4xl md:text-5xl'} text-center font-black tracking-tighter mb-16`} style={{ color: style.customText || '#fff' }}>{renderHighlightedText(title)}</h2>}
        {marquee ? <Marquee items={items} logoHeight={logoHeight} grayscale={grayscale} /> : <LogoGrid items={items} logoHeight={logoHeight} grayscale={grayscale} />}
      </div>
      {style.showAmbientLight && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />}
    </section>
  );
}
