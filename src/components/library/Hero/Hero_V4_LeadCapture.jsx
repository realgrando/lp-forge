"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, CheckCircle2, User, MessageSquare, 
  Calculator, FileCheck, Phone, CheckCircle, 
  Zap, Shield, ArrowRight, ArrowDown, ChevronDown 
} from '@/lib/lucide-shim';
import { commonFineTuning, commonTypographyFields, commonElement, commonBadge, commonButtonFields } from '../Common/SchemaProps';

const ICON_MAP = {
  user: User,
  message: MessageSquare,
  calc: Calculator,
  file: FileCheck,
  phone: Phone,
  check: CheckCircle,
  zap: Zap,
  shield: Shield
};

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
      { key: 'layout.align', label: 'Lado do Formulário (Desktop)', type: 'select', options: [
          { value: 'right', label: 'Form na Direita' },
          { value: 'left', label: 'Form na Esquerda' }
      ]},
      { key: 'layout.textAlign', label: 'Alinhamento Conteúdo (Desktop)', type: 'align' },
      { key: 'layout.textAlignMobile', label: 'Alinhamento Conteúdo (Mobile)', type: 'select', options: [
          { value: 'left', label: 'Esquerda' },
          { value: 'center', label: 'Centro' },
          { value: 'right', label: 'Direita' }
      ]},
      { key: 'layout.reverseMobile', label: 'Inverter Ordem (Mobile)', type: 'toggle' },
      { key: 'layout.paddingBottom', label: 'Espaçamento Inferior', type: 'select', options: [
          { value: 'pb-20 md:pb-32', label: 'Normal' },
          { value: 'pb-32 md:pb-48', label: 'Grande' },
          { value: 'pb-10 md:pb-16', label: 'Curto' }
      ]},
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
      {
        type: 'group',
        label: 'Passos do Processo',
        fields: [
            { key: 'visibility.showSteps', label: 'Habilitar Etapas', type: 'toggle' },
            { key: 'layout.stepsDirection', label: 'Direção (Desktop)', type: 'select', condition: 'visibility.showSteps', options: [
                { value: 'col', label: 'Vertical (Coluna)' },
                { value: 'row', label: 'Horizontal (Linha)' }
            ]},
            { key: 'steps', label: 'Lista de Etapas', type: 'array', condition: 'visibility.showSteps', itemFields: [
                { key: 'label', label: 'Título do Passo', type: 'text' },
                { key: 'icon', label: 'Ícone', type: 'select', options: [
                    { value: 'user', label: 'Usuário' },
                    { value: 'message', label: 'Mensagem' },
                    { value: 'calc', label: 'Calculadora' },
                    { value: 'file', label: 'Documento' },
                    { value: 'phone', label: 'Telefone' },
                    { value: 'check', label: 'Concluído' },
                    { value: 'zap', label: 'Rápido/Flash' },
                    { value: 'shield', label: 'Segurança' }
                ]}
            ]}
        ]
      },
      { 
        type: 'group', 
        label: 'Formulário de Captura',
        fields: [
          { key: 'form.title', label: 'Título do Form', type: 'text' },
          { key: 'form.buttonLabel', label: 'Texto do Botão', type: 'text' },
          { key: 'form.placeholderName', label: 'Placeholder Nome', type: 'text' },
          { key: 'form.placeholderEmail', label: 'Placeholder Email', type: 'text' },
          { key: 'form.placeholderMsg', label: 'Placeholder Mensagem', type: 'text' }
        ]
      }
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
  variant: 'v4',
  label: 'Lead Capture (v4)',
  defaultData: {
    badge: 'Fale Conosco',
    headline: "Pronto para elevar seu {projeto}?",
    subtitle: "Capture leads qualificados com um formulário de alta conversão.",
    text: "Preencha as informações abaixo e nossa equipe entrará em contato em menos de 24 horas.",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    form: {
      title: "Solicitar Orçamento",
      buttonLabel: "Enviar Mensagem",
      placeholderName: "Seu nome completo",
      placeholderEmail: "Seu melhor e-mail",
      placeholderMsg: "Conte-nos sobre seu projeto..."
    },
    steps: [
        { label: "Primeiro passo importante", icon: "file" }
    ],
    layout: { align: 'right', textAlign: 'left', textAlignMobile: 'center', reverseMobile: false, paddingBottom: 'pb-20 md:pb-32', fullHeight: true, badgeVariant: 'capsule', stepsDirection: 'col', showScroll: true },
    visibility: { showBadge: true, showHeadline: true, showSubtitle: true, showText: true, showSteps: true },
    style: {
      customAccent: '#EAB308',
      customText: '#ffffff',
      customBg: '#09090b',
      badgeSize: 'text-[10px] md:text-xs',
      badgeWeight: 'font-black',
      badgeTransform: 'uppercase',
      headlineSize: 'text-5xl md:text-7xl',
      headlineWeight: 'font-black',
      headlineTransform: 'normal-case',
      subtitleSize: 'text-xl md:text-3xl',
      subtitleWeight: 'font-bold',
      subtitleTransform: 'normal-case',
      textSize: 'text-lg',
      textWeight: 'font-normal',
      textTransform: 'normal-case'
    }
  }
};

