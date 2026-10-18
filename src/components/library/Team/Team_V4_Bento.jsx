"use client";
// src/components/library/Team/Team_V4_Bento.jsx
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
  variant: 'v4',
  label: 'Bento Team (v4)',
  defaultData: {
    badge: "Squad",
    headline: "O time de {elite} da Nivix",
    subtitle: "Estrutura bento box para dar destaque aos líderes e fundadores.",
    members: [
      { 
        name: "Arthur Nivix", 
        role: "Founder / Master Builder", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
        bio: "Idealizador da metodologia que une construção pesada e gastronomia de luxo.",
        socials: [{ type: 'instagram', url: '#' }, { type: 'linkedin', url: '#' }]
      },
      { 
        name: "Clara Mendes", 
        role: "Head of Design / Chef Executiva", 
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
        bio: "Transformando estética em função e sabor.",
        socials: [{ type: 'instagram', url: '#' }]
      },
      { 
        name: "Bruno Costa", 
        role: "Engenheiro de Operações", 
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        bio: "Precisão absoluta em cada entrega.",
        socials: [{ type: 'linkedin', url: '#' }]
      }
    ],
    layout: { width: 'container', paddingY: 'py-20', columns: 'grid-cols-1 md:grid-cols-12', grayscale: false },
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

export default function Team_V4_Bento({ data }) {
  if (!data) return null;

  const { badge, headline, subtitle, members = [], visibility = {}, style = {} } = data;
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
      className="py-20 relative overflow-hidden bg-black"
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          {visibility.showBadge !== false && (
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 block">
              {badge}
            </span>
          )}
          <h2 className={`${style.titleSize || 'text-4xl md:text-6xl'} font-black tracking-tighter text-white mb-6`}>
            {renderHighlightedText(headline)}
          </h2>
          <p className="text-zinc-500 font-medium max-w-xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          {members.map((m, idx) => {
            const isMain = idx === 0;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/50 group ${
                  isMain ? 'md:col-span-8 md:row-span-2' : 'md:col-span-4 md:row-span-1'
                }`}
              >
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className={`${isMain ? 'text-3xl' : 'text-xl'} font-black text-white leading-none mb-2`}>{m.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#EAB308]" style={{ color: accentColor }}>{m.role}</p>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-xs text-zinc-400 font-medium mb-6 line-clamp-2 max-w-sm">{m.bio}</p>
                      <div className="flex gap-3">
                        {m.socials?.map((soc, sidx) => {
                          const Icon = socialIcons[soc.type];
                          return Icon ? (
                            <a key={sidx} href={soc.url} className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                              <Icon size={14} />
                            </a>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
