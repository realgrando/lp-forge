"use client";
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Search, ArrowUpRight } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { commonFineTuning } from '../Common/SchemaProps';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const metadata = {
  type: 'testimonials',
  variant: 'v3',
  label: 'Google Reviews (v3)',
  defaultData: {
    badge: 'Google Reviews',
    headline: 'Nossa {Reputação} no Google',
    googleStats: { rating: '4.9', reviews: '128' },
    items: [
      { name: 'Alex Johnson', text: 'Top tier service!', rating: '5', date: 'há 2 dias' }
    ],
    layout: { align: 'between', columns: '3' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.align', label: 'Alinhamento Header', type: 'align' },
      { key: 'layout.columns', label: 'Colunas', type: 'select', options: [
        { value: '2', label: '2 Colunas' },
        { value: '3', label: '3 Colunas' },
        { value: '4', label: '4 Colunas' }
      ]}
    ]
  },
  {
    group: '2. Conteúdo Google',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge Google', type: 'toggle', default: true },
      { key: 'visibility.showHeadline', label: 'Mostrar Título', type: 'toggle', default: true },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea', condition: 'visibility.showHeadline' },
      { key: 'visibility.showSubtitle', label: 'Mostrar Subtítulo', type: 'toggle', default: true },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', condition: 'visibility.showSubtitle' },
      { key: 'googleStats.rating', label: 'Nota Google', type: 'text' },
      { key: 'googleStats.reviews', label: 'Total Avaliações', type: 'text' },
      { key: 'items', label: 'Avaliações', type: 'array', itemFields: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'text', label: 'Comentário', type: 'textarea' },
        { key: 'image', label: 'Foto (Avatar)', type: 'image' },
        { key: 'rating', label: 'Estrelas (1-5)', type: 'select', options: [
          { value: '5', label: '5 Estrelas' },
          { value: '4', label: '4 Estrelas' },
          { value: '3', label: '3 Estrelas' }
        ]},
        { key: 'date', label: 'Data/Tempo', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Testimonials_V3_Google({ data }) {
  if (!data) return null;

  // Seguindo EXATAMENTE a estrutura de dados do Hero_V1.jsx e DNA de Elite
  const { 
    badge,
    headline, 
    title,
    subtitle, 
    items = [], 
    googleStats = { rating: "4.9", reviews: "128" },
    layout = {}, 
    visibility = {}, 
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  
  // Fallback para headline/title
  const mainTitle = headline || title;

  // DNA UNIFICADO: Função para processar o destaque no texto {exemplo}
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

  // DNA UNIFICADO: Estilos de Headline
  const headlineClasses = cn(
    "text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8",
    style.headlineWeight || 'font-black',
    style.headlineGradient ? 'text-transparent bg-clip-text' : ''
  );

  const headlineStyle = {
    color: style.headlineGradient ? 'transparent' : textColor,
    backgroundImage: style.headlineGradient 
      ? `linear-gradient(to right, ${textColor}, ${accentColor})` 
      : 'none'
  };

  // Lógica de alinhamento do Header
  const headerAlignClass = layout.align === 'center' 
    ? 'flex-col items-center text-center mx-auto' 
    : layout.align === 'right' 
      ? 'flex-col md:flex-row-reverse items-center text-right' 
      : 'flex-col md:flex-row items-center text-left';

  const textAlignClass = layout.align === 'center' ? 'text-center' : layout.align === 'right' ? 'text-right' : 'text-left';

  const gridCols = layout.columns === '2' ? 'md:grid-cols-2' : layout.columns === '4' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden" 
      style={{ backgroundColor: style.customBg || 'transparent' }}
    >
      {/* Background Decor - Micro Ambiance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[150px] rounded-full opacity-10" style={{ backgroundColor: accentColor }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] blur-[120px] rounded-full opacity-5" style={{ backgroundColor: accentColor }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header Style Google Elite */}
        <div className={`flex justify-between mb-24 gap-12 ${headerAlignClass}`}>
          <div className={cn("max-w-3xl flex flex-col", layout.align === 'center' ? 'items-center' : layout.align === 'right' ? 'items-end' : 'items-start')}>
            
            {/* BADGE GOOGLE ELITE */}
            {visibility.showBadge !== false && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border mb-10 backdrop-blur-xl shadow-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-inner">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badge || "Google Reviews"}</span>
              </motion.div>
            )}

            {visibility.showHeadline !== false && mainTitle && (
              <h2 className={headlineClasses} style={headlineStyle}>
                {renderHighlightedText(mainTitle, true)}
              </h2>
            )}

            {visibility.showSubtitle !== false && subtitle && (
              <p className="text-lg md:text-xl font-medium leading-relaxed opacity-60" style={{ color: textColor }}>
                {renderHighlightedText(subtitle)}
              </p>
            )}
          </div>

          {/* Google Summary Card Elite */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-10 rounded-[3rem] border flex flex-col items-center md:items-start gap-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] shrink-0 backdrop-blur-2xl transition-all hover:scale-105 duration-500 group"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 50}`} alt="User" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white">+</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-black" style={{ color: textColor }}>{googleStats.rating}</span>
                <div className="flex gap-1" style={{ color: accentColor }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40" style={{ color: textColor }}>
                {googleStats.reviews} avaliações verificadas
              </p>
            </div>
            
            <div className="w-full h-px bg-white/5" />
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60" style={{ color: textColor }}>Atualizado hoje</span>
            </div>
          </motion.div>
        </div>

        {/* Grid de Reviews Elite */}
        <div className={`grid gap-8 ${gridCols}`}>
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-2xl shrink-0">
                    <img src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-black leading-tight uppercase tracking-tight" style={{ color: textColor }}>{item.name}</h4>
                    <div className="flex items-center gap-1.5 mt-1">
                       <CheckCircle2 size={12} className="text-blue-500 fill-blue-500/10" />
                       <span className="text-[10px] opacity-40 font-black uppercase tracking-tighter" style={{ color: textColor }}>Local Guide</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5" style={{ color: accentColor }}>
                   {[...Array(5)].map((_, star) => (
                     <Star key={star} size={14} fill={star < (parseInt(item.rating) || 5) ? "currentColor" : "none"} strokeWidth={3} className={cn("transition-all", star < (parseInt(item.rating) || 5) ? "opacity-100" : "opacity-20")} />
                   ))}
                </div>
              </div>

              <blockquote className="flex-grow mb-10">
                <p className="text-lg md:text-xl leading-relaxed font-medium italic opacity-80" style={{ color: textColor }}>
                  "{item.text || "Excelente serviço, recomendo a todos!"}"
                </p>
              </blockquote>

              <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30" style={{ color: textColor }}>{item.date || "há 1 semana"}</span>
                  <div className="flex items-center gap-2">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Maps_icon_%282020%29.svg" className="h-3" alt="G" />
                     <span className="text-[9px] font-black opacity-20 uppercase tracking-widest" style={{ color: textColor }}>Google Maps</span>
                  </div>
                </div>
                <motion.div 
                  whileHover={{ rotate: 45, scale: 1.2 }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer"
                  style={{ color: accentColor }}
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button Elite */}
        <div className="mt-24 text-center">
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="relative px-16 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all overflow-hidden group border border-white/10 shadow-3xl"
             style={{ 
               backgroundColor: 'rgba(255,255,255,0.02)',
               color: textColor
             }}
           >
             <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-all" />
             <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-500 flex items-center gap-4 mx-auto">
               Ver Todas no Google <Search size={16} style={{ color: accentColor }} />
             </span>
           </motion.button>
        </div>
      </div>
    </section>
  );
}
