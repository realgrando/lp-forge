"use client";
// src/components/sections/Location.jsx
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight, Utensils, ShoppingBag, Bike, PawPrint } from '@/lib/lucide-shim';
import SocialLinks from '../Common/SocialLinks';

const TAG_ICONS = {
  utensils: Utensils,
  bag: ShoppingBag,
  bike: Bike,
  paw: PawPrint
};

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'location',
  variant: 'v1',
  label: 'Mapa Simples (v1)',
  defaultData: {
    style: {}
  }
};

export const schema = [...commonFineTuning];

export default function Location_V1({ data, globalSocials }) {
  if (!data) return null;

  const { 
    title, subtitle, address, mapLink, mapEmbedUrl, 
    hours = [], serviceTags = [], layout = {}, visibility = {}, socialDisplay = {}
  } = data;

  const showMap = visibility.showMap !== false && mapEmbedUrl;
  
  const renderOrder = layout.infoRenderOrder || ['address', 'hours', 'button'];

  return (
    <section id="location" className={`py-20 px-6`}>
      <div className="container mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white font-display mb-2"
          >
            {title}
          </motion.h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>

        {/* GRID */}
        <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-2 gap-12' : 'max-w-2xl mx-auto gap-8'}`}>
          
          {/* COLUNA 1: INFO */}
          <div className="flex flex-col justify-center gap-8 h-full">
            {renderOrder.map((blockKey) => {
              
              const blocks = {
                // BLOCO DE ENDEREÇO (Referência de Design)
                address: visibility.showAddress && (
                  <motion.div 
                    key="address"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-4 p-6 bg-bg-main border border-white/5 rounded-2xl shadow-lg"
                  >
                    {/* Ícone com background circular */}
                    <div className="bg-brand-primary/10 p-3 rounded-full text-brand-primary shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Endereço</h3>
                      <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
                        {address}
                      </p>
                    </div>
                  </motion.div>
                ),

                // BLOCO DE HORÁRIOS + TAGS (Padronizado)
                hours: visibility.showHours && (
                  <motion.div 
                    key="hours"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="bg-bg-main border border-white/5 rounded-2xl overflow-hidden shadow-lg">
                      
                      {/* HEADER DO CARD PADRONIZADO (p-6, gap-4) */}
                      <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-4 p-6 border-b border-white/5 bg-bg-main">
                        
                        {/* Lado Esquerdo: Ícone + Título (Igual ao Address) */}
                        <div className="flex items-center gap-4">
                          <div className="bg-brand-primary/10 p-3 rounded-full text-brand-primary shrink-0">
                            <Clock size={24} />
                          </div>
                          <h3 className="text-xl font-bold text-white">Horários</h3>
                        </div>

                        {/* Lado Direito: Tags Miniatura */}
                        {serviceTags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                             {serviceTags.map((tag, i) => {
                                if (!tag.active) return null;
                                const Icon = TAG_ICONS[tag.icon] || Utensils;
                                return (
                                  <span 
                                    key={i}
                                    className="
                                      inline-flex items-center gap-1.5 
                                      px-2.5 py-1 rounded-md 
                                      bg-brand-primary/10 border border-brand-primary/20 
                                      text-brand-primary font-bold text-[11px] uppercase tracking-wider
                                      whitespace-nowrap
                                    "
                                  >
                                    <Icon size={12} />
                                    {tag.label}
                                  </span>
                                );
                             })}
                          </div>
                        )}
                      </div>  

                      {/* LISTA DE HORÁRIOS */}
                      <div className="divide-y divide-white/5">
                        {hours.map((item, i) => (
                          <div 
                            key={i} 
                            className={`flex justify-between items-center p-4 px-6 ${item.highlight ? 'bg-brand-primary/5' : 'hover:bg-white/5'}`}
                          >
                            <span className={`font-medium ${item.highlight ? 'text-brand-primary' : 'text-gray-400'}`}>
                              {item.day}
                            </span>
                            <span className={`font-bold ${item.highlight ? 'text-white' : 'text-gray-500'}`}>
                              {item.time}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                ),

                // --- NOVO BLOCO: SOCIAL LINKS ---
                socials: visibility.showSocials && globalSocials && (
                  <motion.div 
                    key="socials"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col gap-3 md:hidden"
                  >
                    {/* Reutilizando o componente novo */}
                    <SocialLinks items={globalSocials} settings={socialDisplay} size="md" className="justify-start" />
                  </motion.div>
                ),

                // BOTÃO
                button: visibility.showButton && (
                  <motion.div 
                    key="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <a 
                      href={mapLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full md:w-auto gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-brand-primary transition-colors shadow-lg group hover:scale-105 duration-300"
                    >
                      Traçar Rota no GPS
                      <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300"/>
                    </a>
                  </motion.div>
                )
              };

              return blocks[blockKey];
            })}
          </div>

          {/* COLUNA 2: MAPA */}
          {showMap && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[400px] lg:h-auto min-h-[400px] w-full bg-zinc-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group"
            >
              <iframe 
                src={mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0%) contrast(1.1)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full transition-all duration-700 group-hover:filter-none"
              ></iframe>
              <div className="absolute inset-0 bg-transparent pointer-events-none border border-white/10 rounded-3xl"></div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}