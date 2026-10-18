"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import * as LucideIcons from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  commonFineTuning, 
  commonTypographyFields, 
  commonElement, 
  commonBadge 
} from '../Common/SchemaProps';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
  }, [value, duration]);
  
  return <span ref={ref}>{display}</span>;
};

const statsSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.align', label: 'Posicionamento Global', type: 'align' },
      { key: 'layout.itemOrientation', label: 'Orientação Interna', type: 'select', options: [
        { value: 'column', label: 'Vertical (Padrão)' },
        { value: 'row', label: 'Horizontal (Lado a Lado)' }
      ]},
      { key: 'layout.gridCols', label: 'Colunas (Desktop)', type: 'select', options: [
        { value: 'lg:grid-cols-2', label: '2 Colunas' },
        { value: 'lg:grid-cols-3', label: '3 Colunas' },
        { value: 'lg:grid-cols-4', label: '4 Colunas' },
        { value: 'lg:grid-cols-5', label: '5 Colunas' }
      ]},
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
      { type: 'section', label: 'Cards de Autoridade' },
      { 
        key: 'items', 
        label: 'Lista de Stats', 
        type: 'array', 
        itemFields: [
          { key: 'value', label: 'Valor (Ex: 500+)', type: 'text' }, 
          { key: 'label', label: 'Legenda', type: 'text' },
          { key: 'icon', label: 'Ícone (Lucide)', type: 'text' },
          { key: 'customColor', label: 'Cor Customizada', type: 'color' }
        ] 
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Estilo dos Números' },
      ...commonTypographyFields('style.value', { prefix: 'value' }).map(f => ({ ...f, label: `Nº - ${f.label}` })),
      ...commonTypographyFields('style.label', { isBody: true, prefix: 'label' }).map(f => ({ ...f, label: `Legenda - ${f.label}` })),
      ...commonFineTuning[0].fields
    ]
  }
];

export const metadata = {
  type: 'stats',
  variant: 'v2',
  label: 'Authority Grid (v2)',
  defaultData: {
    badge: 'Our Authority',
    headline: 'Construindo {Confiança} com Dados',
    subtitle: 'Reconhecimento técnico e métricas que comprovam nossa liderança no mercado.',
    items: [
      { value: '250', label: 'Projetos de Elite', icon: 'Award', customColor: '' },
      { value: '15', label: 'Prêmios Design', icon: 'Trophy', customColor: '' },
      { value: '10k+', label: 'M2 Construídos', icon: 'Construction', customColor: '' },
      { value: '100%', label: 'Prazos Cumpridos', icon: 'Clock', customColor: '' }
    ],
    layout: { align: 'center', itemOrientation: 'column', gridCols: 'lg:grid-cols-4', paddingY: 'py-20 md:py-32', badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      showAmbientLight: true,
      badgeSize: 'text-[10px]',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'normal-case',
      subtitleSize: 'text-lg md:text-xl',
      subtitleWeight: 'font-normal',
      subtitleTransform: 'normal-case',
      valueSize: 'text-5xl md:text-6xl',
      valueWeight: 'font-black',
      valueTransform: 'normal-case',
      labelSize: 'text-[10px] md:text-xs',
      labelWeight: 'font-black',
      labelTransform: 'uppercase'
    }
  }
};

export const schema = statsSchema;

export default function Stats_V2_AuthorityGrid({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, items = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const align = layout.align || 'center';
  const isRow = layout.itemOrientation === 'row';

  // Alinhamento do cabeçalho da seção
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  }[align];

  // Posicionamento do CARD dentro da coluna (Movimenta o bloco)
  const cardPositionClass = {
    left: 'justify-self-start',
    center: 'justify-self-center',
    right: 'justify-self-end'
  }[align];

  // ALINHAMENTO INTERNO: Sempre centralizado como solicitado
  const itemInternalClasses = isRow 
    ? 'flex-row items-center justify-center gap-6 text-center'
    : 'flex-col items-center justify-center text-center';

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
    <section className={cn("relative overflow-hidden w-full", layout.paddingY || 'py-20 md:py-32')} style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER AREA */}
        {(visibility.showBadge || visibility.showHeadline || visibility.showSubtitle) && (
          <div className={cn("flex flex-col mb-24 max-w-4xl", alignClasses)}>
            {visibility.showBadge !== false && badge && (
              <div className="mb-6">
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
                  <span className={`inline-flex items-center px-4 py-2 rounded-full tracking-[0.2em] border border-white/10 bg-white/5 backdrop-blur-md ${badgeStyleClasses}`}
                    style={{ color: textColor, ...badgeFont }}>
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
                  opacity-50 leading-relaxed max-w-2xl
                `}
                style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
              >
                {renderHighlightedText(subtitle)}
              </motion.p>
            )}
          </div>
        )}

        {/* STATS GRID */}
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 w-full", layout.gridCols || 'lg:grid-cols-4')}>
          {items.map((item, idx) => {
            const IconComponent = LucideIcons[item.icon] || LucideIcons.Trophy;
            const itemColor = item.customColor || accentColor;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex transition-all duration-500 shadow-2xl relative overflow-hidden w-full max-w-sm",
                  cardPositionClass,
                  itemInternalClasses
                )}
              >
                {/* Floating Icon */}
                <div 
                  className={cn(
                    "w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0",
                    isRow ? 'mb-0' : 'mb-8'
                  )}
                  style={{ color: itemColor }}
                >
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>

                <div className={cn("flex flex-col items-center", isRow ? 'flex-1' : 'w-full')}>
                    <div 
                    className={cn(
                        "tracking-tighter transition-all duration-700 group-hover:brightness-125",
                        style.valueSize || 'text-5xl md:text-6xl',
                        style.valueWeight || 'font-black',
                        style.valueTransform || 'normal-case',
                        isRow ? 'mb-0' : 'mb-2'
                    )}
                    style={{ color: textColor, fontFamily: style.valueFont || 'inherit' }}
                    >
                    <CountUp value={item.value} />
                    </div>
                    
                    <div 
                    className={cn(
                        "opacity-30 group-hover:opacity-100 transition-all duration-500 tracking-[0.2em]",
                        style.labelSize || 'text-[10px] md:text-xs',
                        style.labelWeight || 'font-black',
                        style.labelTransform || 'uppercase'
                    )}
                    style={{ color: textColor, fontFamily: style.labelFont || 'inherit' }}
                    >
                    {item.label}
                    </div>
                </div>

                {/* Card Background Decoration */}
                <div 
                  className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-32 h-32 blur-[60px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                  style={{ backgroundColor: itemColor }} 
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" 
            style={{ backgroundColor: accentColor }} 
        />
      )}
    </section>
  );
}
