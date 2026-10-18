"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
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
      { key: 'layout.itemOrientation', label: 'Orientação do Item', type: 'select', options: [
        { value: 'column', label: 'Empilhado (Nº em cima)' },
        { value: 'row', label: 'Lado a Lado (Nº na esquerda)' }
      ]},
      { key: 'layout.gridCols', label: 'Colunas (Desktop)', type: 'select', options: [
        { value: 'lg:grid-cols-1', label: '1 Coluna' },
        { value: 'lg:grid-cols-2', label: '2 Colunas' },
        { value: 'lg:grid-cols-3', label: '3 Colunas' },
        { value: 'lg:grid-cols-4', label: '4 Colunas' },
        { value: 'lg:grid-cols-5', label: '5 Colunas' },
        { value: 'lg:grid-cols-6', label: '6 Colunas' }
      ]},
      { key: 'layout.align', label: 'Alinhamento Global', type: 'align' },
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
      { type: 'section', label: 'Números e Estatísticas' },
      { 
        key: 'items', 
        label: 'Lista de Números', 
        type: 'array', 
        itemFields: [
          { key: 'value', label: 'Valor (Ex: 500+)', type: 'text' }, 
          { key: 'label', label: 'Legenda', type: 'text' },
          { key: 'customColor', label: 'Cor Customizada', type: 'color' }
        ] 
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Estética' },
      { key: 'style.showDividers', label: 'Linhas Divisórias', type: 'toggle' },
      { type: 'section', label: 'Estilo dos Números' },
      ...commonTypographyFields('style.value', { prefix: 'value' }).map(f => ({ ...f, label: `Nº - ${f.label}` })),
      ...commonTypographyFields('style.label', { isBody: true, prefix: 'label' }).map(f => ({ ...f, label: `Legenda - ${f.label}` })),
      ...commonFineTuning[0].fields
    ]
  }
];

export const metadata = {
  type: 'stats',
  variant: 'v1',
  label: 'Impact Numbers (v1)',
  defaultData: {
    badge: 'Our Impact',
    headline: 'Resultados que {Falam} por Nós',
    subtitle: 'Métricas reais de quem constrói o futuro com precisão e compromisso.',
    items: [
      { value: '500+', label: 'Projetos Concluídos', customColor: '' },
      { value: '15+', label: 'Anos de Experiência', customColor: '' },
      { value: '100%', label: 'Satisfação Garantida', customColor: '' },
      { value: '250', label: 'Mestres de Obra', customColor: '' }
    ],
    layout: { itemOrientation: 'column', align: 'center', gridCols: 'lg:grid-cols-4', paddingY: 'py-20 md:py-32', badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      showAmbientLight: true,
      showDividers: false,
      badgeSize: 'text-[10px]',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'normal-case',
      subtitleSize: 'text-lg md:text-xl',
      subtitleWeight: 'font-normal',
      subtitleTransform: 'normal-case',
      valueSize: 'text-5xl md:text-7xl',
      valueWeight: 'font-black',
      valueTransform: 'normal-case',
      labelSize: 'text-[10px] md:text-xs',
      labelWeight: 'font-black',
      labelTransform: 'uppercase'
    }
  }
};

export const schema = statsSchema;

export default function Stats_V1({ data }) {
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

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  }[align];

  const itemAlignClasses = isRow 
    ? (align === 'right' ? 'flex-row-reverse items-center justify-start gap-6' : 'flex-row items-center justify-start gap-6')
    : cn("flex-col", {
        'items-start text-left': align === 'left',
        'items-center text-center': align === 'center',
        'items-end text-right': align === 'right'
      });

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
          <div className={cn("flex flex-col mb-20 max-w-4xl", alignClasses)}>
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
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-y-16", layout.gridCols || 'lg:grid-cols-4', style.showDividers ? 'gap-x-0' : 'gap-x-12')}>
          {items.map((item, idx) => {
            const itemColor = item.customColor || accentColor;
            const isNotLast = idx < items.length - 1;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "flex group relative", 
                  itemAlignClasses,
                  style.showDividers && "px-10"
                )}
              >
                {/* Vertical Divider */}
                {style.showDividers && isNotLast && (
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-[1px] opacity-10 hidden lg:block" 
                    style={{ backgroundColor: textColor }}
                  />
                )}

                <div 
                  className={cn(
                    "tracking-tighter transition-all duration-700 group-hover:scale-110 group-hover:brightness-125 shrink-0",
                    style.valueSize || 'text-5xl md:text-7xl',
                    style.valueWeight || 'font-black',
                    style.valueTransform || 'normal-case',
                    isRow ? 'mb-0' : 'mb-4'
                  )}
                  style={{ color: itemColor, fontFamily: style.valueFont || 'inherit' }}
                >
                  <CountUp value={item.value} />
                </div>
                
                <div 
                  className={cn(
                    "opacity-40 group-hover:opacity-100 transition-all duration-500 tracking-[0.2em]",
                    style.labelSize || 'text-[10px] md:text-xs',
                    style.labelWeight || 'font-black',
                    style.labelTransform || 'uppercase',
                    isRow ? 'max-w-[120px] text-left leading-tight' : 'w-full'
                  )}
                  style={{ color: textColor, fontFamily: style.labelFont || 'inherit' }}
                >
                  {item.label}
                </div>

                {/* Subtle decoration bar (only for column mode) */}
                {!isRow && (
                  <div 
                    className={cn(
                      "w-8 h-1 mt-6 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700",
                      align === 'left' ? 'group-hover:w-16' : align === 'right' ? 'group-hover:w-16' : 'group-hover:w-16 mx-auto'
                    )}
                    style={{ backgroundColor: itemColor }}
                  />
                )}
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
