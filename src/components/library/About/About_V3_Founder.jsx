"use client";
// src/components/library/About/About_V3_Founder.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from '@/lib/lucide-shim';
import { commonFineTuning, commonBadge, commonElement, commonButtonFields, commonTypographyFields } from '../Common/SchemaProps';

export const metadata = {
  type: 'about',
  variant: 'v3',
  label: 'Founder Spotlight (v3)',
  defaultData: {
    badge: 'Meet our Founder',
    headline: 'Visão que {Transforma} Ambientes',
    subtitle: '"Qualidade não é um ato, é um hábito."',
    text: 'Nossa missão é entregar excelência através de um olhar atento aos detalhes e compromisso com o resultado final.',
    quoteAuthor: 'Gustavo Nivix',
    quoteRole: 'CEO & Founder',
    buttons: [
      { label: 'Saiba Mais', url: '#', variant: 'primary', design: 'rounded-xl', size: 'md' }
    ],
    layout: { 
      mediaPosition: 'left',
      align: 'left',
      alignMobile: 'center'
    },
    visibility: {
      showBadge: true,
      showHeadline: true,
      showSubtitle: true,
      showText: true,
      showMedia: true,
      showButtons: true,
      showAuthor: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'uppercase',
      subtitleSize: 'text-xl md:text-3xl',
      subtitleWeight: 'font-normal'
    }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.mediaPosition', label: 'Lado da Foto', type: 'select', options: [{value:'left', label:'Esquerda'}, {value:'right', label:'Direita'}] },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'align' },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'align' }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      ...commonBadge('Badge', 'Selo Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Citação do Fundador', { type: 'textarea', prefix: 'subtitle' }),
      ...commonElement('Text', 'Descrição Narrativa', { type: 'textarea', prefix: 'text', isBody: true }),
      {
        type: 'group',
        label: 'Informações do Autor',
        fields: [
          { key: 'visibility.showAuthor', label: 'Habilitar Autor', type: 'toggle' },
          { key: 'quoteAuthor', label: 'Nome do Fundador', type: 'text', condition: 'visibility.showAuthor' },
          { key: 'quoteRole', label: 'Cargo', type: 'text', condition: 'visibility.showAuthor' },
          { key: 'founderImage', label: 'Foto Perfil Fundador', type: 'image', condition: 'visibility.showAuthor' },
          ...commonTypographyFields('style.author', { isBody: true }).map(f => ({ ...f, condition: 'visibility.showAuthor' }))
        ]
      },
      {
        type: 'group',
        label: 'Mídia Principal',
        fields: [
          { key: 'visibility.showMedia', label: 'Habilitar Mídia', type: 'toggle' },
          { key: 'images', label: 'Fotos (Mosaico/Lista)', type: 'array', condition: 'visibility.showMedia', itemFields: [ { key: 'imageUrl', label: 'Imagem', type: 'image' } ] }
        ]
      },
      {
        type: 'group',
        label: 'Botões de Ação',
        fields: [
          { key: 'visibility.showButtons', label: 'Habilitar Botões', type: 'toggle' },
          { key: 'buttons', label: 'Lista de Botões', type: 'array', condition: 'visibility.showButtons', itemFields: commonButtonFields }
        ]
      }
    ]
  },
  ...commonFineTuning
];

