"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Shield, Users, Award, CheckCircle2, ArrowUpRight } from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement, commonBadge } from '../Common/SchemaProps';

const ICON_MAP = {
  sparkles: Sparkles,
  target: Target,
  zap: Zap,
  shield: Shield,
  users: Users,
  award: Award,
  check: CheckCircle2
};

const featuresSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.align', label: 'Alinhamento Cabeçalho', type: 'align' },
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [
        { value: 'py-12 md:py-20', label: 'Normal' },
        { value: 'py-20 md:py-32', label: 'Grande' },
        { value: 'py-32 md:py-48', label: 'Monumental' }
      ]}
    ]
  },
  {
    group: '2. Conteúdo (Elementos)',
    fields: [
      ...commonBadge('Badge', 'Badge Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      { type: 'section', label: 'Grade Bento' },
      { 
        key: 'items', 
        label: 'Cards Bento', 
        type: 'array', 
        itemFields: [
          { key: 'title', label: 'Título', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'image', label: 'Imagem de Fundo/Destaque', type: 'image' },
          { key: 'url', label: 'Link do Card (URL)', type: 'text' },
          { key: 'span', label: 'Tamanho (Desktop)', type: 'select', options: [
            { value: 'col-span-1', label: 'Pequeno (1x1)' },
            { value: 'col-span-2', label: 'Largo (2x1)' },
            { value: 'row-span-2', label: 'Alto (1x2)' },
            { value: 'col-span-2 row-span-2', label: 'Bloco Grande (2x2)' },
            { value: 'col-span-3', label: 'Extra Largo (3x1)' },
            { value: 'col-span-4', label: 'Largura Total (4x1)' }
          ]},
          { key: 'icon', label: 'Ícone', type: 'select', options: [
            { value: 'sparkles', label: 'Premium' },
            { value: 'target', label: 'Foco' },
            { value: 'zap', label: 'Rápido' },
            { value: 'shield', label: 'Seguro' },
            { value: 'users', label: 'Equipe' },
            { value: 'award', label: 'Qualidade' },
            { value: 'check', label: 'Check' }
          ]}
        ] 
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Pintura e Cores' },
      { key: 'style.customAccent', label: 'Cor de Destaque (Accent)', type: 'color' },
      { key: 'style.customBg', label: 'Cor de Fundo da Seção', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' },
      { type: 'section', label: 'Estilo Bento' },
      { key: 'style.cardBg', label: 'Fundo dos Cards', type: 'color' },
      { key: 'style.overlayOpacity', label: 'Opacidade do Overlay (Imagens)', type: 'range', min: 0, max: 1, step: 0.1 }
    ]
  }
];

export const metadata = {
  type: 'features',
  variant: 'v2',
  label: 'Bento Grid Elite (v2)',
  defaultData: {
    badge: 'Performance Bento',
    headline: 'Excelência em cada {detalhe}',
    subtitle: 'Nossa estrutura foi desenhada para entregar o máximo impacto visual.',
    items: [
      { title: 'Inovação', description: 'Tecnologia de ponta em cada etapa.', span: 'col-span-2', icon: 'zap', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', url: '#' },
      { title: 'Segurança', description: 'Processos certificados e seguros.', span: 'col-span-1', icon: 'shield' },
      { title: 'Equipe', description: 'Os melhores talentos do mercado.', span: 'row-span-2', icon: 'users', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' },
      { title: 'Foco', description: 'Resultado orientado ao cliente.', span: 'col-span-1', icon: 'target' },
      { title: 'Premium', description: 'Acabamento de luxo garantido.', span: 'col-span-1', icon: 'sparkles' }
    ],
    layout: { align: 'center', paddingY: 'py-20 md:py-32', badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      cardBg: '#18181b',
      overlayOpacity: 0.6,
      badgeSize: 'text-[10px] md:text-xs',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'normal-case',
      subtitleSize: 'text-lg md:text-xl',
      subtitleWeight: 'font-normal',
      subtitleTransform: 'normal-case'
    }
  }
};

export const schema = featuresSchema;

export default function Features_V2_Bento({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, items = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  const cardBg = style.cardBg || '#18181b';
  const overlayOpacity = style.overlayOpacity !== undefined ? style.overlayOpacity : 0.6;

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end'
  }[layout.align || 'center'];

  const renderHighlightedText = (content) => {
    if (!content) return null;
    const parts = content.split(/(\{.*?\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        return <span key={i} style={{ color: accentColor }}>{part.slice(1, -1)}</span>;
      }
      return part;
    });
  };

  const badgeDesign = layout.badgeVariant || 'capsule';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className={`relative overflow-hidden ${layout.paddingY || 'py-20 md:py-32'}`} style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER AREA */}
        <div className={`flex flex-col mb-16 max-w-4xl ${alignClasses}`}>
          {visibility.showBadge !== false && badge && (
            <div className="mb-8 text-zinc-100">
              {badgeDesign === 'lines' ? (
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 opacity-30" style={{ backgroundColor: accentColor }} />
                  <span style={{ color: accentColor, ...badgeFont }} className={`flex items-center ${badgeStyleClasses} tracking-[0.4em]`}>
                    {badge}
                  </span>
                  <div className="h-[1px] w-8 opacity-30" style={{ backgroundColor: accentColor }} />
                </div>
              ) : badgeDesign === 'minimal' ? (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  <span style={{ color: textColor, ...badgeFont }} className={`flex items-center ${badgeStyleClasses} tracking-[0.2em]`}>
                    {badge}
                  </span>
                </div>
              ) : badgeDesign === 'underline' ? (
                <div className="inline-flex items-center border-b-2 pb-1" style={{ borderColor: accentColor }}>
                  <span style={{ color: textColor, ...badgeFont }} className={`flex items-center ${badgeStyleClasses} tracking-[0.2em]`}>
                    {badge}
                  </span>
                </div>
              ) : (
                <span 
                  className={`inline-flex items-center px-4 h-8 rounded-full tracking-[0.2em] border ${badgeStyleClasses}`}
                  style={{ color: accentColor, borderColor: `${accentColor}44`, backgroundColor: `${accentColor}11`, ...badgeFont }}
                >
                  {badge}
                </span>
              )}
            </div>
          )}

          {visibility.showHeadline !== false && headline && (
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`
                ${style.headlineSize || 'text-4xl md:text-6xl'} 
                ${style.headlineWeight || 'font-black'} 
                ${style.headlineTransform || 'normal-case'} 
                tracking-tighter mb-6 leading-[0.95]
              `}
              style={{ color: textColor, fontFamily: style.headlineFont || 'inherit' }}
            >
              {renderHighlightedText(headline)}
            </motion.h2>
          )}

          {visibility.showSubtitle !== false && subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`
                ${style.subtitleSize || 'text-lg md:text-xl'} 
                ${style.subtitleWeight || 'font-normal'} 
                ${style.subtitleTransform || 'normal-case'} 
                opacity-60 leading-relaxed max-w-2xl
              `}
              style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
            >
              {renderHighlightedText(subtitle)}
            </motion.p>
          )}
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Award;
            const Wrapper = item.url ? 'a' : 'div';
            
            return (
              <motion.div
                key={idx}
                as={Wrapper}
                {...(item.url ? { href: item.url } : {})}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  relative overflow-hidden rounded-[2.5rem] group p-8 flex flex-col justify-end
                  ${item.span || 'col-span-1'}
                  ${item.url ? 'cursor-pointer' : ''}
                `}
                style={{ backgroundColor: cardBg }}
              >
                {/* BACKGROUND IMAGE WITH OVERLAY */}
                {item.image && (
                  <>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
                  </>
                )}

                {/* CONTENT AREA */}
                <div className="relative z-10">
                  <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 border"
                      style={{ backgroundColor: `${accentColor}22`, borderColor: `${accentColor}44`, color: accentColor }}
                  >
                    <Icon size={24} />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.title}
                    </h3>
                    {item.url && <ArrowUpRight size={18} className="text-white/30 group-hover:text-white transition-colors" />}
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>

                {/* CARD ACCENT GLOW (BOTTOM) */}
                <div 
                    className="absolute -bottom-10 -left-10 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-full" 
                    style={{ backgroundColor: accentColor }} 
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
