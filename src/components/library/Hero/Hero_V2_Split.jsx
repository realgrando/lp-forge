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
      { key: 'layout.align', label: 'Lado do Texto (Desktop)', type: 'select', options: [{value: 'left', label: 'Texto na Esquerda'}, {value: 'right', label: 'Texto na Direita'}] },
      { key: 'layout.alignMobile', label: 'Alinhamento Texto (Mobile)', type: 'select', options: [{value: 'left', label: 'Esquerda'}, {value: 'center', label: 'Centro'}, {value: 'right', label: 'Direita'}] },
      { key: 'layout.reverse', label: 'Ordem no Mobile', type: 'select', options: [{value: false, label: 'Texto primeiro'}, {value: true, label: 'Imagem primeiro'}] },
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
      { key: 'style.customBg', label: 'Cor de Fundo da Seção', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' },
      { type: 'section', label: 'Mídia de Destaque' },
      { key: 'image', label: 'Imagem Lateral', type: 'image' },
      { key: 'style.imageBorderRadius', label: 'Arredondamento da Imagem', type: 'select', options: [
        { value: 'rounded-none', label: 'Quadrado' },
        { value: 'rounded-2xl', label: 'Suave' },
        { value: 'rounded-[3rem]', label: 'Extra Arredondado' },
        { value: 'rounded-full', label: 'Círculo/Oval' }
      ]}
    ]
  }
];

export const metadata = {
  type: 'hero',
  variant: 'v2',
  label: 'Destaque Lado a Lado (v2)',
  defaultData: {
    badge: 'Inovação & Design',
    headline: "Transformando ideias em {resultados} digitais",
    subtitle: "Soluções sob medida para o crescimento do seu negócio.",
    text: "Nossa metodologia combina design estratégico e tecnologia de ponta para entregar experiências únicas.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    buttons: [
      { label: "Começar Agora", variant: "primary", url: "#", design: 'rounded-xl', size: 'md' },
      { label: "Saiba Mais", variant: "outline", url: "#", design: 'rounded-xl', size: 'md' }
    ],
    layout: { align: 'left', alignMobile: 'center', reverse: false, fullHeight: true, badgeVariant: 'capsule', showScroll: true },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true, showText: true, showButtons: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      imageBorderRadius: 'rounded-[3rem]',
      badgeSize: 'text-[10px] md:text-xs',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'normal-case',
      subtitleSize: 'text-lg md:text-2xl',
      subtitleWeight: 'font-bold',
      subtitleTransform: 'normal-case',
      textSize: 'text-base md:text-lg',
      textWeight: 'font-medium',
      textTransform: 'normal-case'
    }
  }
};

export const schema = heroSchema;

export default function Hero_V2_Split({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text, image, 
    buttons = [], layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  
  const isFull = layout.fullHeight;
  const isRight = layout.align === 'right';
  const sectionClass = 'min-h-svh flex flex-col';
  const headerClearance = isFull ? 'pt-32 lg:pt-48' : 'pt-0';
  const contentPadding = 'py-12 lg:py-20';

  const alignMobileClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }[layout.alignMobile || 'center'];

  const alignDesktopClasses = isRight ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left';

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

    const justifyDesktop = isRight ? 'lg:justify-end' : 'lg:justify-start';

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`flex flex-wrap gap-4 mt-10 ${justifyMobile} ${justifyDesktop}`}
      >
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
      </motion.div>
    );
  };

  const badgeDesign = layout.badgeVariant || 'capsule';
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
           <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />
        </div>

        {/* CONTENT */}
        <div className={`container mx-auto px-6 relative z-10 ${contentPadding} ${headerClearance}`}>
            <div className={`flex flex-col lg:flex-row items-center gap-16 ${isRight ? 'lg:flex-row-reverse' : ''} ${layout.reverse ? 'flex-col-reverse' : ''}`}>
            
            {/* TEXT CONTENT */}
            <div className={`flex-1 flex flex-col ${alignMobileClasses} ${alignDesktopClasses} text-zinc-100`}>
                {visibility.showBadge !== false && badge && (
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} className="mb-8">
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
                </motion.div>
                )}

                {visibility.showHeadline !== false && headline && (
                <motion.h1 
                    initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`
                    ${style.headlineSize || 'text-4xl md:text-6xl'} 
                    ${style.headlineWeight || 'font-black'} 
                    ${style.headlineTransform || 'normal-case'} 
                    tracking-tighter mb-6 leading-[0.95]
                    `}
                    style={{ color: textColor, fontFamily: style.headlineFont || 'inherit' }}
                >
                    {renderHighlightedText(headline)}
                </motion.h1>
                )}
                
                {visibility.showSubtitle !== false && subtitle && (
                <motion.p 
                    initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`
                    ${style.subtitleSize || 'text-lg md:text-2xl'} 
                    ${style.subtitleWeight || 'font-bold'} 
                    ${style.subtitleTransform || 'normal-case'} 
                    mb-6 opacity-80 leading-tight
                    `}
                    style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
                >
                    {renderHighlightedText(subtitle)}
                </motion.p>
                )}

                {visibility.showText !== false && text && (
                <motion.p 
                    initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`
                    ${style.textSize || 'text-base md:text-lg'} 
                    ${style.textWeight || 'font-medium'} 
                    ${style.textTransform || 'normal-case'} 
                    opacity-60 leading-relaxed
                    `}
                    style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
                >
                    {text}
                </motion.p>
                )}

                {renderButtons()}
            </div>

            {/* IMAGE CONTENT */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: isRight ? -30 : 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                className="flex-1 w-full"
            >
                <div className="relative">
                <div 
                    className="absolute inset-0 blur-[100px] opacity-20 pointer-events-none" 
                    style={{ backgroundColor: accentColor }} 
                />
                <img 
                    src={image} 
                    alt="Hero Highlight" 
                    className={`relative z-10 w-full shadow-2xl border border-white/5 object-cover ${style.imageBorderRadius || 'rounded-[3rem]'}`}
                />
                </div>
            </motion.div>
            </div>
        </div>
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
