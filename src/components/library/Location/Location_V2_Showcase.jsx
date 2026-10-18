"use client";
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight, Utensils, ShoppingBag, Bike, PawPrint, Navigation, Globe } from '@/lib/lucide-shim';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TAG_ICONS = {
  utensils: Utensils,
  bag: ShoppingBag,
  bike: Bike,
  paw: PawPrint
};

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'location',
  variant: 'v2',
  label: 'Showcase (v2)',
  defaultData: {
    title: 'Visite nossa {Sede}',
    subtitle: 'Venha tomar um café conosco.',
    address: 'Av. Paulista, 1000 - São Paulo',
    style: {}
  }
};

export const schema = [
  { 
    group: '2. Conteúdo', 
    fields: [ 
      { key: 'title', label: 'Título {Destaque}', type: 'text' }, 
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'address', label: 'Endereço Completo', type: 'text' }, 
      { key: 'mapLink', label: 'Link Google Maps', type: 'text' },
      { key: 'mapEmbedUrl', label: 'URL Embed Mapa', type: 'text' },
      { key: 'hours', label: 'Horários', type: 'array', itemFields: [
        { key: 'day', label: 'Dia', type: 'text' },
        { key: 'time', label: 'Horário', type: 'text' },
        { key: 'highlight', label: 'Destacar', type: 'toggle' }
      ]},
      { key: 'serviceTags', label: 'Tags de Serviço', type: 'array', itemFields: [
        { key: 'label', label: 'Tag', type: 'text' },
        { key: 'icon', label: 'Ícone (lucide)', type: 'text' },
        { key: 'active', label: 'Ativo', type: 'toggle' }
      ]}
    ] 
  },
  ...commonFineTuning
];

export default function Location_V2_Showcase({ data }) {
  if (!data) return null;

  const { 
    title = "Onde a {Excelência} se Encontra", 
    subtitle = "Visite nosso espaço e experimente o padrão de qualidade que define nossos projetos.", 
    address = "Av. Paulista, 1000 - São Paulo, SP", 
    mapLink = "#", 
    mapEmbedUrl, 
    hours = [], 
    serviceTags = [], 
    style = {} 
  } = data;

  const accentColor = style.customAccent || '#EAB308';

  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split(/\{(.*?)\}/g);
    return parts.map((part, i) => 
      i % 2 === 1 ? (
        <span key={i} className="text-brand-primary relative inline-block">
          {part}
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-brand-primary/20 rounded-full" />
        </span>
      ) : part
    );
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-zinc-950" style={{ backgroundColor: style.customBg || 'transparent' }}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-primary/10 blur-[150px] rounded-full translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row items-start gap-20">
          
          {/* LADO ESQUERDO: INFORMAÇÕES E HORÁRIOS */}
          <div className="lg:w-5/12 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-brand-primary" />
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em]">Global Presence</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                {renderTitle(title)}
              </h2>
              
              <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md">
                {subtitle}
              </p>
            </motion.div>

            {/* CARD DE ENDEREÇO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm group hover:border-brand-primary/20 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Localização</h3>
                  <p className="text-xl font-bold text-white leading-snug mb-4">{address}</p>
                  <a 
                    href={mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-widest hover:translate-x-2 transition-transform"
                  >
                    Ver no Google Maps <Navigation size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CARD DE HORÁRIOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center text-brand-primary border border-white/5">
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Horários</h3>
                </div>
                
                {/* Service Tags */}
                <div className="flex gap-2">
                  {serviceTags.slice(0, 2).map((tag, i) => {
                    if (!tag.active) return null;
                    const Icon = TAG_ICONS[tag.icon] || Utensils;
                    return (
                      <div key={i} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 border border-white/5 hover:text-brand-primary hover:border-brand-primary/30 transition-colors">
                        <Icon size={14} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 space-y-1">
                {hours.map((item, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex justify-between items-center p-4 rounded-2xl transition-all",
                      item.highlight ? "bg-brand-primary/10 text-brand-primary" : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                    )}
                  >
                    <span className="text-sm font-black uppercase tracking-widest">{item.day}</span>
                    <span className={cn("text-sm font-bold", item.highlight ? "text-white" : "text-zinc-400")}>{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* LADO DIREITO: MAPA CINEMATOGRÁFICO */}
          <div className="lg:w-7/12 w-full h-[600px] lg:h-[800px] sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-full rounded-[3.5rem] overflow-hidden border border-white/10 relative group shadow-3xl"
            >
              {mapEmbedUrl ? (
                <iframe 
                  src={mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) hue-rotate(180deg)' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0 group-hover:hue-rotate-0 group-hover:contrast-100"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                  <Globe size={64} className="text-zinc-800 animate-pulse" />
                </div>
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20 opacity-60" />
              
              {/* Floating CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-md"
              >
                <a 
                  href={mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-white rounded-3xl text-black font-black uppercase tracking-widest hover:bg-brand-primary transition-all shadow-2xl group/btn"
                >
                  <span>Iniciar Navegação GPS</span>
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform">
                    <ArrowUpRight size={24} />
                  </div>
                </a>
              </motion.div>
              
              {/* Inner Glow */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3.5rem] pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
