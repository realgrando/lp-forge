"use client";
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from '@/lib/lucide-shim';
import { commonFineTuning, commonButtonFields, commonTypographyFields, commonElement, commonBadge } from '../Common/SchemaProps';

const heroSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.fullHeight', label: 'Ocupar Tela Cheia (Sobrepor Header)', type: 'toggle' },
      { key: 'layout.align', label: 'Alinhamento Desktop', type: 'align' },
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
      { type: 'section', label: 'Mídia de Fundo' },
      { key: 'bgImage', label: 'Imagem de Background', type: 'image' },
      { key: 'layout.overlayOpacity', label: 'Opacidade do Overlay', type: 'range', min: 0, max: 1, step: 0.1 }
    ]
  }
];

export const metadata = {
  type: 'hero',
  variant: 'v1',
  label: 'Hero Elegante (v1)',
  defaultData: {
    badge: 'Premium Excellence',
    headline: 'Construindo o {Futuro} com Qualidade Técnica',
    subtitle: 'Soluções em Drywall e Pintura para Projetos de Alto Padrão.',
    text: 'Nossa equipe especializada entrega precisão e acabamento superior em cada metro quadrado trabalhado.',
    buttons: [
      { label: 'Solicitar Orçamento', url: '#contact', variant: 'primary', design: 'rounded-xl', size: 'md' },
      { label: 'Ver Projetos', url: '#gallery', variant: 'outline', design: 'rounded-xl', size: 'md' }
    ],
    layout: { align: 'center', fullHeight: true, overlayOpacity: 0.6, showScroll: true, badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true, showText: true, showButtons: true },
    style: { 
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#000000',
      badgeSize: 'text-[10px] md:text-xs',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-5xl md:text-7xl',
      headlineWeight: 'font-black',
      headlineTransform: 'uppercase',
      subtitleSize: 'text-xl md:text-3xl',
      subtitleWeight: 'font-bold',
      subtitleTransform: 'normal-case',
      textSize: 'text-sm md:text-lg',
      textWeight: 'font-medium',
      textTransform: 'normal-case'
    }
  }
};

export const schema = heroSchema;

export default function Hero_V1({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, text, 
    bgImage, buttons = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#000000';
  const overlayOpacity = layout.overlayOpacity !== undefined ? layout.overlayOpacity : 0.6;
  
  const isFull = layout.fullHeight;
  const sectionClass = 'min-h-svh flex flex-col';
  const headerClearance = isFull ? 'pt-32 lg:pt-48' : 'pt-0';
  const contentPadding = 'py-12 lg:py-20';

  const alignClass = layout.align === 'left' 
    ? 'text-left items-start mr-auto' 
    : layout.align === 'right' 
      ? 'text-right items-end ml-auto' 
      : 'text-center items-center mx-auto';

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
    
    return (
      <div className={`flex flex-wrap gap-4 mt-10 ${layout.align === 'left' ? 'justify-start' : layout.align === 'right' ? 'justify-end' : 'justify-center'}`}>
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

  const badgeDesign = layout.badgeVariant || 'capsule';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className={`relative overflow-hidden flex flex-col ${sectionClass}`}>
      
      {/* 1. SE NÃO FOR FULL, CRIAMOS O VAZIO DO HEADER AQUI (SEM COR) */}
      {!isFull && <div className="h-20 lg:h-[80px] w-full shrink-0" />}

      {/* 2. O CORPO DO HERO COM SUA PRÓPRIA COR E IMAGEM */}
      <div className={`relative flex-1 flex items-center w-full`} style={{ backgroundColor: bgColor }}>
        
        {/* BACKGROUND LAYER - Restrito ao corpo do Hero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            {bgImage && (
            <>
                <img src={bgImage} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity }} />
            </>
            )}
        </div>

        {/* CONTENT - Agora alinhado perfeitamente com o container do Header */}
        <div className={`container mx-auto px-6 relative z-10 ${contentPadding}`}>
            <div className={`max-w-4xl flex flex-col ${alignClass}`}>
            
            {visibility.showBadge !== false && badge && (
                <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} className="mb-8 text-zinc-100">
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
                    className={`inline-flex items-center px-4 py-2 rounded-full tracking-[0.2em] border border-white/10 bg-white/5 backdrop-blur-md ${badgeStyleClasses}`}
                    style={{ color: textColor, ...badgeFont }}
                    >
                    {badge}
                    </span>
                ) : (
                    <span 
                    className={`inline-flex items-center px-4 py-2 rounded-full tracking-[0.2em] border ${badgeStyleClasses}`}
                    style={{ color: accentColor, borderColor: `${accentColor}44`, backgroundColor: `${accentColor}11`, ...badgeFont }}
                    >
                    {badge}
                    </span>
                )}
                </motion.div>
            )}

            {visibility.showHeadline !== false && headline && (
                <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`
                    ${style.headlineSize || 'text-5xl md:text-7xl'} 
                    ${style.headlineWeight || 'font-black'} 
                    ${style.headlineTransform || 'uppercase'} 
                    tracking-tighter mb-2 leading-[0.95]
                `}
                style={{ color: textColor, fontFamily: style.headlineFont || 'inherit' }}
                >
                {renderHighlightedText(headline)}
                </motion.h1>
            )}

            {visibility.showSubtitle !== false && subtitle && (
                <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`
                    ${style.subtitleSize || 'text-xl md:text-3xl'} 
                    ${style.subtitleWeight || 'font-bold'} 
                    ${style.subtitleTransform || 'normal-case'} 
                    mb-10 opacity-90 leading-tight max-w-2xl
                `}
                style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
                >
                {renderHighlightedText(subtitle)}
                </motion.p>
            )}

            {visibility.showText !== false && text && (
                <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`
                    ${style.textSize || 'text-sm md:text-lg'} 
                    ${style.textWeight || 'font-medium'} 
                    ${style.textTransform || 'normal-case'} 
                    mb-0 opacity-60 leading-relaxed max-w-xl
                `}
                style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
                >
                {text}
                </motion.p>
            )}

            {renderButtons()}
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
