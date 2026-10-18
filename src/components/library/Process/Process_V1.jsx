"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Target, Zap, Shield, Users, 
  Award, CheckCircle2, MessageSquare, Calculator, 
  FileCheck, Phone, Search, Settings, Rocket 
} from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement, commonBadge } from '../Common/SchemaProps';

const ICON_MAP = {
  sparkles: Sparkles,
  target: Target,
  zap: Zap,
  shield: Shield,
  users: Users,
  award: Award,
  check: CheckCircle2,
  message: MessageSquare,
  calc: Calculator,
  file: FileCheck,
  phone: Phone,
  search: Search,
  settings: Settings,
  rocket: Rocket
};

const processSchema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
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
      { type: 'section', label: 'Etapas do Processo' },
      { 
        key: 'items', 
        label: 'Lista de Etapas', 
        type: 'array', 
        itemFields: [
          { key: 'title', label: 'Título da Etapa', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'icon', label: 'Ícone (Opcional)', type: 'select', options: [
            { value: '', label: 'Nenhum (Usar Número)' },
            { value: 'search', label: 'Pesquisa' },
            { value: 'message', label: 'Conversa' },
            { value: 'calc', label: 'Orçamento' },
            { value: 'file', label: 'Contrato' },
            { value: 'settings', label: 'Produção' },
            { value: 'rocket', label: 'Entrega' },
            { value: 'check', label: 'Concluído' }
          ]},
          { key: 'customColor', label: 'Cor da Etapa', type: 'color' }
        ] 
      }
    ]
  },
  {
    group: '3. Ajuste Fino (Elite)',
    fields: [
      { type: 'section', label: 'Pintura e Cores' },
      { key: 'style.customAccent', label: 'Cor de Destaque Global', type: 'color' },
      { key: 'style.customBg', label: 'Cor de Fundo da Seção', type: 'color' },
      { key: 'style.customText', label: 'Cor do Texto Principal', type: 'color' },
      { type: 'section', label: 'Estilo das Etapas' },
      { key: 'style.numberBg', label: 'Fundo das Cápsulas', type: 'color' },
      { key: 'style.showAmbientLight', label: 'Luz de Fundo (Spotlight)', type: 'toggle' }
    ]
  }
];

export const metadata = {
  type: 'process',
  variant: 'v1',
  label: 'Fluxo Linear (v1)',
  defaultData: {
    badge: 'How it works',
    headline: 'Nosso {Processo} de Trabalho',
    subtitle: 'Uma jornada clara e eficiente da concepção à entrega final.',
    items: [
      { title: 'Consulta Inicial', description: 'Entendemos suas necessidades e objetivos para traçar o melhor plano.', icon: 'search', customColor: '#EAB308' },
      { title: 'Desenvolvimento', description: 'Execução técnica com foco em qualidade e cumprimento de prazos.', icon: 'settings', customColor: '#3b82f6' },
      { title: 'Entrega Final', description: 'Revisão minuciosa e entrega do projeto com excelência garantida.', icon: 'rocket', customColor: '#22c55e' }
    ],
    layout: { align: 'center', paddingY: 'py-20 md:py-32', badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      numberBg: '#18181b',
      showAmbientLight: true,
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

export const schema = processSchema;

export default function Process_V1({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, items = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  const numberBg = style.numberBg || '#18181b';

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
        <div className={`flex flex-col mb-24 max-w-4xl ${alignClasses}`}>
          {visibility.showBadge !== false && badge && (
            <div className="mb-8 text-zinc-100">
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

        {/* PROCESS STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative">
          {/* Connecting Line (Desktop) */}
          <div 
            className="hidden md:block absolute top-12 left-0 w-full h-[1px] opacity-10" 
            style={{ backgroundColor: accentColor }} 
          />
          
          {items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon];
            const itemColor = item.customColor || accentColor;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Capsule */}
                <div 
                  className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 relative transition-all duration-500 group-hover:scale-110 shadow-2xl border-4 overflow-hidden"
                  style={{ 
                    backgroundColor: numberBg, 
                    borderColor: bgColor,
                    outline: `1px solid rgba(255,255,255,0.05)`
                  }}
                >
                  {Icon ? (
                    <Icon size={32} style={{ color: itemColor }} className="relative z-10" />
                  ) : (
                    <span className="text-4xl font-black italic tracking-tighter relative z-10" style={{ color: itemColor }}>
                        0{idx + 1}
                    </span>
                  )}
                  
                  {/* Subtle Background Glow for each step */}
                  <div className="absolute inset-0 opacity-10 blur-xl" style={{ backgroundColor: itemColor }} />
                </div>

                <div className="space-y-2">
                    <h4 className="text-2xl font-black uppercase tracking-tight" style={{ color: textColor }}>
                    {item.title}
                    </h4>
                    <p className="text-sm font-medium leading-relaxed opacity-40 max-w-[280px] mx-auto" style={{ color: textColor }}>
                    {item.description}
                    </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {style.showAmbientLight && (
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" 
            style={{ backgroundColor: accentColor }} 
        />
      )}
    </section>
  );
}
