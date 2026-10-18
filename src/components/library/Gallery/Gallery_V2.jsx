"use client";
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'gallery',
  variant: 'v2',
  label: 'Showcase Elite (v2)',
  defaultData: {
    title: 'Showcase {Elite}',
    subtitle: 'Nossos melhores projetos recentes.',
    items: [{ image: '', title: 'Projeto Alpha', category: 'Residencial' }],
    style: {}
  }
};

export const schema = [
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título {Destaque}', type: 'text' }, { key: 'subtitle', label: 'Subtítulo', type: 'textarea' }, { key: 'items', label: 'Projetos', type: 'array', itemFields: [ { key: 'image', label: 'Imagem', type: 'image' }, { key: 'title', label: 'Nome Projeto', type: 'text' }, { key: 'category', label: 'Categoria', type: 'text' } ] } ] },
  ...commonFineTuning
];

export default function Gallery_V2({ data }) {
  if (!data) return null;

  const { 
    title = "Nossa {Galeria} de Elite", 
    subtitle = "Excelência em cada detalhe, transformando visões em realidade sólida.", 
    items = [],
    style = {}
  } = data;

  const renderTitle = (text) => {
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="text-brand-primary relative inline-block">
          {part}
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            className="absolute -bottom-2 left-0 h-1 bg-brand-primary/30 rounded-full"
          />
        </span>
      ) : part
    );
  };

  return (
    <section 
      id="gallery" 
      className="py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: style.customBg || 'transparent' }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-brand-primary" />
              <span className="text-brand-primary font-black text-[10px] uppercase tracking-[0.3em]">Portfolio Showcase</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8"
            >
              {renderTitle(title)}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="hidden md:block"
          >
            <div className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/50 text-[10px] font-black uppercase tracking-widest">
              Scroll para Explorar
            </div>
          </motion.div>
        </div>

        {/* MASONRY-STYLE GRID */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {items.map((item, index) => {
            // Layout logic for varied aspect ratios
            const isLarge = index === 0 || index === 5;
            const isTall = index === 1 || index === 4;
            
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' },
                  visible: { 
                    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                    transition: { type: "spring", stiffness: 100, damping: 25 }
                  }
                }}
                className={cn(
                  "relative rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5 bg-zinc-900",
                  isLarge ? "md:col-span-8 aspect-[16/9]" : 
                  isTall ? "md:col-span-4 aspect-[3/4]" : 
                  "md:col-span-4 aspect-square"
                )}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <span className="text-brand-primary font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
                      {item.category || "Premium Project"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                      {item.title}
                    </h3>
                    <div className="w-0 group-hover:w-12 h-1 bg-brand-primary transition-all duration-700 delay-100 rounded-full" />
                  </div>
                </div>

                {/* Inner Glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-brand-primary/30 transition-all duration-700 rounded-[2.5rem] pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}