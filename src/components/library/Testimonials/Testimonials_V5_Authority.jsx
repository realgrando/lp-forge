"use client";
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Trophy, Users } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { commonFineTuning } from '../Common/SchemaProps';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const metadata = {
  type: 'testimonials',
  variant: 'v5',
  label: 'Authority Wall (v5)',
  defaultData: {
    badge: 'Industry Authority',
    headline: 'Líderes de Mercado {Confiam} em Nós',
    proof: { count: '+500', label: 'Clientes Premium', text: 'Empresas de elite.' },
    items: [{ name: 'Steve Jobs', role: 'Visionary', text: 'Insanely great.' }],
    layout: { align: 'left' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.align', label: 'Alinhamento Header', type: 'align' }
    ]
  },
  {
    group: '2. Conteúdo Authority',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge Authority', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'visibility.showHeadline', label: 'Mostrar Título', type: 'toggle', default: true },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea', condition: 'visibility.showHeadline' },
      { key: 'visibility.showSubtitle', label: 'Mostrar Subtítulo', type: 'toggle', default: true },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', condition: 'visibility.showSubtitle' },
      { key: 'visibility.showProofCard', label: 'Mostrar Card Social Proof', type: 'toggle', default: true },
      { key: 'proof.count', label: 'Número Proof (ex: +500)', type: 'text', condition: 'visibility.showProofCard' },
      { key: 'proof.label', label: 'Rótulo Proof (ex: Clientes)', type: 'text', condition: 'visibility.showProofCard' },
      { key: 'proof.text', label: 'Texto Auxiliar Proof', type: 'text', condition: 'visibility.showProofCard' },
      { key: 'proof.seedOffset', label: 'Semente Avatares (Nº)', type: 'text', condition: 'visibility.showProofCard' },
      { key: 'items', label: 'Depoimentos Impacto', type: 'array', itemFields: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'role', label: 'Cargo', type: 'text' },
        { key: 'text', label: 'Mensagem', type: 'textarea' },
        { key: 'image', label: 'Avatar', type: 'image' },
        { key: 'rating', label: 'Estrelas (1-5)', type: 'select', options: [
          { value: '5', label: '5 Estrelas' },
          { value: '4', label: '4 Estrelas' },
          { value: '3', label: '3 Estrelas' },
          { value: 'none', label: 'Sem Estrelas' }
        ]}
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Testimonials_V5_Authority({ data }) {
  if (!data) return null;

  const { 
    badge,
    headline, 
    subtitle, 
    items = [], 
    layout = {}, 
    visibility = {}, 
    style = {},
    proof = {}
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';

  const renderHighlightedText = (text, isHeadline = false) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const content = part.slice(1, -1);
        return (
          <span 
            key={i} 
            className={style.headlineGradient && isHeadline ? '' : 'brightness-125'}
            style={{ color: style.headlineGradient && isHeadline ? 'inherit' : accentColor }}
          >
            {content}
          </span>
        );
      }
      return part;
    });
  };

  const headlineClasses = cn(
    style.headlineSize || "text-5xl md:text-8xl",
    style.headlineWeight || "font-black",
    "tracking-tighter leading-[0.85] mb-8 uppercase",
    style.headlineGradient ? 'text-transparent bg-clip-text' : ''
  );

  const headlineStyle = {
    color: style.headlineGradient ? 'transparent' : textColor,
    backgroundImage: style.headlineGradient 
      ? `linear-gradient(to bottom right, ${textColor}, ${accentColor})` 
      : 'none'
  };

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden" 
      style={{ backgroundColor: style.customBg || '#000000' }}
    >
      {/* Background Decor - Unique Geometric Identity */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] blur-[180px] rounded-full opacity-10" style={{ backgroundColor: accentColor }} />
      </div>

      <div className="container mx-auto max-w-[1400px] relative z-10">
        
        {/* AUTHORITY SPLIT LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start">
          
          {/* LEFT SIDE: INFRASTRUCTURE & SOCIAL PROOF */}
          <div className="w-full lg:w-[45%] sticky lg:top-32">
            {visibility.showBadge !== false && badge && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
              >
                <Trophy size={20} style={{ color: accentColor }} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: accentColor }}>{badge}</span>
              </motion.div>
            )}

            {visibility.showHeadline !== false && headline && (
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={headlineClasses} 
                style={headlineStyle}
              >
                {renderHighlightedText(headline, true)}
              </motion.h2>
            )}

            {visibility.showSubtitle !== false && subtitle && (
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={cn(
                  style.subtitleSize || "text-2xl",
                  "font-medium max-w-xl opacity-40 leading-snug mb-16"
                )}
                style={{ color: textColor }}
              >
                {renderHighlightedText(subtitle)}
              </motion.p>
            )}

            {/* INTEGRATED SOCIAL PROOF CARD - LEFT */}
            {visibility.showProofCard !== false && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group shadow-2xl"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex -space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-14 h-14 rounded-2xl border-4 border-black overflow-hidden bg-zinc-800 shadow-xl">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + (proof.seedOffset || 99)}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-2xl font-black" style={{ color: textColor }}>{proof.count || "+500"}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: textColor }}>{proof.label || "Clientes Premium"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                  <Users size={16} style={{ color: accentColor }} />
                  <span className="text-xs font-bold opacity-60" style={{ color: textColor }}>{proof.text || "Líderes de mercado que confiam em nós."}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT SIDE: THE WALL OF IMPACT */}
          <div className="w-full lg:w-[55%] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col h-full hover:bg-white/[0.06] transition-all duration-500 group relative"
              >
                <Quote className="absolute top-6 right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity" size={60} style={{ color: accentColor }} />
                
                {/* RATING */}
                {item.rating !== 'none' && (
                  <div className="flex gap-1 mb-8" style={{ color: accentColor }}>
                    {[...Array(5)].map((_, star) => (
                      <Star key={star} size={14} fill={star < (parseInt(item.rating) || 5) ? "currentColor" : "none"} strokeWidth={3} className={star < (parseInt(item.rating) || 5) ? "opacity-100" : "opacity-10"} />
                    ))}
                  </div>
                )}

                <blockquote className="flex-grow mb-10 relative z-10">
                  <p className="text-lg leading-relaxed font-bold italic" style={{ color: textColor }}>
                    "{item.text || "A precisão e qualidade técnica superaram tudo o que já vimos antes no mercado."}"
                  </p>
                </blockquote>

                <div className="flex items-center gap-4 pt-8 border-t border-white/5 mt-auto">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all">
                      <img src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name + i}`} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-black leading-tight uppercase tracking-tight" style={{ color: textColor }}>{item.name}</h4>
                    <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em] block mt-0.5" style={{ color: textColor }}>{item.role || "Director"}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
