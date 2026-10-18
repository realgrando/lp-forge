"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Star, Shield, HardHat, 
  Truck, Clock, Hammer, Paintbrush, 
  Droplets, Zap, Ruler, Users, Sparkles, Target, Award
} from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement, commonBadge, commonButtonFields } from '../Common/SchemaProps';

const ICON_MAP = {
  check: CheckCircle2,
  star: Star,
  shield: Shield,
  hardhat: HardHat,
  truck: Truck,
  clock: Clock,
  hammer: Hammer,
  paintbrush: Paintbrush,
  droplets: Droplets,
  zap: Zap,
  ruler: Ruler,
  users: Users,
  sparkles: Sparkles,
  target: Target,
  award: Award
};

const featuresSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.columns', label: 'Colunas (Desktop)', type: 'select', options: [
        { value: 'grid-cols-1 lg:grid-cols-2', label: '2 Colunas' },
        { value: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', label: '3 Colunas' },
        { value: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4', label: '4 Colunas' }
      ]},
      { key: 'layout.align', label: 'Alinhamento Cabeçalho', type: 'align' },
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
      { type: 'section', label: 'Lista de Diferenciais' },
      { 
        key: 'items', 
        label: 'Cards de Diferenciais', 
        type: 'array', 
        itemFields: [
          { key: 'title', label: 'Título do Card', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'icon', label: 'Ícone', type: 'select', options: [
            { value: 'check', label: 'Check' },
            { value: 'star', label: 'Estrela' },
            { value: 'shield', label: 'Escudo' },
            { value: 'zap', label: 'Raio' },
            { value: 'clock', label: 'Relógio' },
            { value: 'users', label: 'Equipe' },
            { value: 'sparkles', label: 'Premium' },
            { value: 'target', label: 'Foco' },
            { value: 'award', label: 'Troféu' },
            { value: 'hardhat', label: 'Obra' }
          ]}
        ] 
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Pintura e Cores' },
      { key: 'style.customAccent', label: 'Cor de Destaque (Accent)', type: 'color' },
      { key: 'style.customBg', label: 'Cor de Fundo da Seção', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' },
      { type: 'section', label: 'Estilo dos Cards' },
      { key: 'style.cardBg', label: 'Cor de Fundo dos Cards', type: 'color' },
      { key: 'style.cardBorder', label: 'Habilitar Bordas', type: 'toggle' }
    ]
  }
];

export const metadata = {
  type: 'features',
  variant: 'v1',
  label: 'Grade de Diferenciais (v1)',
  defaultData: {
    badge: 'Nossos Diferenciais',
    headline: 'Por que escolher a {Nivix}?',
    subtitle: 'Entregamos excelência técnica e compromisso com o prazo em cada projeto.',
    items: [
      { title: 'Qualidade Premium', description: 'Acabamento superior utilizando materiais de primeira linha.', icon: 'sparkles' },
      { title: 'Equipe Especializada', description: 'Profissionais treinados e certificados para alta performance.', icon: 'users' },
      { title: 'Entrega no Prazo', description: 'Gestão eficiente para garantir que seu cronograma seja respeitado.', icon: 'clock' }
    ],
    layout: { columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', align: 'center', paddingY: 'py-20 md:py-32', badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      cardBg: '#18181b',
      cardBorder: true,
      badgeSize: 'text-[10px] md:text-xs',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-4xl md:text-6xl',
      headlineWeight: 'font-black',
      headlineTransform: 'normal-case',
      subtitleSize: 'text-lg md:text-xl',
      subtitleWeight: 'font-normal',
      subtitleTransform: 'normal-case'
    }
  }
};

export const schema = featuresSchema;

export default function Features_V1({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, items = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  const cardBg = style.cardBg || '#18181b';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end'
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

  const badgeDesign = layout.badgeVariant || 'capsule';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className={`relative overflow-hidden ${layout.paddingY || 'py-20 md:py-32'}`} style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER AREA */}
        <div className={`flex flex-col mb-20 max-w-4xl ${alignClasses}`}>
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
              ) : (
                <span 
                  className={`inline-flex items-center px-4 h-8 rounded-full tracking-[0.2em] border ${badgeStyleClasses}`}
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
                opacity-60 leading-relaxed max-w-2xl
              `}
              style={{ color: textColor, fontFamily: style.subtitleFont || 'inherit' }}
            >
              {renderHighlightedText(subtitle)}
            </motion.p>
          )}
        </div>

        {/* FEATURES GRID */}
        <div className={`grid gap-8 ${layout.columns || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || CheckCircle2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`
                  p-10 rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden
                  ${style.cardBorder ? 'border border-white/5 hover:border-white/10' : ''}
                `}
                style={{ backgroundColor: cardBg }}
              >
                {/* CARD ACCENT GLOW */}
                <div 
                    className="absolute -right-10 -top-10 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full" 
                    style={{ backgroundColor: accentColor }} 
                />

                <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-2xl border"
                    style={{ backgroundColor: `${accentColor}11`, borderColor: `${accentColor}22`, color: accentColor }}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
