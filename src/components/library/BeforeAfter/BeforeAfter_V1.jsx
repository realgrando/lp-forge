"use client";
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { HardHat, Sparkles, ChevronLeft, ChevronRight } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'beforeafter',
  variant: 'v1',
  label: 'Slider de Obra (v1)',
  defaultData: {
    title: 'Transformação {Real}',
    subtitle: 'Veja o antes e depois dos nossos projetos.',
    beforeImage: '',
    afterImage: '',
    layout: { height: 'h-[600px]' },
    style: {}
  }
};

export const schema = [
  { 
    group: '1. Estrutura', 
    fields: [ { key: 'layout.height', label: 'Altura do Slider', type: 'select', options: [{value:'h-[400px]', label:'Pequeno'}, {value:'h-[600px]', label:'Normal'}, {value:'h-screen', label:'Tela Cheia'}] } ] 
  },
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título {Destaque}', type: 'text' }, { key: 'subtitle', label: 'Subtítulo', type: 'textarea' }, { key: 'beforeImage', label: 'Imagem Antes', type: 'image' }, { key: 'afterImage', label: 'Imagem Depois', type: 'image' }, { key: 'beforeLabel', label: 'Texto Antes', type: 'text' }, { key: 'afterLabel', label: 'Texto Depois', type: 'text' } ] },
  ...commonFineTuning
];

export default function BeforeAfter_V1({ data }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  if (!data) return null;

  const { 
    title = "Resultados que {Falam} por Si", 
    subtitle = "Transformações reais que elevam o padrão do seu imóvel.", 
    beforeImage = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200", 
    afterImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200", 
    beforeLabel = "Antes",
    afterLabel = "Depois",
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';

  const handleMove = (e) => {
    if (!isResizing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  useEffect(() => {
    const endResize = () => setIsResizing(false);
    window.addEventListener('mouseup', endResize);
    window.addEventListener('touchend', endResize);
    return () => {
      window.removeEventListener('mouseup', endResize);
      window.removeEventListener('touchend', endResize);
    };
  }, []);

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="text-brand-primary">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <section 
      className="py-32 px-6 relative overflow-hidden bg-zinc-950" 
      style={{ backgroundColor: style.customBg || 'transparent' }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8"
          >
            <HardHat size={14} className="text-brand-primary" />
            <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">Quality Craftsmanship</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            {renderTitle(title)}
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* SLIDER CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          ref={containerRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="relative aspect-[16/9] w-full rounded-[3rem] overflow-hidden border border-white/5 cursor-ew-resize select-none shadow-3xl"
        >
          {/* After Image (Full Background) */}
          <img src={afterImage} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
          
          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden" 
            style={{ width: `${sliderPos}%` }}
          >
            <img src={beforeImage} alt="Antes" className="absolute inset-0 w-[calc(100vw-48px)] lg:w-[1152px] h-full object-cover max-w-none" />
          </div>

          {/* Labels */}
          <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/10 text-white font-black uppercase text-[10px] tracking-widest">
            {beforeLabel}
          </div>
          <div className="absolute top-8 right-8 bg-brand-primary px-6 py-2 rounded-2xl text-black font-black uppercase text-[10px] tracking-widest shadow-2xl" style={{ backgroundColor: accentColor }}>
            {afterLabel}
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={() => setIsResizing(true)}
            onTouchStart={() => setIsResizing(true)}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center gap-1 group"
              style={{ backgroundColor: accentColor }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:scale-150 transition-transform" />
              <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:scale-150 transition-transform" />
              <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:scale-150 transition-transform" />
            </div>
          </div>

          {/* Inner Glow Overlay */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem] pointer-events-none" />
        </motion.div>

        <div className="mt-12 flex justify-center items-center gap-6">
           <div className="flex items-center gap-2 text-zinc-600">
             <ChevronLeft size={20} />
             <span className="text-[10px] font-black uppercase tracking-widest">Deslize para comparar</span>
             <ChevronRight size={20} />
           </div>
        </div>
      </div>
    </section>
  );
}
