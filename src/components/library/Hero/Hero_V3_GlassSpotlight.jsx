"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from '@/lib/lucide-shim';
import { commonFineTuning, commonButtonFields, commonTypographyFields, commonElement, commonBadge } from '../Common/SchemaProps';

const hexToRgba = (hex, alpha) => {
  if (!hex || hex === 'transparent') return 'transparent';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const heroSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.fullHeight', label: 'Ocupar Tela Cheia (Sobrepor Header)', type: 'toggle' },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'select', options: [{value: 'left', label: 'Esquerda'}, {value: 'center', label: 'Centro'}, {value: 'right', label: 'Direita'}] },
      { key: 'layout.alignMobile', label: 'Alinhamento Mobile', type: 'select', options: [{value: 'left', label: 'Esquerda'}, {value: 'center', label: 'Centro'}, {value: 'right', label: 'Direita'}] },
      { key: 'layout.paddingBottom', label: 'Espaçamento Inferior', type: 'select', options: [{value: 'pb-20 md:pb-32', label: 'Normal'}, {value: 'pb-32 md:pb-48', label: 'Grande'}, {value: 'pb-10 md:pb-16', label: 'Curto'}] },
      { key: 'layout.showScroll', label: 'Indicador de Scroll', type: 'toggle' }
    ]
  },
  {
    group: '2. Conteúdo (Elementos)',
    fields: [
      ...commonBadge('Badge', 'Badge Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      ...commonElement('Text', 'Descrição / Texto Rico', { type: 'textarea', prefix: 'text', isBody: true }),
      { type: 'section', label: 'Botões de Ação' },
      { key: 'visibility.showButtons', label: 'Habilitar Botões', type: 'toggle' },
      { key: 'buttons', label: 'Lista de Botões', type: 'array', itemFields: commonButtonFields, condition: 'visibility.showButtons' }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Pintura e Cores' },
      { key: 'style.customAccent', label: 'Cor de Destaque (Accent)', type: 'color' },
      { key: 'style.customBg', label: 'Cor do Overlay / Fundo', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' },
      { type: 'section', label: 'Mídia e Efeitos' },
      { key: 'bgImage', label: 'Imagem de Background', type: 'image' },
      { key: 'layout.overlayOpacity', label: 'Opacidade do Overlay', type: 'range', min: 0, max: 1, step: 0.1 },
      { key: 'style.showAmbientLight', label: 'Luz de Fundo (Spotlight)', type: 'toggle' }
    ]
  }
];

export const metadata = {
  type: 'hero',
  variant: 'v3',
  label: 'Glass Spotlight (v3)',
  defaultData: {
    badge: 'Luxo & Exclusividade',
    headline: "O futuro da sua marca é {agora}",
    subtitle: "Design de alto impacto com efeito glassmorphism imersivo.",
    text: "Crie uma presença digital inesquecível com nossa tecnologia de renderização em tempo real.",
    bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    buttons: [
      { label: "Começar Projeto", variant: "primary", url: "#", design: 'rounded-xl', size: 'md' }
    ],
    layout: { align: 'center', alignMobile: 'center', fullHeight: true, overlayOpacity: 0.7, paddingBottom: 'pb-20 md:pb-32', badgeVariant: 'glass', showScroll: true },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true, showText: true, showButtons: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#000000',
      showAmbientLight: true,
      badgeSize: 'text-[10px] md:text-xs',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-5xl md:text-7xl',
      headlineWeight: 'font-black',
      headlineTransform: 'uppercase',
      subtitleSize: 'text-xl md:text-3xl',
      subtitleWeight: 'font-medium',
      subtitleTransform: 'normal-case',
      textSize: 'text-base md:text-lg',
      textWeight: 'font-normal',
      textTransform: 'normal-case'
    }
  }
};

export const schema = heroSchema;

