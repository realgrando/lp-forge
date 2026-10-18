"use client";
// src/components/library/Team/Team_V3_Artisan.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Twitter } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter
};

export const metadata = {
  type: 'team',
  variant: 'v3',
  label: 'Artisan Circular (v3)',
  defaultData: {
    badge: "The Craftsmen",
    headline: "Mãos que {transformam} sonhos",
    subtitle: "A excelência está nos detalhes e no talento de quem faz acontecer.",
    members: [
      { 
        name: "Chef Luiza", 
        role: "Pastry Artist / Designer de Interiores", 
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
        bio: "Combinando estética e funcionalidade em cada criação artesanal.",
        socials: [{ type: 'instagram', url: '#' }]
      },
      { 
        name: "Mestre Jonas", 
        role: "Head Mason / Especialista em Fornos", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        bio: "O segredo do calor perfeito e da estrutura indestrutível.",
        socials: [{ type: 'instagram', url: '#' }]
      },
      { 
        name: "Eng. Fábio", 
        role: "Project Manager / Sommelier de Vinhos", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        bio: "Gestão impecável e harmonização completa para o seu projeto.",
        socials: [{ type: 'linkedin', url: '#' }]
      }
    ],
    layout: { width: 'container', paddingY: 'py-24', columns: 'grid-cols-1 md:grid-cols-3', grayscale: true },
    style: { showAmbientLight: false }
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
      ]},
      { key: 'layout.grayscale', label: 'Fotos em Grayscale', type: 'toggle', default: false }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'members', label: 'Membros da Equipe', type: 'array', itemFields: [
        { key: 'name', label: 'Nome Completo', type: 'text' },
        { key: 'role', label: 'Cargo / Especialidade', type: 'text' },
        { key: 'image', label: 'Foto do Membro', type: 'image' },
        { key: 'bio', label: 'Pequena Bio', type: 'textarea' },
        { key: 'socials', label: 'Redes Sociais', type: 'array', itemFields: [
          { key: 'type', label: 'Rede', type: 'select', options: [
            { value: 'instagram', label: 'Instagram' },
            { value: 'linkedin', label: 'LinkedIn' },
            { value: 'facebook', label: 'Facebook' },
            { value: 'twitter', label: 'Twitter/X' }
          ]},
          { key: 'url', label: 'Link (URL)', type: 'text' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Team_V3_Artisan({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, members = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-24';
  const columns = layout.columns || 'grid-cols-1 md:grid-cols-3';
  const grayscale = layout.grayscale || false;

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
      className={`${paddingY} relative bg-zinc-50 text-black`}
      style={{ backgroundColor: style.customBg || '#f9fafb', color: style.customText || '#000' }}
    >
      <div className={`${width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'}`}>
        <div className="text-center mb-24 max-w-2xl mx-auto">
          {visibility.showBadge !== false && (
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
              {badge}
            </span>
          )}
          <h2 className={`${style.titleSize || 'text-4xl md:text-5xl'} font-black tracking-tight mb-6`}>
            {renderHighlightedText(headline)}
          </h2>
          <p className="text-zinc-500 font-medium">
            {subtitle}
          </p>
        </div>

        <div className={`grid ${columns} gap-16`}>
          {members.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-[6px] border-white shadow-xl group-hover:shadow-2xl transition-all duration-500 relative">
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${grayscale ? 'grayscale group-hover:grayscale-0' : ''}`}
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-2xl font-black mb-1">{m.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest mb-6" style={{ color: accentColor }}>{m.role}</p>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed mb-8 max-w-[240px]">{m.bio}</p>
              
              <div className="flex gap-4">
                {m.socials?.map((soc, sidx) => {
                  const Icon = socialIcons[soc.type];
                  return Icon ? (
                    <a key={sidx} href={soc.url} className="text-zinc-300 hover:text-black transition-colors">
                      <Icon size={18} />
                    </a>
                  ) : null;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
