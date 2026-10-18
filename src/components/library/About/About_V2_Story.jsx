"use client";
// src/components/library/About/About_V2_Story.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from '@/lib/lucide-shim';
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
  variant: 'v2',
  label: 'História e Valores (v2)',
  defaultData: {
    badge: 'Our Journey',
    headline: 'Uma {História} de Compromisso',
    subtitle: 'Valores que guiam cada projeto e transformam visões em realidade.',
    text: 'Nossa trajetória é marcada pela busca incessante da perfeição técnica e satisfação total dos nossos clientes.',
    features: [
      { text: 'Inovação', description: 'Sempre à frente com novas tecnologias.', icon: 'Sparkles', overlayOpacity: 0.6 },
      { text: 'Excelência', description: 'Precisão em cada detalhe do projeto.', icon: 'Trophy', overlayOpacity: 0.6 }
    ],
    stats: [
      { value: '10+', label: 'Anos' },
      { value: '100%', label: 'Qualidade' }
    ],
    buttons: [
      { label: 'Começar Agora', url: '#', variant: 'primary', design: 'rounded-xl', size: 'md' }
    ],
    layout: { 
      align: 'center', 
      alignMobile: 'center',
      badgeVariant: 'capsule',
      overlayOpacity: 0.8 
    },
    visibility: {
      showBadge: true,
      showHeadline: true,
      showSubtitle: true,
      showText: true,
      showStats: true,
      showFeatures: true,
      showButtons: true
    },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      badgeSize: 'text-[10px]',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
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
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'align' },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'align' },
      { key: 'layout.overlayOpacity', label: 'Opacidade do Fundo Global', type: 'range', min: 0, max: 1, step: 0.05, default: 0.8 }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      ...commonBadge('Badge', 'Selo Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      ...commonElement('Text', 'Descrição Narrativa', { type: 'textarea', prefix: 'text', isBody: true }),
      { key: 'bgImage', label: 'Imagem de Fundo (Seção)', type: 'image' },
      {
        type: 'group',
        label: 'Diferenciais (Cards)',
        fields: [
          { key: 'visibility.showFeatures', label: 'Habilitar Cards', type: 'toggle' },
          { key: 'features', label: 'Lista de Cards', type: 'array', condition: 'visibility.showFeatures', itemFields: [ 
            { key: 'icon', label: 'Ícone (Lucide)', type: 'select', options: [
              { value: 'Sparkles', label: 'Brilho' },
              { value: 'Trophy', label: 'Troféu' },
              { value: 'Target', label: 'Alvo' },
              { value: 'Zap', label: 'Raio' },
              { value: 'ShieldCheck', label: 'Escudo' },
              { value: 'Globe', label: 'Globo' },
              { value: 'Clock', label: 'Relógio' },
              { value: 'Users', label: 'Pessoas' }
            ]},
            { key: 'text', label: 'Título', type: 'text' }, 
            { key: 'description', label: 'Descrição', type: 'textarea' }, 
            { key: 'imageUrl', label: 'Ícone em Imagem (Opcional)', type: 'image' },
            { key: 'bgImage', label: 'Foto de Fundo do Card', type: 'image' },
            { key: 'overlayOpacity', label: 'Opacidade do Card', type: 'range', min: 0, max: 1, step: 0.05, default: 0.6 },
            { key: 'url', label: 'Link do Card (#)', type: 'text' }
          ] }
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

export default function About_V2_Story({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text,
    features = [], buttons = [], bgImage, stats = [],
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  const overlayOpacity = layout.overlayOpacity !== undefined ? layout.overlayOpacity : 0.8;

  const alignDesktop = layout.align || 'center';
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

  const marginClass = `
    ${alignMobile === 'center' ? 'mx-auto' : alignMobile === 'right' ? 'ml-auto mr-0' : 'mr-auto ml-0'}
    ${alignDesktop === 'center' ? 'md:mx-auto' : alignDesktop === 'right' ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}
  `;

  const badgeDesign = layout.badgeVariant || 'capsule';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className="py-32 px-6 overflow-hidden relative min-h-[80vh] flex items-center" style={{ backgroundColor: bgColor }}>
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
        
        {/* CABEÇALHO */}
        <div className={`w-full flex flex-col mb-20 ${textAlignClass}`}>
            
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

            {visibility.showHeadline !== false && headline && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                className={`
                  ${style.headlineSize || 'text-4xl md:text-6xl'} 
                  ${style.headlineWeight || 'font-black'} 
                  ${style.headlineTransform || 'uppercase'}
                  ${textAlignment}
                  w-full tracking-tighter mb-4 leading-[1.1]
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
                viewport={{ once: true }} 
                transition={{ delay: 0.1 }} 
                className={`
                  ${style.subtitleSize || 'text-xl md:text-2xl'} 
                  ${style.subtitleWeight || 'font-bold'} 
                  ${textAlignment}
                  ${marginClass}
                  w-full mb-6 opacity-90 leading-relaxed max-w-3xl
                `} 
                style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
              >
                {renderHighlightedText(subtitle)}
              </motion.p>
            )}
            {visibility.showText !== false && text && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.2 }} 
                className={`text-sm md:text-lg opacity-60 leading-relaxed font-medium w-full ${textAlignment} ${marginClass} max-w-3xl`}
                style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
              >
                {text.split('\n').map((p, idx) => <p key={idx} className="mb-4">{p}</p>)}
              </motion.div>
            )}
        </div>

        {/* STATS COMPACTOS */}
        {visibility.showStats !== false && stats.length > 0 && (
          <div className={`flex flex-wrap gap-12 mb-20 w-full ${justifyClass}`}>
             {stats.map((stat, i) => (
               <div key={i} className={`flex flex-col ${textAlignClass}`}>
                  <p className="text-5xl font-black mb-1" style={{ color: accentColor }}><CountUp value={stat.value} /></p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50" style={{ color: textColor }}>{stat.label}</p>
               </div>
             ))}
          </div>
        )}

        {/* CARDS ELITE UPGRADED */}
        {visibility.showFeatures !== false && features.length > 0 && (
          <div className={`flex flex-wrap gap-6 mb-20 w-full ${justifyClass}`}>
            {features.map((feature, i) => {
                const Icon = LucideIcons[feature.icon] || CheckCircle2;
                const cardOverlay = feature.overlayOpacity !== undefined ? feature.overlayOpacity : 0.6;
                const isLink = !!feature.url;
                
                const CardWrapper = isLink ? 'a' : 'div';
                const wrapperProps = isLink ? { href: feature.url } : {};

                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full sm:w-[350px]"
                  >
                    <CardWrapper
                      {...wrapperProps}
                      className={`relative bg-zinc-900/50 border border-white/5 p-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 group flex flex-col min-h-[380px] h-full ${textAlignClass} ${isLink ? 'hover:border-accent/40 hover:scale-[1.02]' : 'hover:bg-white/10'}`}
                      style={{ borderColor: isLink ? `${accentColor}44` : undefined }}
                    >
                      {/* BACKGROUND DO CARD */}
                      {feature.bgImage && (
                        <div className="absolute inset-0 z-0">
                          <img src={feature.bgImage} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black" style={{ opacity: cardOverlay }} />
                        </div>
                      )}

                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center bg-black/40 mb-8 group-hover:scale-110 transition-transform overflow-hidden p-0 ${alignMobile === 'center' ? 'mx-auto' : alignMobile === 'right' ? 'ml-auto' : 'mr-auto'} ${alignDesktop === 'center' ? 'md:mx-auto' : alignDesktop === 'right' ? 'md:ml-auto' : 'md:mr-auto'}`}>
                          {feature.imageUrl ? (
                              <img src={feature.imageUrl} alt={feature.text} className="w-full h-full object-cover" />
                          ) : (
                              <Icon size={32} style={{ color: accentColor }} />
                          )}
                        </div>
                        <h3 className={`text-2xl font-black mb-4 w-full tracking-tighter ${textAlignment}`} style={{ color: textColor }}>{feature.text}</h3>
                        {feature.description && (
                          <p className={`text-sm opacity-50 leading-relaxed font-medium w-full ${textAlignment}`} style={{ color: textColor }}>{feature.description}</p>
                        )}
                        
                        {isLink && (
                          <div className={`mt-auto pt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${justifyClass}`} style={{ color: accentColor }}>
                            Saiba Mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    </CardWrapper>
                  </motion.div>
                );
            })}
          </div>
        )}

        {/* BUTTONS PADRONIZADOS */}
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
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
