"use client";
import { motion } from 'framer-motion';

import { commonFineTuning } from '../Common/SchemaProps';

export const metadata = {
  type: 'gallery',
  variant: 'v1',
  label: 'Galeria Base (v1)',
  defaultData: {
    title: 'Nossa Galeria',
    items: [{ imageUrl: '' }],
    style: {}
  }
};

export const schema = [
  { group: '2. Conteúdo', fields: [ { key: 'title', label: 'Título', type: 'text' }, { key: 'items', label: 'Fotos', type: 'array', itemFields: [ { key: 'imageUrl', label: 'Imagem', type: 'image' } ] } ] },
  ...commonFineTuning
];

export default function Gallery_V1({ data }) {
  if (!data) return null;

  const { 
    title, subtitle, 
    items = [], 
    layout = {} 
  } = data;

  const cols = layout.columnsDesktop || 3;

  const gridColsMap = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4'
  };

  return (
    <section id="gallery" className={`py-24 px-6`}>
      <div className="container mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            {title || "Nossos Projetos"}
          </motion.h2>
          <div className="h-1.5 w-20 bg-brand-primary mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg leading-relaxed">
            {subtitle || "Confira alguns dos nossos trabalhos mais recentes e a qualidade que entregamos."}
          </p>
        </div>

        {/* GRID DE IMAGENS */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsMap[cols]} gap-6`}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer border border-white/5"
            >
              <img 
                src={item.image} 
                alt={item.title || "Projeto"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay no Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category || "Construção"}
                </span>
                <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.title || "Projeto Finalizado"}
                </h3>
              </div>

              {/* Borda interna brilhante no hover */}
              <div className="absolute inset-0 border-0 group-hover:border-2 border-brand-primary/30 transition-all duration-500 rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}