export default function Hero_V3_GlassSpotlight({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text, bgImage, 
    buttons = [], layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#000000';
  const overlayOpacity = layout.overlayOpacity !== undefined ? layout.overlayOpacity : 0.7;
  
  const isFull = layout.fullHeight;
  const sectionClass = 'min-h-svh flex flex-col';
  const headerClearance = isFull ? 'pt-32 lg:pt-48' : 'pt-0';
  const contentPadding = 'py-12 lg:py-20';

  const alignMobileClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }[layout.alignMobile || 'center'];

  const alignDesktopClasses = {
    left: 'lg:items-start lg:text-left',
    center: 'lg:items-center lg:text-center',
    right: 'lg:items-end lg:text-right'
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

  const renderButtons = () => {
    if (!visibility.showButtons || !buttons || buttons.length === 0) return null;
    
    const justifyMobile = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    }[layout.alignMobile || 'center'];

    const justifyDesktop = {
        left: 'lg:justify-start',
        center: 'lg:justify-center',
        right: 'lg:justify-end'
    }[layout.align || 'center'];

    return (
      <div className={`flex flex-wrap gap-4 mt-10 ${justifyMobile} ${justifyDesktop}`}>
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
            hover:scale-105 active:scale-95 shadow-2xl
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
    );
  };

  const badgeDesign = layout.badgeVariant || 'glass';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className={`relative overflow-hidden flex flex-col ${sectionClass}`}>
      
      {/* 1. SE NÃO FOR FULL, CRIAMOS O VAZIO DO HEADER AQUI (SEM COR) */}
      {!isFull && <div className="h-20 lg:h-[80px] w-full shrink-0" />}

      {/* 2. O CORPO DO HERO COM SUA PRÓPRIA COR E IMAGEM */}
      <div className={`relative flex-1 flex items-center w-full`} style={{ backgroundColor: bgColor }}>
        
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            {bgImage && (
            <>
                <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity }} />
            </>
            )}
        </div>

        {/* CONTENT */}
        <div className={`container mx-auto px-6 relative z-10 ${contentPadding} ${headerClearance} ${layout.paddingBottom || 'pb-20'}`}>
            <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`
                w-full max-w-5xl mx-auto p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl
                flex flex-col ${alignMobileClasses} ${alignDesktopClasses}
                min-h-[400px] justify-center
            `}
            >
            {visibility.showBadge !== false && badge && (
                <div className="mb-8">
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
                ) : badgeDesign === 'glass' ? (
                    <span 
                    className={`inline-flex items-center px-4 h-7 rounded-full tracking-[0.2em] border border-white/10 bg-white/5 backdrop-blur-md ${badgeStyleClasses}`}
                    style={{ color: textColor, ...badgeFont }}
                    >
                    {badge}
                    </span>
                ) : (
                    <span 
                    className={`inline-flex items-center px-4 h-7 rounded-full tracking-[0.2em] border ${badgeStyleClasses}`}
                    style={{ color: accentColor, borderColor: `${accentColor}44`, backgroundColor: `${accentColor}11`, ...badgeFont }}
                    >
                    {badge}
                    </span>
                )}
                </div>
            )}

            {visibility.showHeadline !== false && headline && (
                <h1 
                className={`
                    ${style.headlineSize || 'text-6xl md:text-8xl'} 
                    ${style.headlineWeight || 'font-black'} 
                    ${style.headlineTransform || 'uppercase'} 
                    tracking-tighter mb-6 leading-[0.95]
                `}
                style={{ color: textColor, fontFamily: style.headlineFont || 'inherit' }}
                >
                {renderHighlightedText(headline)}
                </h1>
            )}
            
            {visibility.showSubtitle !== false && subtitle && (
                <p 
                className={`
                    ${style.subtitleSize || 'text-xl md:text-2xl'} 
                    ${style.subtitleWeight || 'font-medium'} 
                    ${style.subtitleTransform || 'normal-case'} 
                    mb-6 opacity-90 leading-tight max-w-2xl
                `}
                style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
                >
                {renderHighlightedText(subtitle)}
                </p>
            )}

            {visibility.showText !== false && text && (
                <p 
                className={`
                    ${style.textSize || 'text-base md:text-lg'} 
                    ${style.textWeight || 'font-normal'} 
                    ${style.textTransform || 'normal-case'} 
                    opacity-60 leading-relaxed max-w-xl
                `}
                style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
                >
                {text}
                </p>
            )}

            {renderButtons()}
            </motion.div>
        </div>

        {style.showAmbientLight && (
            <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 blur-[150px] rounded-full pointer-events-none" 
            style={{ backgroundColor: accentColor }} 
            />
        )}
      </div>

      {layout.showScroll && (
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-30 pointer-events-none" 
            style={{ color: textColor }}
          >
            <ChevronDown size={32} />
          </motion.div>
      )}
    </section>
  );
}
