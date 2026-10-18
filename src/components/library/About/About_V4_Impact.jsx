"use client";
// src/components/library/About/About_V4_Impact.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { ArrowRight, ShieldCheck } from '@/lib/lucide-shim';
import { commonFineTuning, commonBadge, commonElement, commonButtonFields, commonTypographyFields } from '../Common/SchemaProps';

const CountUp = ({ value, duration = 2 }) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  useEffect(() => {
    if (!value) return;
    const stringValue = String(value);
    const numeric = parseFloat(stringValue.replace(/[^0-9.]/g, '')) || 0;
    const suffix = stringValue.replace(/[0-9.]/g, '');
    const controls = animate(0, numeric, {
      duration,
      onUpdate: (latest) => setDisplay(Math.floor(latest) + suffix),
    });
    return () => controls.stop();
  }, [value]);
  return <span ref={ref}>{display}</span>;
};

export const metadata = {
  type: 'about',
  variant: 'v4',
  label: 'Impacto e Números (v4)',
  defaultData: {
    badge: 'Results Matter',
    headline: 'Construindo um {Legado} de Excelência',
    subtitle: 'Nossos números refletem o compromisso com a qualidade técnica.',
    text: 'Entregamos projetos de alto padrão com precisão cirúrgica e acabamento superior.',
    stats: [
      { value: '500+', label: 'Projetos' }, 
      { value: '100%', label: 'Satisfação' },
      { value: '15+', label: 'Anos' }
    ],
    images: [{ imageUrl: '' }],
    buttons: [
      { label: 'Ver Projetos', url: '#', variant: 'primary', design: 'rounded-xl', size: 'md' }
    ],
    layout: { 
      mediaPosition: 'right', 
      align: 'left', 
      alignMobile: 'center',
      overlayOpacity: 0.6 
    },
    visibility: {
      showBadge: true,
      showHeadline: true,
      showSubtitle: true,
      showText: true,
      showStats: true,
      showMedia: true,
      showButtons: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'uppercase',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleWeight: 'font-bold'
    }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.mediaPosition', label: 'Lado da Imagem', type: 'select', options: [{value:'right', label:'Direita'}, {value:'left', label:'Esquerda'}] },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'align' },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'align' },
      { key: 'layout.overlayOpacity', label: 'Opacidade Fundo', type: 'range', min: 0, max: 1, step: 0.1, default: 0.6 }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      ...commonBadge('Badge', 'Selo Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      ...commonElement('Text', 'Descrição Narrativa', { type: 'textarea', prefix: 'text', isBody: true }),
      {
        type: 'group',
        label: 'Mídia e Background',
        fields: [
          { key: 'visibility.showMedia', label: 'Habilitar Mídia Lateral', type: 'toggle' },
          { key: 'images', label: 'Lista de Fotos', type: 'array', condition: 'visibility.showMedia', itemFields: [ { key: 'imageUrl', label: 'Imagem', type: 'image' } ] },
          { key: 'bgImage', label: 'Imagem de Fundo (Seção)', type: 'image' }
        ]
      },
      {
        type: 'group',
        label: 'Números de Impacto',
        fields: [
          { key: 'visibility.showStats', label: 'Habilitar Estatísticas', type: 'toggle' },
          { key: 'stats', label: 'Lista de Números', type: 'array', condition: 'visibility.showStats', itemFields: [ { key: 'value', label: 'Valor', type: 'text' }, { key: 'label', label: 'Legenda', type: 'text' } ] }
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

export default function About_V4_Impact({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text,
    images = [], stats = [], buttons = [], bgImage,
    visibility = {}, style = {}, layout = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  
  const img1 = images[0]?.imageUrl || images[0];
  const isImageRight = (layout.mediaPosition || 'right') === 'right';
  const overlayOpacity = layout.overlayOpacity !== undefined ? layout.overlayOpacity : 0.6;

  const desktopCenter = layout.align === 'center';
  const mobileCenter = layout.alignMobile === 'center';
  const isRight = layout.align === 'right';

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
    <section className="py-24 md:py-32 px-8 md:px-16 overflow-hidden relative w-full min-h-[60vh] flex items-center" style={{ backgroundColor: bgColor }}>
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {bgImage && (
          <>
            <img src={bgImage} alt="Background" className="w-full h-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity }} />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${isImageRight ? '' : 'lg:flex-row-reverse'}`}>
            
            {/* COLUNA NARRATIVA */}
            <motion.div 
              initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`w-full lg:w-[58%] flex flex-col ${textAlignClass}`}
            >
                {/* BADGE */}
                {visibility.showBadge !== false && badge && (
                  <div className={`flex items-center gap-4 mb-6 ${justifyClass}`}>
                    <ShieldCheck size={20} style={{ color: accentColor }} />
                    <span 
                      className={`${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} tracking-[0.4em]`}
                      style={{ color: accentColor, fontFamily: style.badgeFont || 'inherit' }}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                {/* HEADLINE */}
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

                {/* SUBTITLE */}
                {visibility.showSubtitle !== false && subtitle && (
                  <p 
                    className={`
                      ${style.subtitleSize || 'text-xl md:text-2xl'} 
                      ${style.subtitleWeight || 'font-bold'} 
                      mb-4 opacity-90 leading-tight
                    `} 
                    style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
                  >
                    {renderHighlightedText(subtitle)}
                  </p>
                )}

                {/* TEXTO RICO */}
                {visibility.showText !== false && text && (
                  <div 
                    className="text-sm md:text-base mb-10 opacity-60 leading-relaxed font-medium max-w-xl" 
                    style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
                  >
                     {text.split('\n').map((paragraph, idx) => (
                       <p key={idx} className="mb-4">{paragraph}</p>
                     ))}
                  </div>
                )}

                {/* BUTTONS */}
                {visibility.showButtons !== false && buttons && buttons.length > 0 && (
                  <div className={`flex flex-wrap gap-4 w-full mb-16 ${justifyClass}`}>
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

                {/* STATS GRID */}
                {visibility.showStats !== false && stats.length > 0 && (
                  <div className={`grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 border-t border-white/5 pt-12 w-full ${justifyClass}`}>
                    {stats.map((stat, i) => (
                      <div key={i} className={`relative group ${textAlignClass}`}>
                        <div className={`border-l-2 border-white/5 pl-6 ${isRight ? 'md:border-l-0 md:border-r-2 md:pr-6' : ''}`}>
                            <p className="text-4xl md:text-5xl font-black mb-1 tracking-tighter" style={{ color: accentColor }}>
                                <CountUp value={stat.value} />
                            </p>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 leading-tight" style={{ color: textColor }}>{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </motion.div>

            {/* COLUNA IMAGEM */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-[42%] lg:sticky lg:top-32"
            >
                {visibility.showMedia !== false && img1 && (
                    <div className="w-full aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl border border-white/5 relative group">
                        <img src={img1} alt="Impact" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                )}
            </motion.div>

        </div>
      </div>
    </section>
  );
}