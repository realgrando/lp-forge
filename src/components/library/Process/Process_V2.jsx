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
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [
        { value: 'py-20 md:py-32', label: 'Normal' },
        { value: 'py-32 md:py-48', label: 'Grande' }
      ]},
      { key: 'layout.showPath', label: 'Mostrar Linha Central', type: 'toggle' }
    ]
  },
  {
    group: '2. Conteúdo (Elementos)',
    fields: [
      ...commonBadge('Badge', 'Badge Superior', { prefix: 'badge' }),
      ...commonElement('Headline', 'Título Principal', { type: 'textarea', prefix: 'headline' }),
      ...commonElement('Subtitle', 'Subtítulo', { type: 'textarea', prefix: 'subtitle' }),
      { type: 'section', label: 'Jornada Vertical' },
      { 
        key: 'items', 
        label: 'Etapas da Jornada', 
        type: 'array', 
        itemFields: [
          { key: 'title', label: 'Título', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'icon', label: 'Ícone', type: 'select', options: [
            { value: '', label: 'Número' },
            { value: 'search', label: 'Pesquisa' },
            { value: 'message', label: 'Conversa' },
            { value: 'calc', label: 'Orçamento' },
            { value: 'file', label: 'Contrato' },
            { value: 'settings', label: 'Produção' },
            { value: 'rocket', label: 'Entrega' }
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
      { type: 'section', label: 'Efeitos' },
      { key: 'style.showAmbientLight', label: 'Luz de Fundo', type: 'toggle' }
    ]
  }
];

export const metadata = {
  type: 'process',
  variant: 'v2',
  label: 'Timeline Alternada (v2)',
  defaultData: {
    badge: 'Step by Step',
    headline: 'Nossa {Metodologia}',
    subtitle: 'Um processo vertical focado em clareza e resultados exponenciais.',
    items: [
      { title: 'Briefing Criativo', description: 'Reunião imersiva para alinhar a alma do seu projeto com nossos processos.', icon: 'message', customColor: '#EAB308' },
      { title: 'Prototipagem', description: 'Desenho da estrutura base com foco total na experiência do usuário final.', icon: 'settings', customColor: '#3b82f6' },
      { title: 'Execução de Elite', description: 'Codificação e design de alta performance aplicados por especialistas.', icon: 'zap', customColor: '#a855f7' },
      { title: 'Suporte & Evolução', description: 'Monitoramento contínuo para garantir que seu projeto nunca pare de crescer.', icon: 'rocket', customColor: '#22c55e' }
    ],
    layout: { paddingY: 'py-20 md:py-32', badgeVariant: 'capsule', showPath: true },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
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

export default function Process_V2({ data }) {
  if (!data) return null;

  const { 
    badge, headline, subtitle, items = [], 
    layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';

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
        
        {/* HEADER AREA - ALWAYS CENTERED IN V2 */}
        <div className={`flex flex-col mb-24 max-w-4xl text-center items-center mx-auto`}>
          {visibility.showBadge !== false && badge && (
            <div className="mb-8 text-zinc-100">
                <span 
                  className={`inline-flex items-center px-4 h-8 rounded-full tracking-[0.2em] border ${badgeStyleClasses}`}
                  style={{ color: accentColor, borderColor: `${accentColor}44`, backgroundColor: `${accentColor}11`, ...badgeFont }}
                >
                  {badge}
                </span>
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

        {/* VERTICAL ALTERNATING JOURNEY */}
        <div className="relative max-w-5xl mx-auto">
            
            {/* CENTRAL PATH LINE */}
            {layout.showPath && (
                <div 
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] opacity-10 hidden md:block"
                    style={{ backgroundColor: accentColor }}
                />
            )}

            <div className="space-y-24 md:space-y-32">
                {items.map((item, idx) => {
                    const Icon = ICON_MAP[item.icon];
                    const itemColor = item.customColor || accentColor;
                    const isEven = idx % 2 === 0;

                    return (
                        <div key={idx} className="relative flex flex-col md:flex-row items-center justify-center">
                            
                            {/* LEFT SIDE (Desktop) */}
                            <motion.div 
                                initial={{ opacity: 0, x: isEven ? -50 : 0 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className={`flex-1 w-full text-center md:text-right md:pr-20 ${!isEven ? 'md:order-3 md:text-left md:pl-20 md:pr-0' : ''}`}
                            >
                                <h4 className="text-3xl font-black uppercase tracking-tight mb-4" style={{ color: textColor }}>
                                    {item.title}
                                </h4>
                                <p className="text-base font-medium opacity-40 leading-relaxed md:max-w-md md:ml-auto" style={{ color: textColor, marginLeft: !isEven ? '0' : 'auto' }}>
                                    {item.description}
                                </p>
                            </motion.div>

                            {/* CENTER MARKER */}
                            <div className="relative z-10 my-8 md:my-0 md:order-2">
                                <motion.div 
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    className="w-20 h-20 rounded-3xl flex items-center justify-center border-4 shadow-2xl relative"
                                    style={{ 
                                        backgroundColor: bgColor, 
                                        borderColor: itemColor,
                                        boxShadow: `0 0 40px ${itemColor}22`
                                    }}
                                >
                                    {Icon ? <Icon size={32} style={{ color: itemColor }} /> : <span className="text-3xl font-black italic" style={{ color: itemColor }}>0{idx + 1}</span>}
                                    
                                    {/* Connection Dots */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-20" />
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-20" />
                                </motion.div>

                                {/* Background Neon Glow */}
                                <div className="absolute inset-0 blur-[60px] opacity-10 pointer-events-none" style={{ backgroundColor: itemColor }} />
                            </div>

                            {/* RIGHT SIDE SPACER (Desktop) */}
                            <div className={`flex-1 hidden md:block ${!isEven ? 'md:order-1' : 'md:order-3'}`} />
                        </div>
                    );
                })}
            </div>
        </div>
      </div>

      {style.showAmbientLight && (
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" 
            style={{ backgroundColor: accentColor }} 
        />
      )}
    </section>
  );
}