export const schema = heroSchema;

export default function Hero_V4_LeadCapture({ data, globalSocials }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!data) return null;

  const { 
    badge, headline, subtitle, text, bgImage, 
    form = {}, steps = [], layout = {}, visibility = {}, style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const bgColor = style.customBg || '#09090b';
  const overlayOpacity = layout.overlayOpacity !== undefined ? layout.overlayOpacity : 0.6;
  const isRightForm = layout.align === 'right';

  const isFull = layout.fullHeight;
  const sectionClass = 'min-h-svh flex flex-col';
  const headerClearance = isFull ? 'pt-24 lg:pt-32' : 'pt-0';
  const contentPadding = 'py-12 lg:py-20';

  const alignMobileClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  }[layout.textAlignMobile || 'center'];

  const alignDesktopClasses = {
    left: 'lg:items-start lg:text-left',
    center: 'lg:items-center lg:text-center',
    right: 'lg:items-end lg:text-right'
  }[layout.textAlign || 'left'];

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phone = globalSocials?.find(s => s.id === 'whatsapp')?.url || '';
    const cleanPhone = phone.replace(/\D/g, '');
    
    const message = `*NOVA ESTIMATIVA - NIVIX FLEXPAGE*\n\n` +
                    `*Nome:* ${formData.name}\n` +
                    `*Email:* ${formData.email}\n` +
                    `*Mensagem:* ${formData.message}`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

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

  const renderSteps = () => {
    if (!visibility.showSteps || !steps || steps.length === 0) return null;

    const isRow = layout.stepsDirection === 'row';
    const stepJustifyMobile = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    }[layout.textAlignMobile || 'center'];
    const stepJustifyDesktop = {
        left: 'lg:justify-start',
        center: 'lg:justify-center',
        right: 'lg:justify-end'
    }[layout.textAlign || 'left'];

    return (
      <div className={`mt-12 w-full ${isRow ? `flex flex-col md:flex-row flex-wrap gap-x-8 gap-y-8 ${stepJustifyMobile} ${stepJustifyDesktop}` : 'flex flex-col space-y-6'}`}>
        {steps.map((step, idx) => {
          const Icon = ICON_MAP[step.icon] || Zap;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className={`flex items-center gap-5 group ${isRow ? 'md:flex-none min-w-[180px]' : ''}`}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-500 group-hover:scale-110 shadow-xl"
                style={{ backgroundColor: `${accentColor}11`, borderColor: `${accentColor}33`, color: accentColor }}
              >
                <Icon size={24} />
              </div>
              <div className={`flex flex-col text-left overflow-hidden`}>
                <span className="text-[10px] font-black uppercase tracking-[0.1em] opacity-40 mb-1 leading-none">Passo {idx + 1}</span>
                <span className="text-base font-bold text-white uppercase tracking-tight leading-tight">{step.label}</span>
              </div>
              {idx < steps.length - 1 && !isRow && (
                <div className="hidden md:block ml-auto opacity-10">
                   <ArrowDown size={24} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  const badgeDesign = layout.badgeVariant || 'capsule';
  const badgeStyleClasses = `${style.badgeSize || 'text-[10px]'} ${style.badgeWeight || 'font-black'} ${style.badgeTransform || 'uppercase'} leading-none`;
  const badgeFont = { fontFamily: style.badgeFont || 'inherit' };

  return (
    <section className={`relative flex flex-col overflow-hidden ${sectionClass}`}>
      
      {/* 1. SE NÃO FOR FULL, CRIAMOS O VAZIO DO HEADER AQUI (SEM COR) */}
      {!isFull && <div className="h-20 lg:h-[80px] w-full shrink-0" />}

      {/* 2. O CORPO DO HERO COM SUA PRÓPRIA COR E IMAGEM */}
      <div className={`relative flex-1 flex items-center w-full`} style={{ backgroundColor: bgColor }}>
        
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            {bgImage && (
            <>
                <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity || 0.6 }} />
            </>
            )}
            {!bgImage && <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />}
        </div>

        {/* CONTENT */}
        <div className={`container mx-auto px-6 relative z-10 ${contentPadding} ${headerClearance}`}>
            <div className={`
                w-full flex items-center gap-16 lg:gap-32 justify-between
                ${layout.reverseMobile ? 'flex-col-reverse md:flex-row' : 'flex-col md:flex-row'}
                ${isRightForm ? 'md:flex-row' : 'md:flex-row-reverse'}
            `}>
            
            {/* TEXT CONTENT CONTAINER */}
            <div className={`flex-1 w-full flex flex-col ${alignMobileClasses} ${alignDesktopClasses}`}>
                {visibility.showBadge !== false && badge && (
                <div className="mb-10 text-zinc-100">
                    {badgeDesign === 'lines' ? (
                    <div className={`flex items-center gap-4`}>
                        <div className="h-[1px] w-8 opacity-30" style={{ backgroundColor: accentColor }} />
                        <span style={{ color: accentColor, ...badgeFont }} className={`flex items-center ${badgeStyleClasses} tracking-[0.4em]`}>
                        {badge}
                        </span>
                        <div className="h-[1px] w-8 opacity-30" style={{ backgroundColor: accentColor }} />
                    </div>
                    ) : badgeDesign === 'minimal' ? (
                    <div className={`flex items-center gap-2`}>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                        <span style={{ color: textColor, ...badgeFont }} className={`flex items-center ${badgeStyleClasses} tracking-[0.2em]`}>
                        {badge}
                        </span>
                    </div>
                    ) : badgeDesign === 'underline' ? (
                    <div className={`inline-flex items-center border-b-2 pb-1`} style={{ borderColor: accentColor }}>
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
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className={`
                    ${style.headlineSize || 'text-5xl md:text-7xl'} 
                    ${style.headlineWeight || 'font-black'} 
                    ${style.headlineTransform || 'normal-case'} 
                    tracking-tighter mb-8 leading-[0.95]
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
                    transition={{ delay: 0.1 }}
                    className={`
                    ${style.subtitleSize || 'text-xl md:text-3xl'} 
                    ${style.subtitleWeight || 'font-bold'} 
                    ${style.subtitleTransform || 'normal-case'} 
                    mb-10 opacity-80 leading-tight
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
                    transition={{ delay: 0.2 }}
                    className={`
                    ${style.textSize || 'text-lg md:text-xl'} 
                    ${style.textWeight || 'font-normal'} 
                    ${style.textTransform || 'normal-case'} 
                    opacity-60 leading-relaxed
                    `}
                    style={{ color: textColor, fontFamily: style.textFont || 'inherit' }}
                >
                    {text}
                </motion.p>
                )}

                {renderSteps()}
            </div>

            {/* LEAD FORM CONTAINER */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
            >
                <form 
                onSubmit={handleWhatsApp}
                className="bg-white/5 border border-white/10 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] shadow-2xl space-y-8"
                >
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-10">
                    {form.title}
                </h3>
                
                <div className="space-y-5">
                    <input 
                    required
                    type="text" 
                    placeholder={form.placeholderName}
                    className="w-full bg-black/40 border border-white/5 rounded-[1.5rem] p-5 text-base text-white outline-none focus:border-[#EAB308]/50 transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                    required
                    type="email" 
                    placeholder={form.placeholderEmail}
                    className="w-full bg-black/40 border border-white/5 rounded-[1.5rem] p-5 text-base text-white outline-none focus:border-[#EAB308]/50 transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                    <textarea 
                    required
                    placeholder={form.placeholderMsg}
                    rows="4"
                    className="w-full bg-black/40 border border-white/5 rounded-[1.5rem] p-5 text-base text-white outline-none focus:border-[#EAB308]/50 transition-all resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                </div>

                <button 
                    type="submit"
                    disabled={sent}
                    className="w-full py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                    style={{ backgroundColor: sent ? '#22c55e' : accentColor, color: '#000' }}
                >
                    {sent ? (
                    <> <CheckCircle2 size={20} /> Enviado! </>
                    ) : (
                    <> <Send size={20} /> {form.buttonLabel} </>
                    )}
                </button>
                </form>
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
