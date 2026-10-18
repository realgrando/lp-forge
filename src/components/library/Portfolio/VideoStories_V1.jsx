"use client";
// src/components/library/Portfolio/VideoStories_V1.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, VolumeX } from '@/lib/lucide-shim';
import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'portfolio',
  variant: 'v2',
  label: 'Video Stories (v2)',
  defaultData: {
    badge: "Bastidores",
    headline: "Veja nossa {elite} em ação",
    subtitle: "Momentos reais da nossa equipe entregando o máximo padrão de qualidade.",
    stories: [
      { title: "O Forno Perfeito", category: "Gastronomia", thumbnail: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-pizza-34533-large.mp4" },
      { title: "Fundação Residencial", category: "Obra", thumbnail: "https://images.unsplash.com/photo-1541888081622-3cb5562cb08e?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-at-a-site-using-a-drill-40228-large.mp4" },
      { title: "Acabamento Premium", category: "Design", thumbnail: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-painter-painting-a-wall-with-a-roller-40212-large.mp4" }
    ],
    layout: { columns: 'md:grid-cols-3', paddingY: 'py-24' },
    style: { showAmbientLight: true }
  }
};

export const schema = [
  {
    group: '1. Estrutura',
    fields: [
      { key: 'layout.paddingY', label: 'Espaçamento Vertical', type: 'select', options: [{value: 'py-12', label: 'Pequeno'}, {value: 'py-24', label: 'Normal'}, {value: 'py-32', label: 'Grande'}] },
      { key: 'layout.columns', label: 'Colunas', type: 'select', options: [{value: 'md:grid-cols-2', label: '2 Colunas'}, {value: 'md:grid-cols-3', label: '3 Colunas'}, {value: 'md:grid-cols-4', label: '4 Colunas'}] }
    ]
  },
  {
    group: '2. Conteúdo',
    fields: [
      { key: 'badge', label: 'Texto da Badge', type: 'text' },
      { key: 'headline', label: 'Título {Destaque}', type: 'textarea' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'stories', label: 'Vídeo Stories', type: 'array', itemFields: [
        { key: 'title', label: 'Título do Story', type: 'text' },
        { key: 'category', label: 'Categoria', type: 'text' },
        { key: 'thumbnail', label: 'Thumbnail (Imagem)', type: 'image' },
        { key: 'videoUrl', label: 'URL do Vídeo (MP4)', type: 'text' }
      ]}
    ]
  },
  ...commonFineTuning
];

export default function VideoStories_V1({ data }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  if (!data) return null;

  const { badge, headline, subtitle, stories = [], layout = {}, style = {} } = data;
  const accentColor = style.customAccent || '#EAB308';

  const renderHighlightedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const content = part.slice(1, -1);
        return <span key={i} style={{ color: accentColor }}>{content}</span>;
      }
      return part;
    });
  };

  return (
    <section 
      className={`${layout.paddingY || 'py-24'} relative overflow-hidden bg-black text-white`}
      style={{ backgroundColor: style.customBg || undefined }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {badge && <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: accentColor }}>{badge}</span>}
          <h2 className={`${style.titleSize || 'text-4xl md:text-5xl'} font-black tracking-tighter mb-4`}>{renderHighlightedText(headline)}</h2>
          <p className="text-zinc-500 font-medium">{subtitle}</p>
        </div>

        <div className={`grid gap-6 ${layout.columns || 'md:grid-cols-3'}`}>
           {stories.map((s, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5 shadow-2xl"
               onClick={() => setActiveVideo(s)}
             >
                <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play size={24} fill="white" />
                   </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                   <span className="text-[10px] font-black uppercase tracking-widest mb-2 block" style={{ color: accentColor }}>{s.category}</span>
                   <h3 className="text-xl font-black text-white leading-tight">{s.title}</h3>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      <AnimatePresence>
         {activeVideo && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
           >
              <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                 <video 
                   src={activeVideo.videoUrl} 
                   autoPlay 
                   loop 
                   muted={isMuted}
                   className="w-full h-full object-cover"
                 />
                 
                 <button 
                   onClick={() => setActiveVideo(null)}
                   className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl text-white flex items-center justify-center border border-white/10"
                 >
                    <X size={24} />
                 </button>

                 <button 
                   onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                   className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl text-white flex items-center justify-center border border-white/10"
                 >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                 </button>

                 <div className="absolute bottom-8 left-8 right-24 pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#EAB308] mb-1 block" style={{ color: accentColor }}>{activeVideo.category}</span>
                    <h4 className="text-xl font-black text-white">{activeVideo.title}</h4>
                 </div>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      {style.showAmbientLight && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" style={{ backgroundColor: accentColor }} />
      )}
    </section>
  );
}
