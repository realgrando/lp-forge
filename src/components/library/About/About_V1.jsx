"use client";
// src/components/library/About/About_V1.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { CheckCircle2, ArrowRight } from '@/lib/lucide-shim';
import * as LucideIcons from '@/lib/lucide-shim';
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
  variant: 'v1',
  label: 'Sobre Nós Base (v1)',
  defaultData: {
    badge: 'Our Story',
    headline: 'Construindo com {Paixão} e Precisão',
    subtitle: 'Nossa equipe especializada entrega precisão e acabamento superior.',
    text: 'Desde o início, nosso foco tem sido a excelência técnica em cada projeto executado.',
    features: [
      { icon: 'CheckCircle2', text: 'Experiência Comprovada' }, 
      { icon: 'CheckCircle2', text: 'Qualidade Técnica' }
    ],
    stats: [
      { value: '15+', label: 'Anos de Mercado' },
      { value: '500+', label: 'Obras Entregues' }
    ],
    images: [
      { imageUrl: '' },
      { imageUrl: '' }
    ],
    buttons: [
      { label: 'Saiba Mais', url: '#', variant: 'primary', design: 'rounded-xl', size: 'md' }
    ],
    layout: { 
      mediaPosition: 'left', 
      mediaStyle: 'rounded', 
      align: 'left', 
      alignMobile: 'center',
      badgeVariant: 'capsule'
    },
    visibility: {
      showBadge: true,
      showHeadline: true,
      showSubtitle: true,
      showText: true,
      showFeatures: true,
      showStats: true,
      showButtons: true,
      showMedia: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      badgeSize: 'text-[10px]',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-4xl md:text-5xl',
      headlineWeight: 'font-black',
      headlineTransform: 'uppercase',
      subtitleSize: 'text-xl',
      subtitleWeight: 'font-bold',
      navSize: 'text-sm',
      navWeight: 'font-bold'
    }
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.mediaPosition', label: 'Lado da Mídia', type: 'select', options: [{value:'left', label:'Esquerda'}, {value:'right', label:'Direita'}] },
      { key: 'layout.mediaStyle', label: 'Estilo da Mídia', type: 'select', options: [{value:'rounded', label:'Arredondado'}, {value:'skew', label:'Inclinado'}] },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'align' },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'align' },
      { key: 'layout.badgeVariant', label: 'Design da Badge', type: 'select', options: [
        {value:'capsule', label:'Cápsula (Accent)'}, 
        {value:'glass', label:'Glass (Vidro)'},
        {value:'lines', label:'Com Linhas'},
        {value:'minimal', label:'Minimalista'},
        {value:'underline', label:'Sublinhado'}
      ]}
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      ...commonBadge('Badge', 'Selo Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      ...commonElement('Text', 'Descrição Longa', { type: 'textarea', prefix: 'text', isBody: true }),
      {
        type: 'group',
        label: 'Diferenciais (Lista)',
        fields: [
          { key: 'visibility.showFeatures', label: 'Habilitar Diferenciais', type: 'toggle' },
          { key: 'features', label: 'Itens da Lista', type: 'array', condition: 'visibility.showFeatures', itemFields: [ 
            { key: 'icon', label: 'Ícone (Lucide)', type: 'text' },
            { key: 'text', label: 'Texto', type: 'text' } 
          ] }
        ]
      },
      {
        type: 'group',
        label: 'Números de Impacto',
        fields: [
          { key: 'visibility.showStats', label: 'Habilitar Estatísticas', type: 'toggle' },
          { key: 'stats', label: 'Lista de Números', type: 'array', condition: 'visibility.showStats', itemFields: [ 
            { key: 'value', label: 'Valor (Ex: 15+)', type: 'text' }, 
            { key: 'label', label: 'Legenda', type: 'text' } 
          ] }
        ]
      },
      {
        type: 'group',
        label: 'Imagens da Seção',
        fields: [
          { key: 'visibility.showMedia', label: 'Habilitar Mídia', type: 'toggle' },
          { key: 'images', label: 'Mosaico de Fotos (2 fotos)', type: 'array', condition: 'visibility.showMedia', itemFields: [ { key: 'imageUrl', label: 'Imagem', type: 'image' } ] }
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

export default function About_V1({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text,
    images = [], stats = [], features = [], buttons = [],
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const isRightAligned = (layout.mediaPosition || 'left') === 'right';
  
  const alignDesktop = layout.align || 'left';
  const alignMobile = layout.alignMobile || 'center';

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
    ${alignMobile === 'center' ? 'items-center text-center' : alignMobile === 'right' ? 'items-end text-right' : 'items-start text-left'}
    ${alignDesktop === 'center' ? 'md:items-center md:text-center' : alignDesktop === 'right' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}
  `;

  const textAlignment = `
    ${alignMobile === 'center' ? 'text-center' : alignMobile === 'right' ? 'text-right' : 'text-left'}
    ${alignDesktop === 'center' ? 'md:text-center' : alignDesktop === 'right' ? 'md:text-right' : 'md:text-left'}
  `;

  const justifyClass = `
    ${alignMobile === 'center' ? 'justify-center' : alignMobile === 'right' ? 'justify-end' : 'justify-start'}
    ${alignDesktop === 'center' ? 'md:justify-center' : alignDesktop === 'right' ? 'md:justify-end' : 'md:justify-start'}
  `;

  const img1 = images[0]?.imageUrl || images[0];
  const img2 = images[1]?.imageUrl || images[1];

  const mediaStyleClass = layout.mediaStyle === 'skew' ? 'rounded-[2rem] -skew-x-3' : 'rounded-[3rem]';

  const badgeDesign = layout.badgeVariant || 'capsule';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className="py-24 md:py-32 px-6 overflow-hidden relative w-full" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${isRightAligned ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* MÍDIA */}
          {visibility.showMedia !== false && (img1 || img2) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              {img1 && img2 ? (
                <div className={`relative w-full aspect-square md:aspect-video lg:aspect-square max-w-xl mx-auto ${layout.mediaStyle === 'skew' ? '-skew-x-3' : ''}`}>
                  <div className={`absolute top-0 ${isRightAligned ? 'left-0' : 'right-0'} w-[70%] h-[75%] overflow-hidden shadow-2xl z-10 border border-white/5 ${mediaStyleClass.replace('-skew-x-3', '')}`}>
                    <img src={img1} alt="About 1" className="w-full h-full object-cover"/>
                  </div>
                  <div className={`absolute bottom-0 ${isRightAligned ? 'right-0' : 'left-0'} w-[55%] h-[55%] overflow-hidden shadow-2xl z-20 border-4 ${mediaStyleClass.replace('-skew-x-3', '')}`} style={{ borderColor: bgColor }}>
                    <img src={img2} alt="About 2" className="w-full h-full object-cover"/>
                  </div>
                </div>
              ) : (
                <div className={`relative overflow-hidden shadow-2xl group max-w-xl mx-auto aspect-square ${mediaStyleClass}`}>
                   <img src={img1 || img2} alt="About Media" className="w-full h-full object-cover"/>
                </div>
              )}
            </motion.div>
          )}

          {/* CONTEÚDO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-full lg:w-1/2 flex flex-col ${textAlignClass}`}
          >
            {/* BADGE ELITE */}
            {visibility.showBadge !== false && badge && (
               <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} className={`mb-6 flex items-center ${justifyClass}`}>
                 {badgeDesign === 'lines' ? (
                    <div className="flex items-center gap-4">
                      {/* Linha Esquerda: Centro ou Direita */}
                      {(alignMobile === 'center' || alignMobile === 'right' || (alignDesktop === 'center' || alignDesktop === 'right')) && (
                        <div className={`h-[1px] w-8 opacity-30 ${alignMobile === 'center' ? 'block' : alignMobile === 'right' ? 'block' : 'hidden'} ${alignDesktop === 'center' ? 'md:block' : alignDesktop === 'right' ? 'md:block' : 'md:hidden'}`} style={{ backgroundColor: accentColor }} />
                      )}
                      
                      <span style={{ color: accentColor, ...badgeFont }} className={`${badgeStyleClasses} tracking-[0.4em]`}>
                          {badge}
                      </span>

                      {/* Linha Direita: Centro ou Esquerda */}
                      {(alignMobile === 'center' || alignMobile === 'left' || (alignDesktop === 'center' || alignDesktop === 'left')) && (
                        <div className={`h-[1px] w-8 opacity-30 ${alignMobile === 'center' ? 'block' : alignMobile === 'left' ? 'block' : 'hidden'} ${alignDesktop === 'center' ? 'md:block' : alignDesktop === 'left' ? 'md:block' : 'md:hidden'}`} style={{ backgroundColor: accentColor }} />
                      )}
                    </div>
                  ) : badgeDesign === 'minimal' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                      <span style={{ color: textColor, ...badgeFont }} className={`${badgeStyleClasses} tracking-[0.2em]`}>
                          {badge}
                      </span>
                    </div>
                  ) : badgeDesign === 'underline' ? (
                    <div className="inline-flex items-center border-b-2 pb-1" style={{ borderColor: accentColor }}>
                      <span style={{ color: textColor, ...badgeFont }} className={`${badgeStyleClasses} tracking-[0.2em]`}>
                          {badge}
                      </span>
                    </div>
                  ) : badgeDesign === 'glass' ? (
                    <span className={`inline-flex items-center px-4 py-2 rounded-full tracking-[0.2em] border border-white/10 bg-white/5 backdrop-blur-md ${badgeStyleClasses}`}
                      style={{ color: textColor, ...badgeFont }}>
                      {badge}
                    </span>
                  ) : (
                    <span className={`inline-flex items-center px-4 py-2 rounded-full tracking-[0.2em] border ${badgeStyleClasses}`}
                      style={{ color: accentColor, borderColor: `${accentColor}44`, backgroundColor: `${accentColor}11`, ...badgeFont }}>
                      {badge}
                    </span>
                  )}
               </motion.div>
            )}

            {/* HEADLINE */}
            {visibility.showHeadline !== false && headline && (
              <h2 
                className={`
                  ${style.headlineSize || 'text-4xl md:text-5xl'} 
                  ${style.headlineWeight || 'font-black'} 
                  ${style.headlineTransform || 'uppercase'} 
                  ${textAlignment}
                  w-full tracking-tighter mb-4 leading-[1.1]
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
                  ${style.subtitleSize || 'text-xl'} 
                  ${style.subtitleWeight || 'font-bold'} 
                  ${style.subtitleTransform || 'normal-case'} 
                  ${textAlignment}
                  w-full mb-6 opacity-90 leading-tight
                `}
                style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
              >
                {renderHighlightedText(subtitle)}
              </p>
            )}

            {/* TEXTO */}
            {visibility.showText !== false && text && (
              <p 
                className={`
                  ${style.textSize || 'text-sm md:text-base'} 
                  ${style.textWeight || 'font-medium'} 
                  ${style.textTransform || 'normal-case'} 
                  ${textAlignment}
                  w-full mb-8 opacity-60 leading-relaxed
                `}
                style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
              >
                {text}
              </p>
            )}

            {/* FEATURES COMPACTOS */}
            {visibility.showFeatures !== false && features.length > 0 && (
              <div className={`flex flex-wrap gap-x-6 gap-y-3 mb-10 w-full ${justifyClass}`}>
                {features.map((feature, i) => {
                  const Icon = LucideIcons[feature.icon] || CheckCircle2;
                  return (
                    <div key={i} className="flex items-center gap-2 shrink-0">
                      <Icon size={16} style={{ color: accentColor }} className="shrink-0" />
                      <span className="text-sm font-bold opacity-80" style={{ color: textColor }}>{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ESTATÍSTICAS */}
            {visibility.showStats !== false && stats.length > 0 && (
              <div className={`flex flex-wrap gap-12 py-8 border-y border-white/5 mb-10 w-full ${justifyClass}`}>
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <p className="text-4xl font-black mb-1" style={{ color: accentColor }}>
                      <CountUp value={stat.value} />
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: textColor }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* BUTTONS */}
            {visibility.showButtons !== false && buttons && buttons.length > 0 && (
              <div className={`flex flex-wrap gap-4 w-full ${justifyClass}`}>
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
