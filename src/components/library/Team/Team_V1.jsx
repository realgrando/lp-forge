"use client";
// src/components/library/Team/Team_V1.jsx
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
  variant: 'v1',
  label: 'Equipe Professional (v1)',
  defaultData: {
    badge: "Nossa Equipe",
    headline: "Conheça os {especialistas} por trás da nossa excelência",
    subtitle: "Profissionais apaixonados por entregar os melhores resultados em cada projeto.",
    members: [
      { 
        name: "Carlos Andrade", 
        role: "Engenheiro Chefe / Mestre Pizzaiolo", 
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        bio: "Mais de 15 anos transformando visões em realidade com precisão e arte.",
        socials: [
          { type: 'linkedin', url: '#' },
          { type: 'instagram', url: '#' }
        ]
      },
      { 
        name: "Mariana Silva", 
        role: "Arquiteta Sênior / Chef de Cozinha", 
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        bio: "Especialista em criar experiências que unem funcionalidade e sabor inesquecível.",
        socials: [
          { type: 'linkedin', url: '#' },
          { type: 'instagram', url: '#' }
        ]
      }
    ],
    layout: { width: 'container', paddingY: 'py-20', columns: 'grid-cols-1 md:grid-cols-2', grayscale: false },
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

export default function Team_V1({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, members = [], visibility = {}, layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';
  
  const width = layout.width || 'container';
  const paddingY = layout.paddingY || 'py-20';
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
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10 bg-white/5"
              style={{ color: accentColor, borderColor: `${accentColor}33` }}
            >
              {badge}
            </motion.span>
          )}
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter mb-6 leading-none`}
            style={{ color: style.customText || '#fff' }}
          >
            {renderHighlightedText(headline)}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg font-medium"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* TEAM GRID */}
        <div className={`grid ${columns} gap-10`}>
          {members.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 border border-white/5">
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${grayscale ? 'grayscale hover:grayscale-0' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex gap-4">
                    {m.socials?.map((soc, sidx) => {
                      const Icon = socialIcons[soc.type];
                      return Icon ? (
                        <a key={sidx} href={soc.url} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#EAB308] hover:text-black transition-all" style={{ backgroundColor: undefined }}>
                          <Icon size={18} />
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
              <div className="px-4">
                <h3 className="text-xl font-black text-white mb-1 group-hover:text-[#EAB308] transition-colors" style={{ color: undefined }}>{m.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">{m.role}</p>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed line-clamp-2">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