export default function About_V3_Founder({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text, 
    quoteAuthor, quoteRole, founderImage,
    images = [], buttons = [],
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const isRightAligned = (layout.mediaPosition || 'left') === 'right';
  const desktopCenter = layout.align === 'center';
  const mobileCenter = layout.alignMobile === 'center';
  const isRight = layout.align === 'right';

  const img1 = images[0]?.imageUrl || images[0];

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

  const textAlignClass = `
    ${mobileCenter ? 'items-center text-center' : 'items-start text-left'}
    ${desktopCenter ? 'md:items-center md:text-center' : isRight ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}
  `;

  const justifyClass = `
    ${mobileCenter ? 'justify-center' : 'justify-start'}
    ${desktopCenter ? 'md:justify-center' : isRight ? 'md:justify-end' : 'md:justify-start'}
  `;

  return (
    <section className="py-24 md:py-32 px-6 overflow-hidden relative" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${isRightAligned ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* MÍDIA PRINCIPAL (FOTO GRANDE) */}
          {visibility.showMedia !== false && img1 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 1 }} 
              className="w-full lg:w-[45%] relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl border border-white/5">
                 <img src={img1} alt="Main Content" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className={`absolute -bottom-8 ${isRightAligned ? '-left-8' : '-right-8'} w-full h-full rounded-[3rem] border-2 -z-10`} style={{ borderColor: `${accentColor}44` }}></div>
            </motion.div>
          )}

          {/* CONTEÚDO */}
          <motion.div 
            initial={{ opacity: 0, x: isRightAligned ? -50 : 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className={`w-full lg:w-[55%] flex flex-col ${textAlignClass}`}
          >
            <div className={`mb-8 opacity-50 ${justifyClass}`} style={{ color: accentColor }}>
              <Quote size={48} />
            </div>
            
            {visibility.showBadge !== false && badge && (
               <div className={`flex items-center gap-4 mb-4 ${justifyClass}`}>
                 <span 
                  className={`${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} tracking-[0.4em]`}
                  style={{ color: accentColor, fontFamily: style.badgeFont || 'inherit' }}
                 >
                   {badge}
                 </span>
               </div>
            )}

            {visibility.showHeadline !== false && headline && (
              <h2 
                className={`
                  ${style.headlineSize || 'text-4xl md:text-6xl'} 
                  ${style.headlineWeight || 'font-black'} 
                  uppercase tracking-tighter mb-4 leading-[1.1]
                `} 
                style={{ color: textColor, fontFamily: style.headlineFont || 'inherit' }}
              >
                {renderHighlightedText(headline)}
              </h2>
            )}

            {visibility.showSubtitle !== false && subtitle && (
              <p 
                className={`
                  ${style.subtitleSize || 'text-xl md:text-3xl'} 
                  ${style.subtitleWeight || 'font-normal'} 
                  mb-4 opacity-90 leading-relaxed font-serif italic
                `} 
                style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
              >
                "{renderHighlightedText(subtitle)}"
              </p>
            )}

            {visibility.showText !== false && text && (
              <div 
                className="text-sm md:text-base mb-8 opacity-60 leading-relaxed font-medium max-w-xl" 
                style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
              >
                {text.split('\n').map((p, idx) => <p key={idx} className="mb-4">{p}</p>)}
              </div>
            )}

            {/* AUTORIA COM MINIATURA (founderImage) */}
            {visibility.showAuthor !== false && (quoteAuthor || founderImage) && (
                <div className={`flex items-center gap-6 mt-4 pt-8 border-t border-white/10 w-full ${justifyClass}`}>
                    {founderImage && (
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/10 shrink-0">
                            <img src={founderImage} alt="Founder Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <p 
                          className={`
                            ${style.authorSize || 'text-lg'} 
                            ${style.authorWeight || 'font-black'} 
                            leading-tight
                          `} 
                          style={{ color: textColor, fontFamily: style.authorFont || 'inherit' }}
                        >
                          {quoteAuthor || 'Founder Name'}
                        </p>
                        {quoteRole && (
                          <p 
                            className="text-[10px] uppercase tracking-widest font-black mt-1" 
                            style={{ color: accentColor }}
                          >
                            {quoteRole}
                          </p>
                        )}
                    </div>
                </div>
            )}

            {/* BUTTONS */}
            {visibility.showButtons !== false && buttons && buttons.length > 0 && (
              <div className={`flex flex-wrap gap-4 w-full mt-10 ${justifyClass}`}>
                {buttons.map((btn, idx) => {
                  const isOutline = btn.variant === 'outline';
                  const isGhost = btn.variant === 'ghost';
                  
                  const sizeClasses = btn.size === 'sm' ? 'px-6 py-2 text-[9px]' : 
                                     btn.size === 'lg' ? 'px-12 py-5 text-sm' : 
                                     'px-10 py-4 text-[10px]';

                  const baseClasses = `
                    ${sizeClasses} 
                    ${btn.design || 'rounded-xl'} 
                    font-black uppercase tracking-widest transition-all border-2 flex items-center gap-2
                    hover:scale-105 active:scale-95
                  `;

                  const buttonStyle = isOutline 
                    ? { borderColor: accentColor, color: accentColor, backgroundColor: 'transparent' }
                    : isGhost
                      ? { borderColor: 'transparent', color: textColor, backgroundColor: 'transparent' }
                      : { backgroundColor: accentColor, borderColor: accentColor, color: '#000' };

                  return (
                    <a key={idx} href={btn.url || '#'} className={baseClasses} style={buttonStyle}>
                      {btn.label}
                      <ArrowRight size={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}