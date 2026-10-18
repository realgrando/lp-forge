"use client";
import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from '@/lib/lucide-shim';
import { 
  commonFineTuning, 
  commonTypographyFields, 
  commonElement, 
  commonBadge 
} from '../Common/SchemaProps';

const ICON_MAP = {
  sparkles: LucideIcons.Sparkles,
  target: LucideIcons.Target,
  zap: LucideIcons.Zap,
  shield: LucideIcons.Shield,
  users: LucideIcons.Users,
  award: LucideIcons.Award,
  check: LucideIcons.CheckCircle2,
  message: LucideIcons.MessageSquare,
  calc: LucideIcons.Calculator,
  file: LucideIcons.FileCheck,
  phone: LucideIcons.Phone,
  search: LucideIcons.Search,
  settings: LucideIcons.Settings,
  rocket: LucideIcons.Rocket,
  palette: LucideIcons.Palette,
  wrench: LucideIcons.Wrench
};

const processSchema = [
  {
    group: '1. Estrutura (Blueprint)',
    fields: [
      { key: 'layout.align', label: 'Alinhamento Global', type: 'align' },
      { key: 'layout.variant', label: 'Disposição', type: 'select', options: [
        { value: 'staggered', label: 'Editorial Escalonado' },
        { value: 'list', label: 'Lista Técnica' }
      ]},
      { key: 'layout.showGrid', label: 'Grade de Fundo (Technical Grid)', type: 'toggle' },
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [
        { value: 'py-20 md:py-32', label: 'Normal' },
        { value: 'py-32 md:py-48', label: 'Grande' },
        { value: 'py-48 md:py-64', label: 'Imersivo' }
      ]}
    ]
  },
  {
    group: '2. Conteúdo (Elementos)',
    fields: [
      ...commonBadge('Badge', 'Badge Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      { type: 'section', label: 'Etapas da Narrativa' },
      { 
        key: 'items', 
        label: 'Lista de Etapas', 
        type: 'array', 
        itemFields: [
          { key: 'title', label: 'Título da Etapa', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'icon', label: 'Ícone (Lucide)', type: 'select', options: [
            { value: '', label: 'Nenhum' },
            { value: 'search', label: 'Pesquisa' },
            { value: 'calc', label: 'Orçamento' },
            { value: 'palette', label: 'Design' },
            { value: 'wrench', label: 'Construção' },
            { value: 'rocket', label: 'Lançamento' },
            { value: 'check', label: 'Entrega' }
          ]}
        ] 
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Estética Técnica' },
      { key: 'style.showLines', label: 'Linhas de Conexão (Blueprint)', type: 'toggle' },
      { key: 'style.lineOpacity', label: 'Opacidade das Linhas', type: 'range', min: 0, max: 0.5, step: 0.05 },
      { key: 'style.highContrastNumbers', label: 'Números em Alto Contraste', type: 'toggle' },
      ...commonFineTuning[0].fields
    ]
  }
];

export const metadata = {
  type: 'process',
  variant: 'v3',
  label: 'Editorial Blueprint (v3)',
  defaultData: {
    badge: 'Our technical approach',
    headline: 'Engenharia de {Precisão}',
    subtitle: 'Do conceito à realidade técnica, cada passo é medido e executado com rigor arquitetônico.',
    items: [
      { title: 'Levantamento Técnico', description: 'Mapeamento milimétrico do terreno e viabilidade estrutural.', icon: 'search' },
      { title: 'Projetos Executivos', description: 'Detalhamento técnico completo para execução sem imprevistos.', icon: 'palette' },
      { title: 'Gestão de Obra', description: 'Monitoramento contínuo de recursos, prazos e normas técnicas.', icon: 'wrench' },
      { title: 'Certificação Final', description: 'Vistoria rigorosa e entrega de chaves com garantia de elite.', icon: 'check' }
    ],
    layout: { align: 'left', variant: 'staggered', showGrid: true, paddingY: 'py-32 md:py-48', badgeVariant: 'lines' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      showLines: true,
      lineOpacity: 0.1,
      highContrastNumbers: true,
      showAmbientLight: true,
      badgeSize: 'text-[10px]',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-6xl md:text-9xl',
      headlineWeight: 'font-black',
      headlineTransform: 'uppercase',
      subtitleSize: 'text-xl md:text-2xl',
      subtitleWeight: 'font-medium',
      subtitleTransform: 'normal-case'
    }
  }
};

export const schema = processSchema;

export default function Process_V3_EliteCards({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, items = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

  const align = layout.align || 'left';
  const isStaggered = layout.variant === 'staggered';

  const alignClasses = {
    left: 'text-left items-start border-l-4 pl-8 md:pl-24',
    center: 'text-center items-center mx-auto border-t-4 pt-12 md:pt-16',
    right: 'text-right items-end ml-auto border-r-4 pr-8 md:pr-24'
  }[align];

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

  const badgeDesign = layout.badgeVariant || 'lines';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className={`relative overflow-hidden ${layout.paddingY || 'py-32 md:py-48'}`} style={{ backgroundColor: bgColor }}>
      
      {/* BACKGROUND TECHNICAL GRID */}
      {layout.showGrid && (
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(${textColor} 1px, transparent 1px)`, 
               backgroundSize: '40px 40px' 
             }} 
        />
      )}

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER AREA - Editorial Style */}
        <div className={`flex flex-col mb-32 md:mb-48 transition-all duration-500 max-w-7xl ${alignClasses}`} style={{ borderColor: accentColor }}>
          {visibility.showBadge !== false && badge && (
            <motion.div initial={{ opacity: 0, x: align === 'left' ? -20 : align === 'right' ? 20 : 0, y: align === 'center' ? -20 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} className="mb-6">
                <span style={{ color: accentColor, ...badgeFont }} className={`${badgeStyleClasses} tracking-[0.5em]`}>
                    {badge}
                </span>
            </motion.div>
          )}

          {visibility.showHeadline !== false && headline && (
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`
                ${style.headlineSize || 'text-6xl md:text-9xl'} 
                ${style.headlineWeight || 'font-black'} 
                ${style.headlineTransform || 'uppercase'} 
                tracking-tighter mb-8 leading-[0.8]
              `}
              style={{ color: textColor, fontFamily: style.headlineFont || 'inherit' }}
            >
              {renderHighlightedText(headline)}
            </motion.h2>
          )}

          {visibility.showSubtitle !== false && subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`
                ${style.subtitleSize || 'text-xl md:text-2xl'} 
                ${style.subtitleWeight || 'font-medium'} 
                ${style.subtitleTransform || 'normal-case'} 
                opacity-40 leading-tight max-w-4xl
              `}
              style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
            >
              {renderHighlightedText(subtitle)}
            </motion.p>
          )}
        </div>

        {/* NARRATIVE STEPS - Architectural 12-Column Grid */}
        <div className={`relative ${isStaggered || align === 'center' ? 'space-y-0' : 'space-y-24'}`}>
            
            {/* Dynamic Connecting Lines (Vertical Anchor) */}
            {style.showLines && (
                <div className={`absolute top-0 bottom-0 ${align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'left' ? 'left-0' : 'right-0'} w-[1px] hidden lg:block`} 
                     style={{ backgroundColor: textColor, opacity: style.lineOpacity || 0.1 }} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-32 items-start">
                {items.map((item, idx) => {
                    const Icon = ICON_MAP[item.icon];
                    const isEven = idx % 2 === 0;
                    
                    // DIRECTION LOGIC: No centro, ambos os modos escalonam.
                    let itemDirection = align; 
                    if (align === 'center') {
                        itemDirection = isEven ? 'right' : 'left';
                    }

                    const itemAlignClasses = itemDirection === 'left' ? 'items-start text-left' : 'items-end text-right';

                    // ARCHITECTURAL SPACING LOGIC
                    let itemColClass = "lg:col-span-12"; 
                    
                    if (align === 'center') {
                        // UNIFICADO NO CENTRO: Ambos os modos usam a lógica escalonada (staggered)
                        itemColClass = isEven ? "lg:col-start-1 lg:col-span-5" : "lg:col-start-8 lg:col-span-5 lg:mt-64";
                    } else {
                        if (isStaggered) {
                            // Escalonado Lateral (Assimétrico)
                            itemColClass = isEven ? "lg:col-start-2 lg:col-span-6" : "lg:col-start-6 lg:col-span-6 lg:mt-16";
                        } else {
                            // Lista Lateral (Ordenada)
                            itemColClass = align === 'left' ? "lg:col-start-3 lg:col-span-8" : "lg:col-start-2 lg:col-span-8";
                        }
                    }

                    return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`relative group h-fit ${itemColClass} flex flex-col ${itemAlignClasses} transition-all duration-700`}
                        >
                            {/* Technical Markings */}
                            <div className={`absolute -top-12 ${itemDirection === 'right' ? 'right-0 flex-row-reverse' : 'left-0'} flex items-center gap-4 opacity-20`}>
                                <span className="text-[10px] font-mono tracking-widest" style={{ color: textColor }}>
                                    POS_0{idx + 1}.SYS
                                </span>
                                <div className="h-[1px] w-12" style={{ backgroundColor: textColor }} />
                            </div>

                            <div className={`flex flex-col ${itemAlignClasses} w-full`}>
                                <div className={`flex items-baseline gap-6 mb-8 ${itemDirection === 'right' ? 'flex-row-reverse' : ''}`}>
                                    <span 
                                        className={`
                                            text-7xl md:text-[10rem] font-black italic leading-none
                                            ${style.highContrastNumbers ? 'text-transparent border-b-8' : 'opacity-[0.08]'}
                                        `}
                                        style={{ 
                                            color: style.highContrastNumbers ? 'transparent' : textColor,
                                            WebkitTextStroke: style.highContrastNumbers ? `2px ${textColor}` : 'none',
                                            borderColor: accentColor
                                        }}
                                    >
                                        0{idx + 1}
                                    </span>
                                    {Icon && (
                                        <div className="p-5 border border-white/5 bg-white/5 rounded-full" style={{ color: accentColor }}>
                                            <Icon size={28} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                <div className={`w-full max-w-2xl ${itemAlignClasses}`}>
                                    <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 transition-all group-hover:tracking-normal" style={{ color: textColor }}>
                                        {item.title}
                                    </h4>
                                    <p className={`text-lg font-medium opacity-30 group-hover:opacity-60 transition-opacity duration-500 leading-relaxed border-white/10 ${itemDirection === 'right' ? 'border-r-2 pr-8' : 'border-l-2 pl-8'}`} style={{ color: textColor, borderColor: `${accentColor}44` }}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* HOVER CONNECTION LINE */}
                            <motion.div 
                                className={`
                                    absolute top-1/2 -translate-y-1/2 h-[1px] opacity-0 group-hover:opacity-20 transition-all duration-700 hidden lg:block
                                    ${itemDirection === 'right' ? 'left-full ml-10' : 'right-full mr-10'}
                                `}
                                style={{ 
                                    backgroundColor: accentColor,
                                    width: '100vw'
                                }}
                            />

                            {/* Hover Accent Marker */}
                            <motion.div 
                                className={`absolute ${itemDirection === 'right' ? '-right-10' : '-left-10'} top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                style={{ backgroundColor: accentColor }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
      </div>

      {/* AMBIENT LIGHT */}
      {style.showAmbientLight && (
        <div 
            className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" 
            style={{ backgroundColor: accentColor }} 
        />
      )}
    </section>
  );
}
