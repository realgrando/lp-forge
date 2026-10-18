"use client";
import { motion } from 'framer-motion';
import { Utensils, ArrowUpRight } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'menu',
  variant: 'v2',
  label: 'Grid com Fotos (v2)',
  defaultData: {
    headline: 'Nossa {Seleção} Gourmet',
    categories: [{ name: 'Pratos Principais', items: [{ name: 'Pizza Elite', price: 'R$ 80', description: 'Artesanal.', imageUrl: '' }] }],
    style: {}
  }
};

export const schema = [
  { 
    group: '2. Conteúdo', 
    fields: [ 
      { key: 'visibility.showBadge', label: 'Mostrar Badge', type: 'toggle', default: true },
      { key: 'visibility.showHeadline', label: 'Mostrar Título', type: 'toggle', default: true },
      { key: 'headline', label: 'Título {Destaque}', type: 'text', condition: 'visibility.showHeadline' }, 
      { key: 'visibility.showSubtitle', label: 'Mostrar Subtítulo', type: 'toggle', default: true },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea', condition: 'visibility.showSubtitle' },
      { key: 'categories', label: 'Categorias do Menu', type: 'array', itemFields: [
        { key: 'name', label: 'Nome da Categoria', type: 'text' },
        { key: 'items', label: 'Itens', type: 'array', itemFields: [
          { key: 'name', label: 'Nome do Prato', type: 'text' },
          { key: 'price', label: 'Preço', type: 'text' },
          { key: 'description', label: 'Descrição', type: 'textarea' },
          { key: 'imageUrl', label: 'Foto do Prato', type: 'image' },
          { key: 'tags', label: 'Tags (ex: Vegan)', type: 'array', itemFields: [{ key: 'tag', label: 'Tag', type: 'text' }] }
        ]}
      ]}
    ] 
  },
  ...commonFineTuning
];

export default function Menu_V2({ data }) {
  if (!data) return null;

  const { 
    headline,
    title, 
    subtitle, 
    categories = [], 
    visibility = {},
    layout = {},
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';
  const textColor = style.customText || '#ffffff';
  const mainTitle = headline || title || "Nossa {Seleção} Gourmet";

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
    style.headlineSize || "text-4xl md:text-7xl",
    style.headlineWeight || "font-black",
    "tracking-tighter leading-[0.9] mb-6 uppercase",
    style.headlineGradient ? 'text-transparent bg-clip-text' : ''
  );

  const headlineStyle = {
    color: style.headlineGradient ? 'transparent' : textColor,
    backgroundImage: style.headlineGradient 
      ? `linear-gradient(to right, ${textColor}, ${accentColor})` 
      : 'none'
  };

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden" 
      style={{ backgroundColor: style.customBg || '#09090b' }}
    >
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            {visibility.showBadge !== false && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-px" style={{ backgroundColor: accentColor }} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: accentColor }}>Menu Selection</span>
              </motion.div>
            )}
            
            {visibility.showHeadline !== false && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={headlineClasses}
                style={headlineStyle}
              >
                {renderHighlightedText(mainTitle, true)}
              </motion.h2>
            )}
          </div>

          {visibility.showSubtitle !== false && subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-medium max-w-sm leading-relaxed opacity-50"
              style={{ color: textColor }}
            >
              {renderHighlightedText(subtitle)}
            </motion.p>
          )}
        </div>

        <div className="space-y-32">
          {categories.map((cat, idx) => (
            <div key={idx}>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-black uppercase tracking-[0.2em] mb-12 border-l-4 pl-6"
                style={{ borderColor: accentColor, color: textColor }}
              >
                {cat.name}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.items?.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-white/[0.02] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      {/* Price Badge */}
                      <div 
                        className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 font-black text-lg"
                        style={{ color: accentColor }}
                      >
                        {item.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl md:text-2xl font-black tracking-tight transition-colors" style={{ color: textColor }}>
                          {item.name}
                        </h4>
                        <div 
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:text-black transition-all"
                          style={{ backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.1)' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentColor}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                      <p className="text-sm font-medium leading-relaxed mb-8 line-clamp-2 opacity-40 flex-grow" style={{ color: textColor }}>
                        {item.description}
                      </p>
                      
                      {/* Tags/Badges */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {item.tags.map((tagObj, t) => (
                            <span 
                              key={t} 
                              className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest opacity-60"
                              style={{ color: textColor }}
                            >
                              {tagObj.tag || tagObj.label || tagObj}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" style={{ backgroundColor: accentColor }} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
