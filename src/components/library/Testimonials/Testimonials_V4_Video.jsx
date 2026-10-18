"use client";
import { motion } from 'framer-motion';
import { Play, Quote, Star, ArrowRight } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { commonFineTuning } from '../Common/SchemaProps';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const metadata = {
  type: 'testimonials',
  variant: 'v4',
  label: 'Vídeo Depoimentos (v4)',
  defaultData: {
    badge: 'Video Success',
    headline: 'Resultados em {Vídeo}',
    items: [
      { name: 'Michael Ross', role: 'Partner', text: 'Amazing!', videoThumb: '' }
    ],
    layout: { align: 'center' },
    style: {}
  }
};

export const schema = [
  {
    group: '1. Estrutura (Layout)',
    fields: [
      { key: 'layout.align', label: 'Alinhamento Global', type: 'align' }
    ]
  },
  {
    group: '2. Conteúdo Vídeo',
    fields: [
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'badge', label: 'Texto da Badge', type: 'text', condition: 'visibility.showBadge' },
      { key: 'visibility.showHeadline', label: 'Mostrar Título', type: 'toggle', default: true },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea', condition: 'visibility.showHeadline' },
      { key: 'visibility.showSubtitle', label: 'Mostrar Subtítulo', type: 'toggle', default: true },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', condition: 'visibility.showSubtitle' },
      { key: 'items', label: 'Vídeos', type: 'array', itemFields: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'role', label: 'Cargo', type: 'text' },
        { key: 'text', label: 'Depoimento Curto', type: 'textarea' },
        { key: 'image', label: 'Foto Perfil', type: 'image' },
        { key: 'videoThumb', label: 'Thumb do Vídeo', type: 'image' },
        { key: 'videoUrl', label: 'Link do Vídeo', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function Testimonials_V4_Video({ data }) {
  if (!data) return null;

  const { 
    badge,
    headline, 
    title,
    subtitle, 
    items = [], 
    layout = {}, 
    visibility = {}, 
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const mainTitle = headline || title;

  const renderHighlightedText = (text, isHeadline = false) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const content = part.slice(1, -1);
        return (
          <span key={i} className={style.headlineGradient && isHeadline ? '' : 'brightness-125'} style={{ color: style.headlineGradient && isHeadline ? 'inherit' : accentColor }}>
            {content}
          </span>
        );
      }
      return part;
    });
  };

  const headlineClasses = cn(
    "text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8",
    style.headlineGradient ? 'text-transparent bg-clip-text' : ''
  );

  const headlineStyle = {
    color: style.headlineGradient ? 'transparent' : textColor,
    backgroundImage: style.headlineGradient ? `linear-gradient(to bottom right, ${textColor}, ${accentColor})` : 'none'
  };

  const textAlignClass = layout.align === 'center' ? 'text-center items-center mx-auto' : layout.align === 'right' ? 'text-right items-end ml-auto' : 'text-left items-start mr-auto';

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-black" style={{ backgroundColor: style.customBg || '#000' }}>
      {/* Cinematic Background Light */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] blur-[180px] rounded-full" style={{ backgroundColor: `${accentColor}15` }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={cn("flex flex-col mb-32", textAlignClass)}>
          {visibility.showBadge !== false && badge && (
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] font-black uppercase tracking-[0.5em] mb-6" style={{ color: accentColor }}>
              {badge}
            </motion.span>
          )}
          {visibility.showHeadline !== false && mainTitle && (
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className={headlineClasses} style={headlineStyle}>
              {renderHighlightedText(mainTitle, true)}
            </motion.h2>
          )}
          {visibility.showSubtitle !== false && subtitle && (
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xl md:text-2xl font-light opacity-40 max-w-3xl italic" style={{ color: textColor }}>
              {renderHighlightedText(subtitle)}
            </motion.p>
          )}
        </div>

        <div className="space-y-48">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-100px" }} className={cn("flex flex-col lg:flex-row items-center gap-16 lg:gap-32", i % 2 === 1 ? "lg:flex-row-reverse" : "")}>
              {/* VIDEO SIDE - Cinematic Framing */}
              <div className="w-full lg:w-3/5 group cursor-pointer">
                <div className="relative aspect-[16/9] rounded-[1rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <img src={item.videoThumb || "https://images.unsplash.com/photo-1492691523567-6170f0295db6?q=80&w=1200"} alt={item.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700" />
                  
                  {/* Minimal Play UI */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <Play size={32} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Exclusive Interview</span>
                  </div>
                </div>
              </div>

              {/* TEXT SIDE - Typographic Focus */}
              <div className="w-full lg:w-2/5 flex flex-col items-start">
                <div className="flex gap-1 mb-8" style={{ color: accentColor }}>
                  {[...Array(5)].map((_, s) => <Star key={s} size={16} fill="currentColor" />)}
                </div>

                <blockquote className="mb-10 relative">
                  <Quote size={80} className="absolute -top-12 -left-8 opacity-5" style={{ color: accentColor }} />
                  <p className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tight italic" style={{ color: textColor }}>
                    "{item.text || "This partnership redefined how we handle our global operations."}"
                  </p>
                </blockquote>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                    <img src={item.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tighter" style={{ color: textColor }}>{item.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30" style={{ color: textColor }}>{item.role || "Executive Director"}</p>
                  </div>
                </div>

                <div className="mt-12 w-16 h-1" style={{ backgroundColor: accentColor }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
