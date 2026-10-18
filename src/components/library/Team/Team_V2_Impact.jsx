"use client";
// src/components/library/Team/Team_V2_Impact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Twitter, ArrowUpRight } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter
};

export const metadata = {
  type: 'team',
  variant: 'v2',
  label: 'Impact Experts (v2)',
  defaultData: {
    badge: "The Masters",
    headline: "Paixão por {construir} e servir",
    subtitle: "Uma equipe de elite focada em transformar sonhos em experiências reais.",
    members: [
      { 
        name: "Chef Ricardo", 
        role: "Head Pizzaiolo / Engenheiro de Sabores", 
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600",
        bio: "Domina a arte do fogo e da massa com precisão matemática.",
        socials: [{ type: 'instagram', url: '#' }]
      },
      { 
        name: "Eng. Roberto", 
        role: "Diretor de Obras / Especialista Estrutural", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
        bio: "Garantindo que cada estrutura seja eterna e impecável.",
        socials: [{ type: 'linkedin', url: '#' }]
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

export default function Team_V2_Impact({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, members = [], visibility = {}, layout = {}, style = {} } = data;
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
      className={`${paddingY} relative overflow-hidden bg-zinc-950`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className={`${width === 'full' ? 'w-full px-6' : 'container mx-auto px-6'} relative z-10`}>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-2xl">
            {visibility.showBadge !== false && (
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
                style={{ color: accentColor }}
              >
                {badge}
              </motion.span>
            )}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`${style.titleSize || 'text-5xl md:text-7xl'} font-black tracking-tighter text-white leading-[0.85]`}
            >
              {renderHighlightedText(headline)}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 font-medium text-lg max-w-sm"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className={`grid ${columns} gap-12`}>
          {members.map((m, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900 aspect-[16/10]">
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                
                <div className="absolute bottom-0 left-0 w-full p-10 flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2 leading-none">{m.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{m.role}</p>
                  </div>
                  <div className="flex gap-2">
                    {m.socials?.map((soc, sidx) => {
                      const Icon = socialIcons[soc.type];
                      return Icon ? (
                        <a key={sidx} href={soc.url} className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                          <Icon size={20} />
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 px-4 flex gap-6 items-start">
                <div className="w-px h-12 bg-zinc-800 shrink-0" style={{ backgroundColor: `${accentColor}44` }} />
                <p className="text-zinc-500 font-medium leading-relaxed italic">{m.bio}</p>
                <div className="ml-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-700 group-hover:text-white group-hover:border-[#EAB308] transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
