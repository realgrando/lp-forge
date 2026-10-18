"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Shield, Users, Award, CheckCircle2, ArrowRight } from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement, commonBadge, commonButtonFields } from '../Common/SchemaProps';

const ICON_MAP = {
  sparkles: Sparkles,
  target: Target,
  zap: Zap,
  shield: Shield,
  users: Users,
  award: Award,
  check: CheckCircle2
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
      { type: 'section', label: 'Cards de Imagem' },
      { 
        key: 'items', 
        label: 'Lista de Cards', 
        type: 'array', 
        itemFields: [
          { key: 'title', label: 'Título', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'image', label: 'Imagem de Destaque', type: 'image' },
          { key: 'icon', label: 'Ícone', type: 'select', options: [
            { value: 'sparkles', label: 'Premium' },
            { value: 'target', label: 'Foco' },
            { value: 'zap', label: 'Rápido' },
            { value: 'shield', label: 'Seguro' },
            { value: 'users', label: 'Equipe' },
            { value: 'award', label: 'Qualidade' },
            { value: 'check', label: 'Check' }
          ]},
          { type: 'section', label: 'Call to Action' },
          { key: 'showButton', label: 'Habilitar Botão', type: 'toggle' },
          { key: 'buttonLabel', label: 'Texto do Botão', type: 'text', condition: 'showButton' },
          { key: 'buttonUrl', label: 'URL do Botão', type: 'text', condition: 'showButton' }
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
      { key: 'style.showAmbientLight', label: 'Luz de Fundo (Spotlight)', type: 'toggle' }
    ]
  }
];

export const metadata = {
  type: 'features',
  variant: 'v3',
  label: 'Cards com Imagem (v3)',
  defaultData: {
    badge: 'Galeria de Elite',
    headline: 'Abordagem focada em {resultados}',
    subtitle: 'Combinamos estética premium com funcionalidade técnica superior.',
    items: [
      { title: 'Design Moderno', description: 'Visual limpo e profissional para sua marca.', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1541888081622-3cb5562cb08e?auto=format&fit=crop&q=80&w=600', showButton: true, buttonLabel: 'Ver Projetos', buttonUrl: '#' },
      { title: 'Materiais Nobres', description: 'Durabilidade garantida com os melhores insumos.', icon: 'award', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=600', showButton: true, buttonLabel: 'Especificações', buttonUrl: '#' },
      { title: 'Engenharia de Ponta', description: 'Execução técnica precisa em cada detalhe.', icon: 'zap', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600', showButton: true, buttonLabel: 'Saber Mais', buttonUrl: '#' }
    ],
    layout: { columns: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', align: 'center', paddingY: 'py-20 md:py-32', badgeVariant: 'capsule' },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      cardBg: '#18181b',
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

export const schema = featuresSchema;

export default function Features_V3_ImageCards({ data }) {
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

        {/* IMAGE CARDS GRID */}
        <div className={`grid gap-8 ${layout.columns || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Award;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-[3rem] overflow-hidden flex flex-col h-full shadow-2xl border border-white/5"
                style={{ backgroundColor: cardBg }}
              >
                {/* IMAGE AREA */}
                {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* ICON OVER IMAGE */}
                        <div 
                            className="absolute bottom-6 left-8 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-500 group-hover:scale-110 shadow-2xl"
                            style={{ backgroundColor: `${accentColor}33`, borderColor: `${accentColor}55`, color: accentColor }}
                        >
                            <Icon size={28} />
                        </div>
                    </div>
                )}
                
                {/* CONTENT AREA */}
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black tracking-tighter mb-4 text-white uppercase italic">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity mb-8">
                    {item.description}
                  </p>

                  {item.showButton && item.buttonUrl && (
                    <div className="mt-auto">
                        <a 
                            href={item.buttonUrl}
                            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:gap-5"
                            style={{ color: accentColor }}
                        >
                            {item.buttonLabel || 'Saiba Mais'}
                            <ArrowRight size={16} />
                        </a>
                    </div>
                  )}

                  {!item.showButton && (
                    <div 
                        className="mt-auto h-[2px] w-12 transition-all duration-500 group-hover:w-full opacity-30" 
                        style={{ backgroundColor: accentColor }} 
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {style.showAmbientLight && (
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 blur-[150px] rounded-full pointer-events-none" 
            style={{ backgroundColor: accentColor }} 
        />
      )}
    </section>
  );
}
